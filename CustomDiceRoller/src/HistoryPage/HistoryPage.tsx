
import React, { useRef, useState, useEffect } from 'react'

import {
    View, 
    Text,
    FlatList,
    ScaledSize,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color'

import { RollDisplayHelper } from '../Common/dice/results/RollDisplayHelper';

import HistoryManager from '../Common/managers/HistoryManager';

import { RestoreHistoryButton } from './buttons/RestoreHistoryButton';
import { HistoryItemView } from './views/HistoryItemView';

interface HistoryInterface{
    window : ScaledSize
}

export function HistoryPage(props : HistoryInterface) {

    const flatList = useRef(null as FlatList<RollDisplayHelper>);
    
    const [reload, setReload] = useState(false);

    let HistoryManagerInstance = HistoryManager.getInstance();

    useEffect(() => {
        HistoryManagerInstance.setHistoryUpdater(() => setReload(!reload))
        return(() => HistoryManagerInstance.setHistoryUpdater(null))
    })

    let fullHistory = HistoryManagerInstance.getHistory();

    console.log('refresh history page');

    function divider() {
        return(<View style={styles.ListDivider}/>);
    }

    function renderItem({item}) { return <HistoryItemView window={props.window} rollHelper={item}/> }

    function scrollToStart() {
        try{
            if(fullHistory.length > 0) {
                flatList.current.scrollToIndex({animated:false, index:0})
            }
        } catch (error) {
            // Throw the error away. We don't care about it.
        }
    }

    return (
        <View>
            <FlatList
                ref={flatList}
                ListEmptyComponent={
                    <View style={styles.NoHistoryTextContainer}>
                        <Text style={styles.NoHistoryText}>No history</Text>
                        <RestoreHistoryButton canRestoreHistory={HistoryManagerInstance.canRestoreHistory()} restoreHistory={() => HistoryManagerInstance.restoreHistory()}/>
                    </View>
                }
                data={HistoryManagerInstance.getMostRecentHistory(HistoryManagerInstance.ItemsToGet)}
                ItemSeparatorComponent={divider}
                renderItem={renderItem}
                onEndReached={() => {
                    if(HistoryManagerInstance.ItemsToGet < fullHistory.length) {
                        HistoryManagerInstance.TotalItems = fullHistory.length;
                        HistoryManagerInstance.ItemsToGet = HistoryManagerInstance.ItemsToGet * 2;
                    }
                }}
                onEndReachedThreshold={0.75}
                onContentSizeChange={() => {
                    // You need this block because sometimes this triggers when you haven't actually changed the data.
                    if(fullHistory.length !== HistoryManagerInstance.TotalItems) {
                        HistoryManagerInstance.TotalItems = fullHistory.length;
                        HistoryManagerInstance.ItemsToGet = HistoryManagerInstance.ITEMS_TO_GET_BASE;
                        setTimeout(scrollToStart, 0);
                    }
                }}
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
        fontSize:'$fontSizeHuge',
    },
})