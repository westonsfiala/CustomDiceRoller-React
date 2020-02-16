import { ModalDialogBase } from "./ModalDialogBase";

import React, { useState, useRef } from 'react';

import {
    View,
    Text,
    TextInput,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color';
import { Roll } from "../dice/Roll";
import { OkCancelButtons } from "../helpers/OkCancelButtons";

interface CreateRollDialogInterface {
    modalShown : boolean;
    roll: Roll;
    dismissModal: () => void;
    createRoll: (roll: Roll) => void;
}

export function CreateRollDialog(props : CreateRollDialogInterface) {

    const [rollName, setRollName] = useState('')
    const [rollCategory, setRollCategory] = useState('')

    const firstLineRef = useRef(null);
    const secondLineRef = useRef(null);

    function acceptHandler() {
        let newName = rollName;

        if(newName === '') {
            newName = props.roll.mRollName;
        }

        let newCategory = rollCategory;

        if(newCategory === '') {
            newCategory = props.roll.mRollCategory;
        }

        props.dismissModal();
        props.createRoll(props.roll.setNameCategory(newName, newCategory))
    }

    return(
        <ModalDialogBase modalShown={props.modalShown} dismissModal={props.dismissModal}>
            <Text style={styles.ModalTitle}>Create Roll</Text>
            <View style={styles.ModalTextInputLine}>
                <Text style={styles.ModalText}>Name</Text>
                <TextInput 
                    style={styles.ModalInputText}
                    ref={firstLineRef}
                    autoFocus={true}
                    selectTextOnFocus={true}
                    defaultValue={rollName}
                    placeholder={props.roll.mRollName}
                    placeholderTextColor={styles.PlaceholderText.color}
                    onChangeText={(text) => setRollName(text)}
                    returnKeyType = { "next" }
                    onSubmitEditing={() => { secondLineRef.current.focus(); }}
                    blurOnSubmit={false}
                />
            </View>
            <View style={styles.ModalTextInputLine}>
                <Text style={styles.ModalText}>Category</Text>
                <TextInput 
                    style={styles.ModalInputText}
                    ref={secondLineRef}
                    selectTextOnFocus={true}
                    defaultValue={rollCategory}
                    placeholder={props.roll.mRollCategory}
                    placeholderTextColor={styles.PlaceholderText.color}
                    onChangeText={(text) => setRollCategory(text)}
                    returnKeyType = { "done" }
                    onSubmitEditing={() => { acceptHandler(); }}
                    blurOnSubmit={false}
                />
            </View>
            <OkCancelButtons accept={acceptHandler} dismiss={props.dismissModal}/>
        </ModalDialogBase>
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
        fontSize:'$fontSizeHuge',
        color:'$textColor',
    },
    ModalText:{
        fontSize:'$fontSizeNormal',
        color:'$textColor',
    },
    ModalInputText:{
        flex:1,
        color:'$textColor',
        marginLeft:'8rem',
        fontSize:'$fontSizeNormal',
        borderBottomWidth:'1rem',
        borderColor:Color.rgb(128,128,128).hex()
    },
    PlaceholderText:{
        color:Color.rgb(128,128,128).hex()
    },
    HitSlop: {
        top:'5rem',
        bottom:'5rem',
        right:'5rem',
        left:'5rem'
    }
})