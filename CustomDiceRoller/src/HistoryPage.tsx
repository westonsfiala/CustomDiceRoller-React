
import React, { Component, useState, useRef } from 'react'

import {
    View, 
    Text,
    FlatList,
} from 'react-native';

import { RollDisplayHelper } from './dice/RollDisplayHelper';
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color'
import { StruckStringPairView } from './dice/StruckStringPair';

function HistoryItemView(rollHelper : RollDisplayHelper) {
    return (
        <View style={styles.HistoryItemContainer}>
            <View style={styles.TopTextLine}>
                <StruckStringPairView pair={rollHelper.rollSumText} style={styles.SumText}/>
                <View style={styles.NameTimeContainterOuter}>
                    <View style={styles.NameTimeContainterInner}>
                        <View>
                            <Text style={styles.RollNameText}>
                                {rollHelper.storedRoll.displayName}
                            </Text>
                            <Text style={styles.RollNameText}>
                                {rollHelper.rollNameText}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.TimeText}>
                                {rollHelper.timeStamp.toLocaleDateString()}
                            </Text>
                            <Text style={styles.TimeText}>
                                {rollHelper.timeStamp.toLocaleTimeString()}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <FlatList 
                style={styles.DetailStringList}
                data={rollHelper.rollResultsText}
                renderItem={({ item }) =>  (
                    <StruckStringPairView pair={item} style={styles.DetailString}/>
                )}
            />
        </View>
    );
}

export function HistoryPage({rollHistory = [] as Array<RollDisplayHelper>}) {

    const flatList = useRef(null as FlatList<RollDisplayHelper>);
    
    console.log('refresh history page');

    return (
        <View>
            <FlatList
                ref={flatList}
                ListEmptyComponent={
                    <View style={styles.NoHistoryTextContainer}>
                        <Text style={styles.NoHistoryText}>
                            No history yet
                        </Text>
                        <Text style={styles.NoHistoryText}>
                            Roll some dice to fill this tab out
                        </Text>
                    </View>
                }
                data={rollHistory}
                style={{flexDirection:'column'}}
                contentContainerStyle={styles.ListItem}
                ItemSeparatorComponent={ () => <View style={styles.ListDivider} />}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>  (
                    HistoryItemView(item)
                )}
                onContentSizeChange={() => flatList.current.scrollToEnd()}
                inverted={true}
            />
        </View>
    );
}

const styles = EStyleSheet.create({
    HistoryItemContainer:{
        flex:1,
        padding:'4rem'
    },
    ListItem:{
        alignItems:'stretch',
    },
    ListDivider:{
        marginStart:'4rem', 
        marginEnd:'4rem', 
        borderBottomColor: Color.rgb(128,128,128).hex(), 
        borderBottomWidth: 1,
    },
    NoHistoryTextContainer:{
        flex:1, 
        alignItems:'center', 
        justifyContent:'center',
    },
    NoHistoryText:{
        color:'$textColor', 
        fontSize:'22rem'
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
    }
})