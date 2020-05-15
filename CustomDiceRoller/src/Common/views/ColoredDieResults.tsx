

import React from 'react'

import {
    View, 
    Text,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import MinMaxHighlightEnabledManager from '../../SettingsPage/Results/MinMaxHighlightEnabledManager';

export class ColoredDieResults {

    public id : string;
    public prependText : string;
    public appendText : string;
    public rollMin : number;
    public rollMax : number;
    public regularRolls : Array<any>;
    public struckRolls : Array<any>;

    constructor(prependText: string, appendText: string, rollMin: number, rollMax: number, regularRolls: Array<any>, struckRolls: Array<any>, id: string = '') {
        this.id = id;
        this.prependText = prependText;
        this.appendText = appendText;
        this.rollMin = rollMin;
        this.rollMax = rollMax;
        this.regularRolls = regularRolls;
        this.struckRolls = struckRolls;
    }
}

interface ColoredStruckStringInterface {
    dieResults : ColoredDieResults;
    style : any
}

export function ColoredDieResultsView (props: ColoredStruckStringInterface) {

    let extraSpace = "";
    if(props.dieResults.struckRolls.length !== 0) {
        extraSpace = " "
    }

    let divisor = props.dieResults.rollMax - props.dieResults.rollMin;
    if(divisor === 0)
    {
        divisor = 1;
    }

    return(
        <View>
            <Text style={props.style}>
                {props.dieResults.prependText}
                <Text style={props.style}>
                    {props.dieResults.regularRolls.map((value, index) => {
                        let textColor = styles.neutralTextColor.color;
                        if(MinMaxHighlightEnabledManager.getInstance().getMinMaxHighlightEnabled()) {
                            if(value >= props.dieResults.rollMax) {
                                textColor = styles.goodTextColor.color;
                            } else if (value <= props.dieResults.rollMin) {
                                textColor = styles.badTextColor.color;
                            }
                        }
                        return(
                            <Text key={index}>
                                {index !== 0 ? ', ' : ''}
                                <Text style={[props.style, {color: textColor}]}>{value}</Text>
                            </Text>
                        )
                    })}
                    {extraSpace}
                    <Text style={[props.style, {textDecorationLine: 'line-through'}]}>
                        {props.dieResults.struckRolls.map((value, index) => {
                            let textColor = styles.neutralTextColor.color;
                            if(MinMaxHighlightEnabledManager.getInstance().getMinMaxHighlightEnabled()) {
                                if(value == props.dieResults.rollMax) {
                                    textColor = styles.goodTextColor.color;
                                } else if (value == props.dieResults.rollMin) {
                                    textColor = styles.badTextColor.color;
                                }
                            }
                            return(
                                <Text key={index}>
                                    {index !== 0 ? ', ' : ''}
                                    <Text style={[props.style, {color: textColor}]}>{value}</Text>
                                </Text>
                            )
                        })}
                    </Text>
                </Text>
                {props.dieResults.appendText}
            </Text>
        </View>
    )
}


const styles = EStyleSheet.create({
    goodTextColor: {
        color:'$textColorGood',
    },
    neutralTextColor: {
        color:'$textColor',
    },
    badTextColor: {
        color:'$textColorBad',
    },
});