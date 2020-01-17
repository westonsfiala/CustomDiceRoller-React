

import React, { } from 'react'

import {
    View, 
    Text,
} from 'react-native';

export class StruckStringPair {

    public id : string;
    public regularText : string;
    public struckText : string;

    constructor(regularText: string, struckText: string, id: string = '') {
        this.id = id;
        this.regularText = regularText;
        this.struckText = struckText;
    }
}

export function StruckStringPairView ({pair, style}) {

    let extraSpace = "";
    if(pair.struckText.length !== 0) {
        extraSpace = " "
    }

    return(
    <View>
        <Text style={style}>
            {pair.regularText + extraSpace}
            <Text style={[style, {textDecorationLine: 'line-through'}]}>
                {pair.struckText}
            </Text>
        </Text>
    </View>
    )
}