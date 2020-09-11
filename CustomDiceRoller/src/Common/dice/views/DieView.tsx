
import React, { useState } from 'react';

import 
{
    View,
    Text,
    Image,
} from 'react-native'

import EStyleSheet from 'react-native-extended-stylesheet';

import { getRequiredImage, getRequiredImageWhite } from '../dieImages/DieImageGetter';
import { Die } from '../Die';
import Color from 'color';
import DieTintManager from '../../../SettingsPage/Dice/DieTintManager';

interface DieImageInterface {
    dieId : number;
    size : number;
}

// Layer two die images on top of each other so that you can add a tint layer.
export function DieImage(props : DieImageInterface) {

    let tintEnabled = DieTintManager.getInstance().DieTintEnabled;
    let tintColor = DieTintManager.getInstance().DieTintColor;

    return(
        <View style={{width:props.size-2, height:props.size-2}}>
            <Image source={getRequiredImage(props.dieId)} style={{position:'absolute', width:props.size-2, height:props.size-2}}/>
            {tintEnabled ? <Image source={getRequiredImageWhite(props.dieId)} style={{position:'absolute', width:props.size-2, height:props.size-2, tintColor:tintColor.hex(), opacity:tintColor.alpha()}}/> : null}
        </View>
    )
}

interface DieViewInterface {
    die : Die;
    size : number;
}

export function DieView(props : DieViewInterface) {
    return(
        <View style={styles.Touch}>
            <DieImage dieId={props.die.imageID} size={props.size} />
            <Text numberOfLines={3} style={[styles.Text, {fontSize:props.size/4}]}>{props.die.mDieName}</Text>
        </View>
    );
};

const styles = EStyleSheet.create({
    Touch:{
        flexDirection:'column', 
        alignItems:'center', 
        padding:'2rem'
    },
    Text:{
        color:'$textColor'
    },
})