
import React, { useRef, useState } from 'react'

import {
    View, 
    Text,
    FlatList,
} from 'react-native';

import { RollDisplayHelper } from './dice/RollDisplayHelper';
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color'
import { RestoreHistoryButton } from './helpers/RestoreHistoryButton';
import { HistoryItemView } from './helpers/HistoryItemView';
import HistoryManager from './sync/HistoryManager';

export function HistoryPage() {

    const flatList = useRef(null as FlatList<RollDisplayHelper>);

    console.log('refresh history page');

    function divider() {
        return(<View style={styles.ListDivider}/>);
    }

    return (
        <View>
            <FlatList
                ref={flatList}
                ListEmptyComponent={
                    <View style={styles.NoHistoryTextContainer}>
                        <Text style={styles.NoHistoryText}>No history</Text>
                        <RestoreHistoryButton canRestoreHistory={HistoryManager.getInstance().canRestoreHistory()} restoreHistory={() => HistoryManager.getInstance().restoreHistory()}/>
                    </View>
                }
                data={HistoryManager.getInstance().getHistory()}
                ItemSeparatorComponent={divider}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>  (
                    <HistoryItemView rollHelper={item}/>
                )}
                onContentSizeChange={() => flatList.current.scrollToEnd()}
                inverted={true}
            />
        </View>
    );
}

const styles = EStyleSheet.create({
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
})