
import React, { useRef, useState, useEffect } from 'react'

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
    const lastNumItemsRef = useRef(HistoryManager.getInstance().getHistory().length);
    
    const [reload, setReload] = useState(false);

    HistoryManager.getInstance().setHistoryUpdater(() => {
        setReload(!reload)
    });

    console.log('refresh history page');

    function divider() {
        return(<View style={styles.ListDivider}/>);
    }

    function renderItem({item}) { return <HistoryItemView rollHelper={item}/> }

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
                renderItem={renderItem}
                inverted={true}
                onContentSizeChange={() => {
                    let numItems = HistoryManager.getInstance().getHistory().length;
                    // You need this block because sometimes this triggers when you haven't actually changed the data.
                    if(numItems !== lastNumItemsRef.current) {
                        lastNumItemsRef.current = numItems;
                        flatList.current.scrollToEnd();
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