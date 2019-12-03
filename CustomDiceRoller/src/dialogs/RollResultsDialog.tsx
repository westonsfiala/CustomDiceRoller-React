

import React, {
    useState,
} from 'react'

import {
    View, 
    Text,
    ScrollView,
    Dimensions,
} from 'react-native';

import Touchable from 'react-native-platform-touchable';
import EStyleSheet from 'react-native-extended-stylesheet';

import { RollDisplayHelper } from '../dice/RollDisplayHelper';
import { StruckStringPairView, StruckStringPair } from '../dice/StruckStringPair';
import { ModalDialogBase } from './ModalDialogBase'

export function RollResultsDialog({rollHelper = null as RollDisplayHelper, addRollToHistory, dismissRollHelperDisplay}) {

    const [modalHeight, setModalHeight] = useState(.5)

    // This is the only way that I can tell of so far to get the size of the 
    function handleSizeChange(possibleHeight: number) {
        let {width, height} = Dimensions.get('window');

        // Arbitrary value that seems to make the contents fit.
        let newHeight = possibleHeight + 50;

        if(possibleHeight > height * 0.9) {
            newHeight = height * 0.9;
        }

        setModalHeight(newHeight);
    }

    function modalContent() {
        return(
            <ScrollView onContentSizeChange={(width, height) => handleSizeChange(height)}>
                <Text style={styles.TitleText}>
                    {rollHelper && rollHelper.rollNameText || ''}
                </Text>
                <StruckStringPairView pair={rollHelper && rollHelper.rollSumText || new StruckStringPair("","")} style={styles.SumText}/>
                {(rollHelper && rollHelper.rollResultsText || []).map((item, index) => 
                    <StruckStringPairView key={index} pair={item} style={styles.DetailText}/>)
                }
                <View style={styles.ButtonContainer}>
                    <Touchable 
                    onPress={() => addRollToHistory(new RollDisplayHelper(rollHelper.storedRoll))}
                    foreground={Touchable.Ripple('white', true)}
                    hitSlop={styles.HitSlop}
                    >
                        <Text style={styles.ButtonText}>Roll Again</Text>
                    </Touchable>
                    <Touchable 
                    onPress={() => dismissRollHelperDisplay()}
                    foreground={Touchable.Ripple('white', true)}
                    hitSlop={styles.HitSlop}
                    >
                        <Text style={styles.ButtonText}>Exit</Text>
                    </Touchable>
                </View>
            </ScrollView>
        )
    }
    
    let modalShown = rollHelper !== null;

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
        <ModalDialogBase modalShown={modalShown} dismissModal={dismissRollHelperDisplay} height={modalHeight} content={modalContent()} extraStyle={{flex:1}}/>
    );
}

const styles = EStyleSheet.create({
    TitleText: {
        fontSize:'20rem',
        color:'$textColor',
        textAlign:'center',
    },
    SumText: {
        fontSize:'60rem',
        color:'$textColor',
        textAlign:'center',
    },
    DetailText: {
        fontSize:'16rem',
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
    ButtonText: {
        fontSize:'20rem',
        color:'$textColor',
        textAlign:'center',
    },
    HitSlop: {
        top:'10rem',
        bottom:'10rem',
        right:'10rem',
        left:'10rem'
    }
})