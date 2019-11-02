
import React, { } from 'react'

import {
    View, 
    Text,
    FlatList,
} from 'react-native';
import { RollDisplayHelper } from './dice/RollDisplayHelper';

function HistoryItemView(rollHelper : RollDisplayHelper) {

    return (
        <View style={{}}>
            <View style={{flex:1, flexDirection:'row', padding: 4}}>
                <View style={{}}>
                    <Text style={{fontSize:30, fontWeight:'bold', paddingStart:6, paddingEnd:6, textAlign:'center', color:'white', backgroundColor:'black'}}>
                        {rollHelper.rollSumText.regularText}
                        <Text style={{textDecorationLine: 'line-through' }}>
                            {rollHelper.rollSumText.struckText}
                        </Text>
                    </Text>
                </View>
                <View style={{flex:1, marginStart:4}}>
                    <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
                        <View>
                            <Text style={{color:'white', fontSize:16}}>
                                {rollHelper.storedRoll.displayName}
                            </Text>
                            <Text style={{color:'white', fontSize:16}}>
                                {rollHelper.rollNameText}
                            </Text>
                        </View>
                        <View>
                            <Text style={{color:'gray'}}>
                                {rollHelper.timeStamp.toLocaleDateString()}
                            </Text>
                            <Text style={{color:'gray'}}>
                                {rollHelper.timeStamp.toLocaleTimeString()}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <FlatList 
                style={{flex:1, paddingStart:4, paddingEnd:4, paddingBottom:4}}
                contentContainerStyle={{alignContent:'center', justifyContent:'center', alignItems:'center'}}
                data={rollHelper.rollResultsText}
                renderItem={({ item }) =>  (
                    <View style={{}}>
                        <Text style={{color:'white', fontSize:14}}>
                            {item.regularText}
                            <Text style={{textDecorationLine: 'line-through'}}>
                                {item.struckText}
                            </Text>
                        </Text>
                    </View>
                )}
            />
        </View>
    );
}

export function HistoryPage({historyItems = [] as Array<RollDisplayHelper>}) {
    return (
        <View style={{}}>
            <FlatList 
                data={historyItems}
                contentContainerStyle={{alignItems:'stretch'}}
                ItemSeparatorComponent={ () => <View style={{ marginStart:4, marginEnd:4, borderBottomColor: 'gray', borderBottomWidth: 1 }} />}
                keyExtractor={(item, index) => item.timeStamp.toDateString() + '_' + index}
                renderItem={({ item }) =>  (
                     HistoryItemView(item)
                )}
            />
        </View>
    );
}