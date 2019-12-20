
import React, { useState } from 'react';

import 
{
    View,
    Text,
    Image,
} from 'react-native'

import EStyleSheet from 'react-native-extended-stylesheet';

import { getRequiredImage } from './DieImageGetter';
import { Die } from './Die';
import { SimpleDie } from './SimpleDie';

interface DieViewInterface {
    die : Die;
    size : number;
}

export function DieView(props : DieViewInterface) {
    
    return(
        <View style={styles.Touch}>
            <Image source={getRequiredImage(props.die.imageID)} style={{width:props.size-2, height:props.size-2}}/>
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