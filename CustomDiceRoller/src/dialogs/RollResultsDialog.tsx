

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
                    hitSlop={{top:20, bottom:20, left:20, right:20}}
                    >
                        <Text style={styles.ButtonText}>Roll Again</Text>
                    </Touchable>
                    <Touchable 
                    onPress={() => dismissRollHelperDisplay()}
                    hitSlop={{top:20, bottom:20, left:20, right:20}}
                    >
                        <Text style={styles.ButtonText}>Exit</Text>
                    </Touchable>
                </View>
            </ScrollView>
        )
    }
    
    let modalShown = rollHelper !== null;

    // TODO: Add history fuction with date
    //val time = Calendar.getInstance().time
    //val formatter = SimpleDateFormat("yyyy/MM/dd\nHH:mm:ss", Locale.getDefault())
    //val formattedDate = formatter.format(time)

    //listener.onRollResult(HistoryStamp(
    //    rollTotal.text,
    //    rollName.text,
    //    rollDetails.text,
    //    formattedDate
    //))

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
        fontSize:'30rem',
        color:'$textColor',
        textAlign:'center',
    },
    SumText: {
        fontSize:'50rem',
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
    }
})