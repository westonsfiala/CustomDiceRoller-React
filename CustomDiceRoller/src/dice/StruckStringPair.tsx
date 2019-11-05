

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
    return(
    <View>
        <Text style={style}>
            {pair.regularText}
            <Text style={[style, {textDecorationLine: 'line-through'}]}>
                {pair.struckText}
            </Text>
        </Text>
    </View>
    )
}