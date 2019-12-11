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

export function CustomPageDieView({die}) {
    
    const [width, setWidth] = useState(Dimensions.get("window").width);

    function handleScreenChange({window}) {
        setWidth(window.width);
    }

    useEffect(() => {
        Dimensions.addEventListener("change", handleScreenChange);
        
        return () => {
            Dimensions.removeEventListener("change", handleScreenChange);
        }
    });

    return (
        <View style={styles.background}>
            <UpDownDeleteButtonColumn upPressHandler={() => null} deletePressHandler={() => null} downPressHandler={() => null}/>
            <DieView die={die} size={width*2/7} />
            <View style={styles.diceColumn}>
                <NumDiceUpDownButtons 
                    count={1} 
                    setCount={(newNumDice: number) => null} />
                <ModifierUpDownButtons 
                    count={0} 
                    setCount={(newModifier: number) => null}
                />
                <PropertiesButton properties={new RollProperties({})} updateProperties={() => null} />
            </View>
        </View> 
    );
}

const styles = EStyleSheet.create({
    background:{
        flexDirection:'row',
        alignItems:'center'
    },
    diceColumn:{
        flex:1,
        flexDirection:'column'
    },
})