
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

export function DieView({die = new SimpleDie("temp", -1) as Die, size}) {
    
    return(
        <View style={styles.Touch}>
            <Image source={getRequiredImage(die.imageID)} style={{width:size-2, height:size-2}}/>
            <Text numberOfLines={3} style={[styles.Text, {fontSize:size/4}]}>{die.mDieName}</Text>
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