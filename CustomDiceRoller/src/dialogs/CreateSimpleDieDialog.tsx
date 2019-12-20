import { ModalDialogBase } from "./ModalDialogBase";

import React, { useState, useMemo } from 'react';

import {
    View,
    Text,
    TextInput,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color';
import { SimpleDie } from "../dice/SimpleDie";
import { Die } from "../dice/Die";
import { OkCancelButtons } from "../helpers/OkCancelButtons";

interface CreateSimpleDieInterface {
    modalShown : boolean;
    die : SimpleDie;
    dismissModal : () => void;
    createDie : (die : Die) => void;
}

export function CreateSimpleDieDialog(props : CreateSimpleDieInterface) {

    const [dieName, setDieName] = useState('')
    const [dieNumberString, setDieNumberString] = useState(props.die.mDie.toString() as string)

    function acceptHandler() {
        let possibleNumber = Number.parseInt(dieNumberString)
        if(Number.isSafeInteger(possibleNumber) && possibleNumber >= 0)
        {
            props.createDie(new SimpleDie(dieName, possibleNumber))
        }

        props.dismissModal();
    }

    function modalContent() {
        return(
            <View>
                <Text style={styles.ModalTitle}>Create Simple Die</Text>
                <View style={styles.ModalTextInputLine}>
                    <Text style={styles.ModalText}>Name</Text>
                    <TextInput 
                    style={styles.ModalInputText}
                    defaultValue={dieName}
                    placeholder={SimpleDie.tempName(dieNumberString)}
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
                    defaultValue={dieNumberString}
                    keyboardType={'number-pad'}
                    onChangeText={(text) => setDieNumberString(text)}
                    />
                </View>
                <OkCancelButtons accept={acceptHandler} dismiss={props.dismissModal}/>
            </View>
        )
    }

    return(
        <ModalDialogBase modalShown={props.modalShown} dismissModal={props.dismissModal} width={.75} content={modalContent()}/>
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