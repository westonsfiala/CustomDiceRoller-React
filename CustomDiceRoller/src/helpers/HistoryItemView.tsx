
import React, { useEffect, useState } from 'react'

import {
    View, 
    Text,
    FlatList,
    ScaledSize,
    LayoutAnimation,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color'
import { RollDisplayHelper } from '../dice/views/RollDisplayHelper';
import { StruckStringPairView } from '../dice/views/StruckStringPair';
import HistoryManager from '../sync/HistoryManager';
import QuickRollEnabledManager from '../sync/QuickRollEnabledManager';
import Touchable from 'react-native-platform-touchable';

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

interface SimpleHistoryItemInterface {
    window : ScaledSize;
}

export function SimplifiedLastHistoryItemView(props : SimpleHistoryItemInterface) {

    const [showState, setShowState] = useState({show:false, rollHelper:HistoryManager.getInstance().getLastRoll()});

    useEffect(() => {
        HistoryManager.getInstance().setQuickShowUpdater(() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setShowState({show:true, rollHelper:HistoryManager.getInstance().getLastRoll()})
        });
        return(() => HistoryManager.getInstance().setQuickShowUpdater(null))
    })

    // After we show ourselves, go away after 5 seconds.
    useEffect(() => {
        let timeoutHandle = setTimeout(() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setShowState({show:false, rollHelper:HistoryManager.getInstance().getLastRoll()});
        }, 3000);
        return (() => {
            clearTimeout(timeoutHandle)
        })
    });

    if(showState.show && QuickRollEnabledManager.getInstance().getQuickRollEnabled())
    {
        return (
            <Touchable 
                style={styles.SimpleHistoryContainer}
                foreground={Touchable.Ripple('white')}
                onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    setShowState({show:false, rollHelper:HistoryManager.getInstance().getLastRoll()});
                }}
            >
                <View style={styles.SimpleHistoryRow}>
                    <View style={{maxWidth: props.window.width/3}}>
                        <StruckStringPairView pair={showState.rollHelper.rollSumText} style={styles.SimpleSumText}/>
                    </View>
                    <View style={styles.SimpleHistoryTextContainer}>
                        <Text style={styles.SimpleRollNameText}>
                            {showState.rollHelper.storedRoll.displayName}
                        </Text>
                        <Text style={styles.SimpleRollNameText}>
                            {showState.rollHelper.rollNameText}
                        </Text>
                    </View>
                </View>
            </Touchable>
        );
    }
    
    return (null);
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
        fontSize:'$fontSizeHuge',
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
        fontSize:'$fontSizeNormal',
    },
    TimeText:{
        color: Color.rgb(128,128,128).hex(),
        fontSize:'$fontSizeNormal',
    },
    DetailStringList:{
        flex:1,
        paddingBottom:'4rem',
    },
    DetailString:{
        color:'$textColor',
        fontSize:'$fontSizeNormal',
    },
    SimpleHistoryContainer:{
        backgroundColor:'$primaryColorLightened',
        position:'absolute',
        left:'5rem',
        bottom:'15rem',
        right:'5rem',
        borderRadius: '10rem',
        borderColor:'$primaryColorDarkened',
        borderWidth:'2rem',
        overflow:'hidden',
        padding:'5rem',
        margin:'5rem'
    },
    SimpleHistoryTextContainer:{
        marginLeft:'5rem',
        marginRight:'5rem',
    },
    SimpleHistoryRow:{
        flexDirection:'row',
    },
    SimpleRollNameText:{
        color:'$textColor', 
        fontSize:'$fontSizeLarge',
    },
    SimpleSumText:{
        fontSize:'$fontSizeHuge',
        fontWeight:'bold', 
        padding:'8rem', 
        borderRadius: '10rem',
        textAlign:'center', 
        color:'$textColor', 
        backgroundColor:Color.rgb(0,0,0).hex(),
    },
})