
import React, { useRef, useState } from 'react'

import {
    View, 
    Text,
    FlatList,
    ScaledSize,
} from 'react-native';

import { RollDisplayHelper } from './dice/views/RollDisplayHelper';
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color'
import { RestoreHistoryButton } from './helpers/RestoreHistoryButton';
import { HistoryItemView } from './helpers/HistoryItemView';
import HistoryManager from './sync/HistoryManager';

const ITEMS_TO_GET_BASE = 20;

interface HistoryInterface{
    window : ScaledSize
}

export function HistoryPage(props : HistoryInterface) {

    const flatList = useRef(null as FlatList<RollDisplayHelper>);
    const [itemInfo, setItemInfo] = useState({totalItems:HistoryManager.getInstance().getHistory().length, toGet:ITEMS_TO_GET_BASE});
    
    const [reload, setReload] = useState(false);

    HistoryManager.getInstance().setHistoryUpdater(() => {
        setReload(!reload)
    });

    let fullHistory = HistoryManager.getInstance().getHistory();

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
                        <RestoreHistoryButton canRestoreHistory={HistoryManager.getInstance().canRestoreHistory()} restoreHistory={() => HistoryManager.getInstance().restoreHistory()}/>
                    </View>
                }
                data={HistoryManager.getInstance().getMostRecentHistory(itemInfo.toGet)}
                ItemSeparatorComponent={divider}
                renderItem={renderItem}
                onEndReached={() => {
                    if(itemInfo.toGet < fullHistory.length) {
                        setItemInfo({totalItems:fullHistory.length, toGet:itemInfo.toGet*2});
                    }
                }}
                onEndReachedThreshold={0.75}
                onContentSizeChange={() => {
                    // You need this block because sometimes this triggers when you haven't actually changed the data.
                    if(fullHistory.length !== itemInfo.totalItems) {
                        setItemInfo({totalItems:fullHistory.length, toGet:ITEMS_TO_GET_BASE});
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
        fontSize:'22rem'
    },
})