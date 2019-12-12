
import React, { useState, useEffect } from 'react'

import {
    View, 
    Text,
    FlatList,
    Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Touchable from 'react-native-platform-touchable';
import EStyleSheet from 'react-native-extended-stylesheet';

import { DieView } from "./dice/DieView";
import { Die } from "./dice/Die";
import { NumDiceUpDownButtons, ModifierUpDownButtons } from './helpers/UpDownButtons';
import { Roll } from './dice/Roll';
import { RollProperties } from './dice/RollProperties';
import { UpDownDeleteButtonColumn } from './helpers/UpDownDeleteButtonColumn';
import { SimpleDie } from './dice/SimpleDie';
import { PropertiesButton } from './helpers/PropertiesButton';
import { CustomPageDieView } from './dice/CustomPageDieView';

export function CustomDicePage({displayRoll}) {
    
    console.log('refresh custom page');

    return (
        <View style={styles.background}>
            <CustomPageDieView die={new SimpleDie("temp", 2)}/>
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
    ButtonRadius:{
        borderRadius: '10rem',
        margin: '3rem',
        overflow: 'hidden',
    },
    ButtonBackground:{
        backgroundColor: '$primaryColorLightened',
        borderRadius: '10rem',
    },
    ButtonForeground:{
        marginRight: 0,
    },
    IconConstants:{
        color: '$textColor',
        width: '45rem',
    },
})