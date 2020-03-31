import React from 'react';

import { View } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color'

export function HorizontalDivider() {
    return(<View style={styles.ListDivider}/>);
}

const styles = EStyleSheet.create({
    ListDivider:{
        marginTop:'10rem',
        marginBottom:'10rem',
        borderBottomColor: Color.rgb(128,128,128).hex(), 
        borderBottomWidth: 1,
    },
});