import { ModalDialogBase } from "./ModalDialogBase";

import React, { useState } from 'react';

import {
    View,
    Text,
    TextInput,
} from 'react-native';

import Touchable from 'react-native-platform-touchable';
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color';
import { SimpleDie } from "../dice/SimpleDie";

export function CreateSimpleDieDialog({modalShown, die, dismissModal, createDie}) {

    const [dieName, setDieName] = useState('')
    const [dieNumberString, setDieNumberString] = useState(die.mDie.toString() as string)

    function acceptHandler() {
        let possibleNumber = Number.parseInt(dieNumberString)
        if(Number.isSafeInteger(possibleNumber) && possibleNumber >= 0)
        {
            createDie(new SimpleDie(dieName, possibleNumber))
        }

        dismissModal();
    }

    function modalContent() {
        return(
            <View>
                <Text style={styles.ModalTitle}>Create Simple Die</Text>
                <View style={styles.ModalTextInputLine}>
                    <Text style={styles.ModalText}>Name</Text>
                    <TextInput 
                    style={styles.ModalInputText}
                    placeholder={'d' + dieNumberString}
                    placeholderTextColor={styles.PlaceholderText.color}
                    onChangeText={(text) => setDieName(text)}
                    />
                </View>
                <View style={styles.ModalTextInputLine}>
                    <Text style={styles.ModalText}>Die</Text>
                    <TextInput 
                    style={styles.ModalInputText}
                    autoFocus={true}
                    selectTextOnFocus={true}
                    defaultValue={die.mDie.toString()}
                    keyboardType={'number-pad'}
                    onChangeText={(text) => setDieNumberString(text)}
                    />
                </View>
                <View style={styles.ModalButtonLine}>
                    <Touchable 
                    style={styles.ModalButton}
                    hitSlop={styles.HitSlop}
                    foreground={Touchable.Ripple('white', true)}
                    onPress={() => dismissModal()}
                    >
                        <Text style={styles.ModalText}>Cancel</Text>
                    </Touchable>
                    <Touchable 
                    style={styles.ModalButton}
                    hitSlop={styles.HitSlop}
                    foreground={Touchable.Ripple('white', true)}
                    onPress={() => acceptHandler()}
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
        paddingTop:'16rem',
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
    PlaceholderText:{
        color:Color.rgb(128,128,128).hex()
    },
    HitSlop: {
        top:'10rem',
        bottom:'10rem',
        right:'10rem',
        left:'10rem'
    }
})