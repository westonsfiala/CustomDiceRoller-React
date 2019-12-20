import React, { useState, useEffect } from 'react'

import {
    View,
    Dimensions,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import { DieView } from "./DieView";
import { NumDiceUpDownButtons, ModifierUpDownButtons } from '../helpers/UpDownButtons';
import { RollProperties } from './RollProperties';
import { UpDownDeleteButtonColumn } from '../helpers/UpDownDeleteButtonColumn';
import { PropertiesButton } from '../helpers/PropertiesButton';
import { DiePropertyPair } from './DiePropertyPair';
import Touchable from 'react-native-platform-touchable';

interface CustomDieViewProps {
    diePropPair: DiePropertyPair;
    updateDie: () => void;
    updateProperties: (props : RollProperties) => void;
    moveUpHandler: () => void;
    deleteHandler: () => void;
    moveDownHandler: () => void;
}

export function CustomPageDieView(props : CustomDieViewProps) {
    
    const [minWidthHeight, setMinWidthHeight] = useState(Math.min(Dimensions.get("window").width, Dimensions.get("window").height));

    function handleScreenChange({window}) {
        setMinWidthHeight(Math.min(window.width, window.height));
    }

    useEffect(() => {
        Dimensions.addEventListener("change", handleScreenChange);
        
        return () => {
            Dimensions.removeEventListener("change", handleScreenChange);
        }
    });

    return (
        <View style={styles.background}>
            <UpDownDeleteButtonColumn 
                upPressHandler={() => props.moveUpHandler()} 
                deletePressHandler={() => props.deleteHandler()} 
                downPressHandler={() => props.moveDownHandler()}
            />
            <Touchable
                style={styles.ButtonBackground}
                foreground={Touchable.Ripple('white')}
                onPress={props.updateDie}
                >
                <DieView die={props.diePropPair.mDie} size={minWidthHeight*2/7} />
            </Touchable>
            <View style={styles.diceColumn}>
                <NumDiceUpDownButtons 
                    count={props.diePropPair.mProperties.mNumDice} 
                    setCount={(newNumDice: number) => props.updateProperties(props.diePropPair.mProperties.clone({numDice: newNumDice}))} 
                />
                <ModifierUpDownButtons 
                    count={props.diePropPair.mProperties.mModifier} 
                    setCount={(newModifier: number) => props.updateProperties(props.diePropPair.mProperties.clone({modifier: newModifier}))} 
                />
                <PropertiesButton properties={props.diePropPair.mProperties} updateProperties={(newProps : RollProperties) => props.updateProperties(newProps)} />
            </View>
        </View> 
    );
}

const styles = EStyleSheet.create({
    background:{
        flexDirection:'row',
        alignItems:'center',
    },
    diceColumn:{
        flex:1,
        flexDirection:'column'
    },
})