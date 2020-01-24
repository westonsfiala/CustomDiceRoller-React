

import React, { useState, useEffect, useMemo, useRef } from 'react'

import {
    View, 
    Text,
    ScrollView,
    Animated,
    ScaledSize,
    Easing,
    LayoutAnimation,
} from 'react-native';

import Touchable from 'react-native-platform-touchable';
import EStyleSheet from 'react-native-extended-stylesheet';

import { RollDisplayHelper } from './dice/views/RollDisplayHelper';
import { StruckStringPairView } from './dice/views/StruckStringPair';
import HistoryManager from './sync/HistoryManager';
import { getRequiredImage } from './dice/dieImages/DieImageGetter';
import { randomIntFromInterval } from './helpers/NumberHelper';
import AccelerometerManager from './hardware/AccelerometerManager';
import ShakeEnabledManager from './sync/ShakeEnabledManager';
import SoundManager from './hardware/SoundManager';
import TabManager from './sync/TabManager';
import { SimpleDie } from './dice/SimpleDie';

const MAX_DICE_IN_ROLL = 25;
const ANIMATION_RUNTIME = 50;
const SHAKE_TIME = 500;
const HOLD_TIME = 500;
const SLOW_TIME = 1000;
const STILL_TIME = 500;
const MAX_SHAKE_TIME = 10000;

interface RollResultsInterface {
    dismissPage: () => void;
    window : ScaledSize;
}

class ShakeDie {
    dieImageID : number;
    maxX : number;
    maxY : number;

    xPosition : number;
    xPositionAnimated : Animated.Value;
    yPosition : number;
    yPositionAnimated : Animated.Value;
    xVelocity : number;
    yVelocity : number;
    rotation : number;
    rotationAnimated : Animated.Value;
    rotationVelocity : number;

    collisionVelocity : number;

    key : string;

    constructor(imageID : number, maxX : number, maxY: number) {
        this.dieImageID = imageID;
        this.maxX = maxX;
        this.maxY = maxY;

        this.xPosition = randomIntFromInterval(0, maxX);
        this.xPositionAnimated = new Animated.Value(this.xPosition);
        this.yPosition = randomIntFromInterval(0, maxY);
        this.yPositionAnimated = new Animated.Value(this.yPosition);
        this.xVelocity = randomIntFromInterval(-50, 50);
        this.yVelocity = randomIntFromInterval(-50, 50);
        this.rotation = Math.random();
        this.rotationAnimated = new Animated.Value(this.rotation);
        this.rotationVelocity = Math.random() / 10;

        this.collisionVelocity = 0;
    }

    getCollisionVelocity() : number {
        return this.collisionVelocity;
    }

    updatePosition(speedKillMod : number) : Animated.CompositeAnimation {

        this.collisionVelocity = 0;

        let hitXBound = false;
        this.xPosition += this.xVelocity * speedKillMod;
        if(this.xPosition < 0) {
            this.xPosition = 0;
            hitXBound = true;
        } else if (this.xPosition > this.maxX) {
            this.xPosition = this.maxX;
            hitXBound = true;
        }

        if(hitXBound) {
            this.collisionVelocity = Math.abs(this.xVelocity);
            this.xVelocity *= -0.95;
            this.xVelocity += Math.random() - 0.5;
        }

        let hitYBound = false;
        this.yPosition += this.yVelocity * speedKillMod;
        if(this.yPosition < 0) {
            this.yPosition = 0;
            hitYBound = true;
        } else if (this.yPosition > this.maxY) {
            this.yPosition = this.maxY;
            hitYBound = true;
        }

        if(hitYBound) {
            this.collisionVelocity = Math.abs(this.yVelocity);
            this.yVelocity *= -0.95;
            this.yVelocity += Math.random() - 0.5;
        }

        if(hitXBound || hitYBound) {
            this.rotationVelocity += (Math.random() - 0.5) / 20;
        }

        if(this.maxX < this.maxY) {
            // Portrait
            this.xVelocity -= AccelerometerManager.getInstance().xAccel * 2;
            this.yVelocity += AccelerometerManager.getInstance().yAccel * 2;
        } else {
            // Landscape
            this.xVelocity -= AccelerometerManager.getInstance().yAccel * 2;
            this.yVelocity -= AccelerometerManager.getInstance().xAccel * 2;
        }

        this.rotation += this.rotationVelocity * speedKillMod;

        return Animated.parallel([
            Animated.timing(this.xPositionAnimated, {
                toValue: this.xPosition,
                duration: ANIMATION_RUNTIME,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(this.yPositionAnimated, {
                toValue: this.yPosition,
                duration:ANIMATION_RUNTIME,
                easing: Easing.linear,
                useNativeDriver:true,
            }),
            Animated.timing(this.rotationAnimated, {
                toValue: this.rotation,
                duration:ANIMATION_RUNTIME,
                easing: Easing.linear,
                useNativeDriver:true,
            }),
        ]);
    }
}

enum shakeEnums {
    shaking,
    holding,
    slowing,
    transitioning
}

function renderShakeDie(shakeDie: ShakeDie) {
    return(
        <Animated.Image key={shakeDie.key} source={getRequiredImage(shakeDie.dieImageID)} style={[{transform:[
            { translateX: shakeDie.xPositionAnimated },
            { translateY: shakeDie.yPositionAnimated },
            { rotate: shakeDie.rotationAnimated.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              }) },
        ]}, styles.DisplayDice]}/>
    )
}

export function RollResultsPage(props : RollResultsInterface) {

    const [reload, setReload] = useState(false);
    const [animationsRunning, setAnimationsRunning] = useState(false);

    HistoryManager.getInstance().setDisplayUpdater(() => setReload(!reload));
    ShakeEnabledManager.getInstance().setUpdater(() => setReload(!reload));

    // Used to clean up the repeating animations
    const updateIntervalRef = useRef(0);
    // Time that we started the animations
    const startTimeRef = useRef(0);
    // Time that the last animation started
    const lastAnimationTimeRef = useRef(0);
    // How long has the user been either shaking, holding, or killing animations
    const stateDurationRef = useRef(0);
    // What state are we in
    const stateRef = useRef(shakeEnums.shaking);

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

            for(let i = 0; i < maxDice; i += 1) {
                let newShakeDie = new ShakeDie(
                    dieProp.mDie.imageID, 
                    props.window.width - styles.DisplayDice.width, 
                    props.window.height - styles.DisplayDice.height);

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
        clearInterval(updateIntervalRef.current)
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setAnimationsRunning(false);
    }

    function exitDialog() {
        exitShake();
        props.dismissPage();
    }

    function animateDice() {
        let rightNow = Date.now();
        let totalElapsedTime = rightNow - startTimeRef.current;
        let animationDuration = rightNow - lastAnimationTimeRef.current;
        lastAnimationTimeRef.current = rightNow;

        if(totalElapsedTime > MAX_SHAKE_TIME) {
            exitShake();
            return;
        }

        let speedKillMod = 1;
        let isStable = AccelerometerManager.getInstance().accelStable;

        if(stateRef.current == shakeEnums.shaking) {
            
            if(!isStable) { stateDurationRef.current += animationDuration; }
                
            if(stateDurationRef.current > SHAKE_TIME) {
                stateDurationRef.current = 0;
                stateRef.current = shakeEnums.holding;
                setReload(!reload);
            }

        } else if(stateRef.current == shakeEnums.holding) {

            if(isStable) { stateDurationRef.current += animationDuration; } 

            if(stateDurationRef.current > HOLD_TIME) {
                stateDurationRef.current = 0;
                stateRef.current = shakeEnums.slowing;
                setReload(!reload);
            }

        } else if(stateRef.current == shakeEnums.slowing) {

            stateDurationRef.current += animationDuration;

            speedKillMod = Math.max(0, 1 - stateDurationRef.current / SLOW_TIME);

            if(stateDurationRef.current > SLOW_TIME) {
                stateDurationRef.current = 0;
                stateRef.current = shakeEnums.transitioning;
                setReload(!reload);
            }

        } else if(stateRef.current == shakeEnums.transitioning) {

            stateDurationRef.current += animationDuration;

            speedKillMod = 0;

            if(stateDurationRef.current > STILL_TIME) {
                stateDurationRef.current = 0;
                exitShake();
                return;
            }

        }

        let newAnimations = Array<Animated.CompositeAnimation>();

        let maxCollisionVelocity = 0;

        for(let shakeDie of shakeDieArray) {

            let updateAnimation = shakeDie.updatePosition(speedKillMod);
            newAnimations.push(updateAnimation);

            maxCollisionVelocity = Math.max(maxCollisionVelocity, shakeDie.collisionVelocity);
        }

        SoundManager.getInstance().playDiceRoll(maxCollisionVelocity/300);

        Animated.parallel(newAnimations).start();
    }

    useEffect(() => {
        if(rollHelper.storedRoll.getTotalDiceInRoll() !== 0 && TabManager.getInstance().isOnDiceRollTab()) {
            let startAnimations = ShakeEnabledManager.getInstance().getShakeEnabled();
            
            if(startAnimations) {
            
                lastAnimationTimeRef.current = Date.now();
            
                stateDurationRef.current = 0;

                startTimeRef.current = Date.now();
                
                stateRef.current = shakeEnums.shaking;
                setAnimationsRunning(true);
            } else {
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
                
                setAnimationsRunning(false);
            }
        }
    }, [rollHelper]);

    useEffect(() => {
        if(animationsRunning){
            updateIntervalRef.current = setInterval(animateDice, ANIMATION_RUNTIME);
    
            return (() => {
                clearInterval(updateIntervalRef.current)
            })
        } else {
            clearInterval(updateIntervalRef.current)
        }
    }, [animationsRunning])

    if(animationsRunning) {

        let displayText = "";

        if(stateRef.current == shakeEnums.shaking) {
            displayText = "Shake!";
        } else if(stateRef.current == shakeEnums.holding) {
            displayText = "Hold Still";
        } else if (stateRef.current == shakeEnums.slowing) {
            displayText = "Calculating...";
        } else {
            displayText = "Done!"
        }

        return (
            <View style={styles.Container}>
                {animationsRunning ? shakeDieArray.map(renderShakeDie) : null}
                <View style={styles.ShakeContainer}>
                    <Text style={styles.ShakeText}>
                        {displayText}
                    </Text>
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

    return (
        <View style={styles.Container}>
            {animationsRunning ? shakeDieArray.map(renderShakeDie) : null}
            <Text style={styles.DateTimeText}>{rollHelper.dateString} - {rollHelper.timeString}</Text>
            <View style={styles.Container}>
                <ScrollView contentContainerStyle={{justifyContent:'center'}} style={{}}>
                    <Text style={styles.TitleText}>
                        {rollHelper.rollNameText}
                    </Text>
                </ScrollView>
            </View>
            <StruckStringPairView pair={rollHelper.rollSumText} style={styles.SumText}/>
            <View style={styles.ScrollContainer}>
                <ScrollView>
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
        fontSize:'40rem',
        color:'$textColorDarkened',
        textAlign:'center',
    },
    TitleText: {
        fontSize:'30rem',
        color:'$textColor',
        textAlign:'center',
    },
    SumText: {
        fontSize:'80rem',
        color:'$textColor',
        textAlign:'center',
    },
    DetailText: {
        fontSize:'20rem',
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
        fontSize: '30rem', 
        textAlign: 'center', 
        color: '$textColor',
    },
    DateTimeText: {
        fontSize: '12rem', 
        textAlign: 'right', 
        color: '$textColorDarkened',
    },
    HitSlop: {
        top:'10rem',
        bottom:'10rem',
        right:'10rem',
        left:'10rem'
    },
    DisplayDice: {
        width:'30rem',
        height:'30rem',
        position:'absolute'
    }
})