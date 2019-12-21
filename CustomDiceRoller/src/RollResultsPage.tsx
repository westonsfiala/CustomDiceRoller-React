

import React, { useState } from 'react'

import {
    View, 
    Text,
    ScrollView,
} from 'react-native';

import Touchable from 'react-native-platform-touchable';
import EStyleSheet from 'react-native-extended-stylesheet';

import { RollDisplayHelper } from './dice/RollDisplayHelper';
import { StruckStringPairView } from './dice/StruckStringPair';
import HistoryManager from './sync/HistoryManager';
import AccelerationManager from './hardware/AccelerometerManager';

interface RollResultsInterface {
    dismissDialog: () => void;
}

export function RollResultsPage(props : RollResultsInterface) {

    console.log('refresh roll results');
    const [reload, setReload] = useState(false);
    const [manager, setManager] = useState(AccelerationManager.getInstance());

    HistoryManager.getInstance().setUpdater(() => setReload(!reload));

    let rollHelper = HistoryManager.getInstance().getLastRoll();

    function reroll() {
        let newRoll = new RollDisplayHelper(rollHelper.storedRoll);
        HistoryManager.getInstance().addToHistory(newRoll);
    }

    // TODO: lock screen rotation
    //dialog.setOnDismissListener {
    //    unlockRotation()
    //}

    // TODO: Add sound
    //if (rollValues.mRollMaximumValue) {
    //    playTripleHorn()
    //} else if (rollValues.mRollMinimumValue) {
    //    playWilhelmScream()
    //}

    return (
        <View style={styles.Container}>
            <View style={styles.Container}>
                <ScrollView contentContainerStyle={{justifyContent:'center'}} style={{}}>
                    <Text style={styles.TitleText}>
                        {rollHelper.rollNameText}
                    </Text>
                </ScrollView>
            </View>
            <StruckStringPairView pair={rollHelper.rollSumText} style={styles.SumText}/>
            <View style={styles.ScrollContainer}>
                <ScrollView>
                    {(rollHelper.rollResultsText).map((item, index) => 
                        <StruckStringPairView key={index} pair={item} style={styles.DetailText}/>)
                    }
                </ScrollView>
            </View>
            <View style={styles.ButtonContainer}>
                <Touchable 
                style={styles.ButtonBackground}
                onPress={reroll}
                foreground={Touchable.Ripple('white', true)}
                hitSlop={styles.HitSlop}
                >
                    <Text style={styles.ButtonText}>Roll Again</Text>
                </Touchable>
                <Touchable 
                style={styles.ButtonBackground}
                onPress={() => props.dismissDialog()}
                foreground={Touchable.Ripple('white', true)}
                hitSlop={styles.HitSlop}
                >
                    <Text style={styles.ButtonText}>Exit</Text>
                </Touchable>
            </View>
        </View>
    );
}

const styles = EStyleSheet.create({
    Container: {
        flex:1,
        alignContent:'center',
        justifyContent:'center'
    },
    ScrollContainer: {
        flex:2,
        alignContent:'center',
        justifyContent:'center'
    },
    TitleText: {
        fontSize:'40rem',
        color:'$textColor',
        textAlign:'center',
    },
    SumText: {
        fontSize:'80rem',
        color:'$textColor',
        textAlign:'center',
    },
    DetailText: {
        fontSize:'22rem',
        color:'$textColor',
        textAlign:'center',
    },
    ButtonContainer: {
        flexDirection:'row', 
        alignItems:'stretch',
        alignContent:'stretch',
        justifyContent:'space-around',
        marginTop:'8rem'
    },
    ButtonBackground: {
        flex:1,
        backgroundColor: '$primaryColorLightened',
        borderRadius: '10rem',
        overflow:'hidden',
        margin:'10rem'
    },
    ButtonText: {
        fontSize: '30rem', 
        textAlign: 'center', 
        color: '$textColor',
    },
    HitSlop: {
        top:'10rem',
        bottom:'10rem',
        right:'10rem',
        left:'10rem'
    }
})