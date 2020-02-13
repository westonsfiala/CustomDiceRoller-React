
import React from 'react'

import {
    View, 
    Text,
    FlatList,
    ScaledSize,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color'
import { RollDisplayHelper } from '../dice/views/RollDisplayHelper';
import { StruckStringPairView } from '../dice/views/StruckStringPair';

interface HistoryItemInterface {
    window : ScaledSize;
    rollHelper : RollDisplayHelper;
}

export function HistoryItemView(props : HistoryItemInterface) {
    return (
        <View style={styles.HistoryItemContainer}>
            <View style={styles.TopTextLine}>
                <View style={{maxWidth: props.window.width/3}}>
                    <StruckStringPairView pair={props.rollHelper.rollSumText} style={styles.SumText}/>
                </View>
                <View style={styles.NameTimeContainterOuter}>
                    <View style={styles.NameTimeContainterInner}>
                        <View style={styles.NameContainter}>
                            <Text style={styles.RollNameText}>
                                {props.rollHelper.storedRoll.displayName}
                            </Text>
                            <Text style={styles.RollNameText}>
                                {props.rollHelper.rollNameText}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.TimeText}>
                                {props.rollHelper.dateString}
                            </Text>
                            <Text style={styles.TimeText}>
                                {props.rollHelper.timeString}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <FlatList 
                style={styles.DetailStringList}
                data={props.rollHelper.rollResultsText}
                renderItem={({ item }) =>  (
                    <StruckStringPairView pair={item} style={styles.DetailString}/>
                )}
            />
        </View>
    );
}

const styles = EStyleSheet.create({
    HistoryItemContainer:{
        flex:1,
        padding:'4rem'
    },
    TopTextLine:{
        flex:1, 
        flexDirection:'row', 
    },
    SumText:{
        fontSize:'30rem', 
        fontWeight:'bold', 
        paddingStart:'8rem', 
        paddingEnd:'8rem', 
        paddingTop:'4rem', 
        paddingBottom:'4rem', 
        textAlign:'center', 
        color:'$textColor', 
        backgroundColor:Color.rgb(0,0,0).hex(),
    },
    NameTimeContainterOuter:{
        flex:1, 
        marginStart:4
    },
    NameTimeContainterInner:{
        flex:1, 
        flexDirection:'row', 
        justifyContent:'space-between'
    },
    NameContainter:{
        flex:1, 
    },
    RollNameText:{
        color:'$textColor', 
        fontSize:'17rem',
    },
    TimeText:{
        color: Color.rgb(128,128,128).hex(),
        fontSize:'14rem',
    },
    DetailStringList:{
        flex:1,
        paddingBottom:'4rem',
    },
    DetailString:{
        color:'$textColor',
        fontSize:'14rem',
    },
})