

import React, { useState, useEffect, useMemo } from 'react'

import {
    View, 
    Text,
    ScrollView,
    ScaledSize,
} from 'react-native';

import Touchable from 'react-native-platform-touchable';
import EStyleSheet from 'react-native-extended-stylesheet';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { RollDisplayHelper } from './dice/views/RollDisplayHelper';
import { StruckStringPairView } from './dice/views/StruckStringPair';
import HistoryManager from './sync/HistoryManager';
import AccelerometerManager from './hardware/AccelerometerManager';
import ShakeEnabledManager from './sync/ShakeEnabledManager';
import AnimationsEnabledManager from './sync/AnimationsEnabledManager';
import SoundManager from './hardware/SoundManager';
import TabManager from './sync/TabManager';
import { SimpleDie } from './dice/SimpleDie';
import { ShakeDie, renderShakeDie } from './helpers/ShakeDie';
import ShakeLengthManager from './sync/ShakeLengthManager';

const MAX_DICE_IN_ROLL = 25;
const ANIMATION_RUNTIME = 10;
const MAX_SHAKE_TIME = 20000;

interface RollResultsInterface {
    dismissPage: () => void;
    window : ScaledSize;
}

enum shakeEnums {
    shaking,
    holding,
    slowing,
    transitioning,
    done,
}

export function RollResultsPage(props : RollResultsInterface) {

    const [reload, setReload] = useState(false);

    HistoryManager.getInstance().setDisplayUpdater(() => setReload(!reload));
    AnimationsEnabledManager.getInstance().setUpdater(() => setReload(!reload));
    ShakeEnabledManager.getInstance().setUpdater(() => setReload(!reload));

    // Whats going on with the animation.
    const [animationState, setAnimationState] = useState({startTime:0, lastAnimationTime:0, duration:0, state:shakeEnums.shaking, frames:0});

    const [playCritSounds, setPlayCritSounds] = useState(false);

    let rollHelper = HistoryManager.getInstance().getLastRoll();

    const shakeDieArray = useMemo(() => {
        let newArray = Array<ShakeDie>();

        let totalDice = rollHelper.storedRoll.getTotalDiceInRoll();
        let needsDieRepresentation = totalDice > MAX_DICE_IN_ROLL;

        for(let dieProp of rollHelper.storedRoll.getDiePropArray()) {
            let maxDice = Math.abs(dieProp.mProperties.mNumDice);

            if(needsDieRepresentation) {
                maxDice = Math.floor((maxDice / totalDice) * MAX_DICE_IN_ROLL)
            }

            // Don't let things go off the screen because of the status bar.
            let statusHeight = getStatusBarHeight();

            for(let i = 0; i < maxDice; i += 1) {
                let newShakeDie = new ShakeDie(
                    dieProp.mDie.imageID, 
                    props.window.width, 
                    props.window.height - statusHeight);

                newShakeDie.key = newShakeDie.dieImageID.toString() + i.toString();

                newArray.push(newShakeDie);
            }
        }

        return newArray;
    }, [rollHelper, props.window]);

    function reroll() {
        let newRoll = new RollDisplayHelper(rollHelper.storedRoll);
        HistoryManager.getInstance().addToHistory(newRoll);
    }

    function exitShake() {
        setAnimationState({startTime:0, lastAnimationTime:0, duration:0, state:shakeEnums.done, frames:0})
    }

    function exitDialog() {
        exitShake();
        props.dismissPage();
    }
    
    function goToNextState(currentTime: number, duration: number, state: shakeEnums) {
        if(state == shakeEnums.done) {
            exitShake();
        } else {
            let nextFrame = animationState.frames+1;
            setAnimationState({startTime:animationState.startTime, lastAnimationTime:currentTime, duration:duration, state:state, frames:nextFrame});
        }
    }

    function animateDice() {
        let rightNow = Date.now();
        let totalElapsedTime = rightNow - animationState.startTime;
        let animationDuration = rightNow - animationState.lastAnimationTime;

        if(totalElapsedTime > MAX_SHAKE_TIME) {
            goToNextState(0, 0, shakeEnums.done);
            return;
        }

        let shakeLength = ShakeLengthManager.getInstance().shakeLength;
        let longShakeLength = shakeLength * 2;

        let speedKillMod = 1;
        let newTime = animationState.duration;
        let newState = animationState.state;
        let isStable = AccelerometerManager.getInstance().accelStable;

        if(animationState.state == shakeEnums.shaking) {
            if(!isStable) { newTime += animationDuration; }
            
            if(newTime > shakeLength) {
                newTime = 0;
                newState = shakeEnums.holding;
            }
        } else if(animationState.state == shakeEnums.holding) {
            if(isStable) { newTime += animationDuration; } 

            if(newTime > shakeLength) {
                newTime = 0;
                newState = shakeEnums.slowing;
            }
        } else if(animationState.state == shakeEnums.slowing) {
            newTime += animationDuration;

            speedKillMod = Math.max(0, 1 - newTime / longShakeLength);

            if(newTime > longShakeLength) {
                newTime = 0;
                newState = shakeEnums.transitioning;
            }
        } else if(animationState.state == shakeEnums.transitioning) {
            newTime += animationDuration;

            speedKillMod = 0;

            if(newTime > shakeLength) {
                newTime = 0;
                newState = shakeEnums.done;
            }
        }

        let maxCollisionVelocity = 0;

        for(let shakeDie of shakeDieArray) {

            shakeDie.updatePosition(speedKillMod);

            maxCollisionVelocity = Math.max(maxCollisionVelocity, shakeDie.collisionVelocity);
        }

        SoundManager.getInstance().playDiceRoll(maxCollisionVelocity/300);

        goToNextState(rightNow, newTime, newState);
    }
    
    let animationsRunning = animationState.state != shakeEnums.done;

    useEffect(() => {
        if(animationsRunning) { 
            let clear = setTimeout(() => animateDice(), ANIMATION_RUNTIME); 
            return (() => clearTimeout(clear));
        }
    });

    useEffect(() => {
        if(rollHelper.storedRoll.getTotalDiceInRoll() !== 0 && TabManager.getInstance().isOnDiceRollTab()) {
            let startAnimations = AnimationsEnabledManager.getInstance().getAnimationsEnabled();

            setPlayCritSounds(true);
            
            if(startAnimations) {
                let rightNow = Date.now();
                let shakeEnabled = ShakeEnabledManager.getInstance().getShakeEnabled();
                if(shakeEnabled) {
                    setAnimationState({startTime:rightNow, lastAnimationTime:rightNow, duration:0, state:shakeEnums.shaking, frames:0});
                }
                else {
                    setAnimationState({startTime:rightNow, lastAnimationTime:rightNow, duration:0, state:shakeEnums.slowing, frames:0});
                }
            } else {
                goToNextState(0, 0, shakeEnums.done);
            }
        }
    }, [rollHelper]);

    if(animationsRunning) {

        let displayText = "";

        if(animationState.state == shakeEnums.shaking) {
            displayText = "Shake!";
        } else if(animationState.state == shakeEnums.holding) {
            displayText = "Hold Still";
        } else if (animationState.state == shakeEnums.slowing) {
            displayText = "Calculating...";
        } else {
            displayText = "Done!"
        }

        return (
            <View style={styles.Container}>
                <View style={{position:"absolute"}}>
                    {shakeDieArray.map(renderShakeDie)}
                </View>
                <View style={styles.ShakeContainer}>
                    <Text style={styles.ShakeText}>{displayText}</Text>
                </View>
                <View style={styles.ButtonContainer}>
                    <Touchable 
                        style={styles.ButtonBackground}
                        onPress={exitShake}
                        foreground={Touchable.Ripple('white', true)}
                        hitSlop={styles.HitSlop}
                    >
                        <Text style={styles.ButtonText}>Go To Results</Text>
                    </Touchable>
                </View>
            </View>
        )
    }

    if(playCritSounds)
    {
        // Check for rolling critical success or critical failures
        // TODO: generalize this
        if(rollHelper.storedResults.mRollResults.size == 1) {
            let d20SaveString = JSON.stringify(new SimpleDie("d20", 20));
            if(rollHelper.storedResults.mRollResults.has(d20SaveString)) {
                let results = rollHelper.storedResults.mRollResults.get(d20SaveString);
                if(results.length == 1) {
                    if(results[0] == 20) {
                        SoundManager.getInstance().playAirHorn();
                    } else if(results[0] == 1) {
                        SoundManager.getInstance().playWilhelm();
                    }
                }
            }
        }
        
        setPlayCritSounds(false);
    }

    return (
        <View style={styles.Container}>
            <Text style={styles.DateTimeText}>{rollHelper.dateString} - {rollHelper.timeString}</Text>
            <View style={styles.Container}>
                <ScrollView contentContainerStyle={{justifyContent:'center', flexGrow: 1}} style={{}}>
                    <Text style={styles.TitleText}>{rollHelper.rollNameText}</Text>
                    <StruckStringPairView pair={rollHelper.rollSumText} style={styles.SumText}/>
                    {(rollHelper.rollResultsText).map((item, index) => 
                        <StruckStringPairView key={index} pair={item} style={styles.DetailText}/>)
                    }
                </ScrollView>
            </View>
            <View style={styles.ButtonContainer}>
                <Touchable 
                    style={styles.ButtonBackground}
                    onPress={reroll}
                    foreground={Touchable.Ripple('white', true)}
                    hitSlop={styles.HitSlop}
                >
                    <Text style={styles.ButtonText}>Roll Again</Text>
                </Touchable>
                <Touchable 
                    style={styles.ButtonBackground}
                    onPress={exitDialog}
                    foreground={Touchable.Ripple('white', true)}
                    hitSlop={styles.HitSlop}
                >
                    <Text style={styles.ButtonText}>Exit</Text>
                </Touchable>
            </View>
        </View>
    );
}

const styles = EStyleSheet.create({
    Container: {
        flex:1,
        alignContent:'center',
    },
    ShakeContainer: {
        flex:1,
        justifyContent:'center',
        alignContent:'center',
    },
    ScrollContainer: {
        flex:2,
        alignContent:'center',
        justifyContent:'center'
    },
    ShakeText: {
        fontSize:'$fontSizeMassive',
        color:'$textColorDarkened',
        textAlign:'center',
    },
    TitleText: {
        fontSize:'$fontSizeHuge',
        color:'$textColor',
        textAlign:'center',
    },
    SumText: {
        fontSize:'$fontSizeColossal',
        color:'$textColor',
        textAlign:'center',
    },
    DetailText: {
        fontSize:'$fontSizeLarge',
        color:'$textColor',
        textAlign:'center',
    },
    ButtonContainer: {
        flexDirection:'row', 
        alignItems:'stretch',
        alignContent:'stretch',
        justifyContent:'space-around',
        marginTop:'8rem'
    },
    ButtonBackground: {
        flex:1,
        backgroundColor: '$primaryColorLightened',
        borderRadius: '10rem',
        overflow:'hidden',
        margin:'10rem'
    },
    ButtonText: {
        fontSize:'$fontSizeHuge',
        textAlign: 'center', 
        color: '$textColor',
    },
    DateTimeText: {
        fontSize:'$fontSizeNormal',
        textAlign: 'right', 
        color: '$textColorDarkened',
    },
    HitSlop: {
        top:'10rem',
        bottom:'10rem',
        right:'10rem',
        left:'10rem'
    },
})