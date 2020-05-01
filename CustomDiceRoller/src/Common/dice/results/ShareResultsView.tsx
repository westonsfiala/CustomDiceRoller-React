
import React from 'react';

import 
{
    View,
    Text,
    ScrollView,
} from 'react-native'

import EStyleSheet from 'react-native-extended-stylesheet';

import { RollDisplayHelper } from './RollDisplayHelper';
import { StruckStringPairView } from '../../views/StruckStringPair';

interface ShareResultsInterface {
    rollHelper : RollDisplayHelper;
}

export function ShareResultsView(props : ShareResultsInterface) {
    return(
        <View style={styles.Container}>
            <Text style={styles.DateTimeText}>{props.rollHelper.dateString} - {props.rollHelper.timeString}</Text>
            <View style={styles.Container}>
                <ScrollView contentContainerStyle={{justifyContent:'center', flexGrow: 1}} style={{}}>
                    <Text style={styles.TitleText}>{props.rollHelper.rollNameText}</Text>
                    <StruckStringPairView pair={props.rollHelper.rollSumText} style={styles.SumText}/>
                    {(props.rollHelper.rollResultsText).map((item, index) => 
                        <StruckStringPairView key={index} pair={item} style={styles.DetailText}/>)
                    }
                </ScrollView>
            </View>
        </View>
    );
};

const styles = EStyleSheet.create({
    Container: {
        flex:1,
        alignContent:'center',
        backgroundColor:'$primaryColor'
    },
    TitleText: {
        fontSize:'$fontSizeHuge',
        color:'$textColor',
        textAlign:'center',
    },
    SumText: {
        fontSize:'$fontSizeColossal',
        color:'$textColor',
        textAlign:'center',
    },
    DetailText: {
        fontSize:'$fontSizeLarge',
        color:'$textColor',
        textAlign:'center',
    },
    DateTimeText: {
        fontSize:'$fontSizeNormal',
        textAlign: 'right', 
        color: '$textColorDarkened',
    },
})