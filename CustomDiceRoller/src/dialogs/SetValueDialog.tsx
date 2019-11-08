import { ModalDialogBase } from "./ModalDialogBase";

import React from 'react';

import {
    View,
    Text,
    TextInput,
} from 'react-native';

import Touchable from 'react-native-platform-touchable';
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color';

export function SetValueDialog({modalShown, defaultValue, textChangeHandler, dismissModal, acceptValue}) {

    function modalContent() {
        return(
            <View>
                <Text style={styles.ModalTitle}>Set Exact Value</Text>
                <View style={styles.ModalTextInputLine}>
                    <Text style={styles.ModalText}>Number</Text>
                    <TextInput 
                    style={styles.ModalInputText}
                    autoFocus={true}
                    selectTextOnFocus={true}
                    defaultValue={defaultValue.toString()}
                    keyboardType={'number-pad'}
                    onChangeText={(text) => textChangeHandler(text)}
                    />
                </View>
                <View style={styles.ModalButtonLine}>
                    <Touchable 
                    style={styles.ModalButton}
                    hitSlop={styles.HitSlop}
                    onPress={() => dismissModal()}
                    >
                        <Text style={styles.ModalText}>Cancel</Text>
                    </Touchable>
                    <Touchable 
                    style={styles.ModalButton}
                    hitSlop={styles.HitSlop}
                    onPress={() => acceptValue()}
                    >
                        <Text style={styles.ModalText}>OK</Text>
                    </Touchable>
                </View>
            </View>
        )
    }

    return(
        <ModalDialogBase modalShown={modalShown} dismissModal={dismissModal} width={.75} content={modalContent()}/>
    );
}

const styles = EStyleSheet.create({
    ModalTextInputLine:{
        flexDirection:'row',
        alignItems:'center'
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
        fontSize:'20rem',
        color:'$textColor',
    },
    ModalText:{
        fontSize:'16rem',
        color:'$textColor',
    },
    ModalInputText:{
        flex:1,
        color:'$textColor',
        marginLeft:'8rem',
        fontSize:'16rem',
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