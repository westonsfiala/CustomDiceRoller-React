import React, { useState } from 'react'

import {
    View,
    ScaledSize,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import { SimplePageDieView } from './SimplePageDieView'
import { NumDiceUpDownButtons, ModifierUpDownButtons } from '../../helpers/UpDownButtons';
import { RollProperties } from '../RollProperties';
import { UpDownDeleteButtonColumn } from '../../helpers/UpDownDeleteButtonColumn';
import { PropertiesButton } from '../../helpers/PropertiesButton';
import { DiePropertyPair } from './DiePropertyPair';
import Touchable from 'react-native-platform-touchable';
import { Die } from '../Die';
import { CreateDieDialog } from '../../dialogs/CreateDieDialog';

interface CustomDieViewProps {
    diePropPair: DiePropertyPair;
    window : ScaledSize;
    updateDie: (oldDie: Die, newDie : Die) => void;
    updateProperties: (props : RollProperties) => Promise<any>;
    moveUpHandler: () => void;
    deleteHandler: () => void;
    moveDownHandler: () => void;
}

export function CustomPageDieView(props : CustomDieViewProps) {
    
    const [editModalShown, setEditModalShown] = useState(false);

    let minWidthHeight = Math.min(props.window.width, props.window.height)

    function handleEndEdit(editDie : Die) {
        props.updateDie(props.diePropPair.mDie, editDie);
        setEditModalShown(false);
    }

    return (
        <View style={styles.background}>
            <UpDownDeleteButtonColumn 
                upPressHandler={props.moveUpHandler} 
                deletePressHandler={props.deleteHandler} 
                downPressHandler={props.moveDownHandler}
            />
            <SimplePageDieView
                die={props.diePropPair.mDie}
                size={minWidthHeight*2/7}
                pressDieCallback={() => null}
                removeDieCallback={props.deleteHandler}
                editDieCallback={handleEndEdit}
            />
            <View style={styles.diceColumn}>
                <NumDiceUpDownButtons 
                    getCount={() => {
                        return props.diePropPair.mProperties.mNumDice;
                    }}
                    setCount={(newNumDice: number) => props.updateProperties(props.diePropPair.mProperties.clone({numDice: newNumDice}))} 
                />
                <ModifierUpDownButtons 
                    getCount={() => {
                        return props.diePropPair.mProperties.mModifier;
                    }}
                    setCount={(newModifier: number) => props.updateProperties(props.diePropPair.mProperties.clone({modifier: newModifier}))} 
                />
                <PropertiesButton window={props.window} getProperties={() => props.diePropPair.mProperties} updateProperties={(newProps : RollProperties) => { return props.updateProperties(newProps)}} />
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