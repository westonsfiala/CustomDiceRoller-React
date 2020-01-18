

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

const MAX_DICE_IN_ROLL = 25;
const ANIMATION_RUNTIME = 50;
const HOLD_TIME = 1000;
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
    }

    updatePosition(killSpeed : boolean) {

        let hitXBound = false;
        this.xPosition += this.xVelocity;
        if(this.xPosition < 0) {
            this.xPosition = 0;
            hitXBound = true;
        } else if (this.xPosition > this.maxX) {
            this.xPosition = this.maxX;
            hitXBound = true;
        }

        if(hitXBound) {
            this.xVelocity *= -0.95;
            this.xVelocity += Math.random() - 0.5;
        }

        let hitYBound = false;
        this.yPosition += this.yVelocity;
        if(this.yPosition < 0) {
            this.yPosition = 0;
            hitYBound = true;
        } else if (this.yPosition > this.maxY) {
            this.yPosition = this.maxY;
            hitYBound = true;
        }

        if(hitYBound) {
            this.yVelocity *= -0.95;
            this.yVelocity += Math.random() - 0.5;
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

        this.rotation += this.rotationVelocity;

        if(killSpeed) {
            this.xVelocity *= .80;
            this.yVelocity *= .80;
            this.rotationVelocity *= .80;
        }
    }
}

export function RollResultsPage(props : RollResultsInterface) {

    const [reload, setReload] = useState(false);
    HistoryManager.getInstance().setDisplayUpdater(() => setReload(!reload));
    ShakeEnabledManager.getInstance().setUpdater(() => setReload(!reload));

    const killedAnimations = useRef(false);
    const updateIntervalRef = useRef(0);
    const startTimeRef = useRef(0);
    const elapsedTimeRef = useRef(0);
    const hasShookRef = useRef(false);
    const hasHeldRef = useRef(false);

    const [animationsState, setAnimationsState] = useState({animationsRunning:ShakeEnabledManager.getInstance().getShakeEnabled(), hasShook:false});

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

    console.log('refresh roll results');

    function reroll() {
        let newRoll = new RollDisplayHelper(rollHelper.storedRoll);
        HistoryManager.getInstance().addToHistory(newRoll);
    }

    function exitShake() {
        clearInterval(updateIntervalRef.current)
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        console.log('exitShake');
        setAnimationsState({animationsRunning:false, hasShook:false});
    }

    function softExitShake() {
        if(!killedAnimations.current){
            killedAnimations.current = true;
            console.log('softExitShake');
            setTimeout(() => {
                exitShake();
            }, HOLD_TIME);
        }
    }

    function exitDialog() {
        console.log('exitDialog');
        setAnimationsState({animationsRunning:false, hasShook:false});
        props.dismissPage();
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

    function animateDice() {
        elapsedTimeRef.current = Date.now() - startTimeRef.current;
        if(elapsedTimeRef.current > MAX_SHAKE_TIME) {
            softExitShake();
        }

        let isStable = AccelerometerManager.getInstance().accelStable;
        if(!hasShookRef.current && !isStable) {
            console.log('starting hold');
            hasShookRef.current = true;
            setAnimationsState({animationsRunning:true, hasShook:true});
        }

        if(hasShookRef.current && !hasHeldRef.current && isStable) {
            hasHeldRef.current = true;
            console.log('held timeout');
            setTimeout(() => softExitShake(), HOLD_TIME);
        }

        for(let shakeDie of shakeDieArray) {

            shakeDie.updatePosition(killedAnimations.current);
            
            Animated.parallel([
                Animated.timing(shakeDie.xPositionAnimated, {
                    toValue: shakeDie.xPosition,
                    duration: ANIMATION_RUNTIME,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(shakeDie.yPositionAnimated, {
                    toValue: shakeDie.yPosition,
                    duration:ANIMATION_RUNTIME,
                    easing: Easing.linear,
                    useNativeDriver:true,
                }),
                Animated.timing(shakeDie.rotationAnimated, {
                    toValue: shakeDie.rotation,
                    duration:ANIMATION_RUNTIME,
                    easing: Easing.linear,
                    useNativeDriver:true,
                }),
            ]).start();
        }
    }

    useEffect(() => {
        if(rollHelper.storedRoll.getTotalDiceInRoll() !== 0) {
            let startAnimations = ShakeEnabledManager.getInstance().getShakeEnabled();
            
            if(startAnimations) {
                hasHeldRef.current = false;
                hasShookRef.current = false;
                setAnimationsState({animationsRunning:true, hasShook:false});
            }

            if(startAnimations) {
                startTimeRef.current = Date.now();
                killedAnimations.current = false;
                updateIntervalRef.current = setInterval(animateDice, ANIMATION_RUNTIME);

                return (() => {
                    clearInterval(updateIntervalRef.current)
                })
            }
        }
    }, [rollHelper])

    // TODO: Add sound
    //if (rollValues.mRollMaximumValue) {
    //    playTripleHorn()
    //} else if (rollValues.mRollMinimumValue) {
    //    playWilhelmScream()
    //}

    if(animationsState.animationsRunning) {
        return (
            <View style={styles.Container}>
            {shakeDieArray.map(renderShakeDie)}
            <View style={styles.ShakeContainer}>
                <Text style={styles.TitleText}>
                    {animationsState.hasShook ? "Hold Still" : "Shake!"}
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
            {animationsState.animationsRunning ? shakeDieArray.map(renderShakeDie) : null}
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