import React from 'react';

import { View } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';

interface verticalSpaceInterface {

}

export function VerticalSpace(props: verticalSpaceInterface) {
    return(<View style={styles.ListDivider}/>);
}

const styles = EStyleSheet.create({
    ListDivider:{
        marginTop:'10rem',
        marginBottom:'10rem',
    },
});