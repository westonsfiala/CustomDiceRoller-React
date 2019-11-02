

import React from 'react'

import Modal, { 
    ModalContent, 
    ScaleAnimation,
    ModalFooter,
    ModalButton
} from 'react-native-modals';

import {
    View, 
    Text,
    FlatList,
} from 'react-native';

import { RollDisplayHelper } from '../dice/RollDisplayHelper';

export function RollResultsDialog({rollHelper = null as RollDisplayHelper, setRollHelper}) {

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
                width={0.6}
                height={0.45}
                onDismiss={() => setRollHelper(null)}
            >
                <ModalContent style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <Text style={{fontSize:30}}>
                        {rollHelper && rollHelper.rollNameText || ''}
                    </Text>
                    <View style={{alignContent:'center', alignItems:'center', justifyContent:'center'}}>
                        <Text style={{fontSize:55, fontWeight:'bold', marginTop:4, marginBottom:4 }}>
                            {rollHelper && rollHelper.rollSumText.regularText || ''}
                            <Text style={{fontSize:50, fontWeight:'bold', marginTop:4, marginBottom:4, textDecorationLine: 'line-through' }}>
                                {rollHelper && rollHelper.rollSumText.struckText || ''}
                            </Text>
                        </Text>
                    </View>
                    <FlatList 
                        style={{flex:1}}
                        contentContainerStyle={{alignContent:'center', justifyContent:'center', alignItems:'center'}}
                        data={rollHelper && rollHelper.rollResultsText || []}
                        renderItem={({ item }) =>  (
                            <View style={{alignContent:'center', alignItems:'center', justifyContent:'center'}}>
                                <Text style={{fontSize:16}}>
                                    {item.regularText}
                                    <Text style={{textDecorationLine: 'line-through'}}>
                                        {item.struckText}
                                    </Text>
                                </Text>
                            </View>
                        )}
                    />
                </ModalContent>
                <ModalFooter>
                    <ModalButton text="Roll Again" onPress={() => setRollHelper(new RollDisplayHelper(rollHelper.storedRoll))} />
                    <ModalButton text="OK" onPress={() => setRollHelper(null)} />
                </ModalFooter>
            </Modal>
    );
}