import { ModalDialogBase } from "./ModalDialogBase";

import React, { useState } from 'react';

import {
    View,
    Text,
    TextInput,
    Platform,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color';
import { OkCancelButtons } from "../helpers/OkCancelButtons";
import { VerticalSpace } from "../helpers/VerticalSpace";

export function SetValueDialog({modalShown, valueEnforcer, titleText, defaultValue, dismissModal, acceptValue}) {

    const [currentText, setCurrentText] = useState(defaultValue.toString())

    function handleAccept() {
        let possibleNumber = Number.parseInt(currentText)
        if(Number.isSafeInteger(possibleNumber))
        {
            let newCount = valueEnforcer(possibleNumber)

            acceptValue(newCount)
        }

        dismissModal();
    }

    return(
        <ModalDialogBase modalShown={modalShown} dismissModal={dismissModal}>
            <View>
                <Text style={styles.ModalTitle}>{titleText}</Text>
                <View style={styles.ModalTextInputLine}>
                    <Text style={styles.ModalText}>Number</Text>
                    <TextInput 
                    style={styles.ModalInputText}
                    autoFocus={true}
                    selectTextOnFocus={true}
                    defaultValue={defaultValue.toString()}
                    keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'number-pad'}
                    onChangeText={(text) => setCurrentText(text)}
                    returnKeyType = { "done" }
                    onSubmitEditing={() => { handleAccept(); }}
                    blurOnSubmit={false}
                    />
                </View>
                <VerticalSpace/>
                <OkCancelButtons accept={handleAccept} dismiss={dismissModal}/>
            </View>
        </ModalDialogBase>
    );
}

const styles = EStyleSheet.create({
    ModalTextInputLine:{
        flexDirection:'row',
        alignItems:'center',
        paddingTop: Platform.OS === 'ios' ? '5rem' : 0,
        paddingBottom: Platform.OS === 'ios' ? '5rem' : 0,
    },
    ModalButtonLine:{
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    ModalButton:{
        paddingTop:'8rem',
        paddingLeft:'8rem',
        paddingRight:'8rem',
    },
    ModalTitle:{
        fontSize:'$fontSizeHuge',
        color:'$textColor',
    },
    ModalText:{
        fontSize:'$fontSizeLarge',
        color:'$textColor',
    },
    ModalInputText:{
        flex:1,
        color:'$textColor',
        marginLeft:'8rem',
        fontSize:'$fontSizeLarge',
        borderBottomWidth:'1rem',
        borderColor:Color.rgb(128,128,128).hex()
    },
    HitSlop: {
        top:'10rem',
        bottom:'10rem',
        right:'10rem',
        left:'10rem'
    }
})