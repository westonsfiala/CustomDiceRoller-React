

import React, {
    useState, useEffect,
} from 'react'

import Modal, { 
    ModalContent, 
    ScaleAnimation,
} from 'react-native-modals';

import {
    View, 
    Text,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from 'react-native';

import { RollDisplayHelper } from '../dice/RollDisplayHelper';
import EStyleSheet from 'react-native-extended-stylesheet';
import { StruckStringPairView, StruckStringPair } from '../dice/StruckStringPair';

export function RollResultsDialog({rollHelper = null as RollDisplayHelper, setRollHelper}) {

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
        <Modal 
                onTouchOutside={() => setRollHelper(null)} 
                visible={modalShown}
                modalAnimation={new ScaleAnimation()}
                onDismiss={() => setRollHelper(null)}
                height={modalHeight}
            >
                <ModalContent style={styles.Container}>
                    <ScrollView onContentSizeChange={(width, height) => handleSizeChange(height)}>
                        <Text style={styles.TitleText}>
                            {rollHelper && rollHelper.rollNameText || ''}
                        </Text>
                        <StruckStringPairView pair={rollHelper && rollHelper.rollSumText || new StruckStringPair("","")} style={styles.SumText}/>
                        {(rollHelper && rollHelper.rollResultsText || []).map((item, index) => 
                            <StruckStringPairView key={index} pair={item} style={styles.DetailText}/>)
                        }
                        <View style={styles.ButtonContainer}>
                            <TouchableOpacity onPress={() => setRollHelper(new RollDisplayHelper(rollHelper.storedRoll))}>
                                <Text style={styles.ButtonText}>Roll Again</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setRollHelper(null)}>
                                <Text style={styles.ButtonText}>Exit</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </ModalContent>
            </Modal>
    );
}

const styles = EStyleSheet.create({
    Container:{
        flex:1, 
        alignItems:'center', 
        backgroundColor:'$primaryColor',
    },
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
        justifyContent:'space-around',
        marginTop:'8rem'
    },
    ButtonText: {
        fontSize:'20rem',
        color:'$textColor',
        textAlign:'center',
    }
})