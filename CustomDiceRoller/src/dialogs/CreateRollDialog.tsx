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
import { Roll } from "../dice/Roll";

interface CreateRollDialogInterface {
    modalShown : boolean,
    roll: Roll,
    dismissModal: () => void;
    createRoll: (roll: Roll) => void;
}

export function CreateRollDialog(props : CreateRollDialogInterface) {

    const [rollName, setRollName] = useState('')
    const [rollCategory, setRollCategory] = useState('')

    function acceptHandler() {
        let newName = rollName;

        if(newName === '') {
            newName = props.roll.mRollName;
        }

        let newCategory = rollCategory;

        if(newCategory === '') {
            newCategory = props.roll.mRollCategory;
        }

        props.createRoll(props.roll.setNameCategory(newName, newCategory))
        props.dismissModal();
    }

    function modalContent() {
        return(
            <View>
                <Text style={styles.ModalTitle}>Create Roll</Text>
                <View style={styles.ModalTextInputLine}>
                    <Text style={styles.ModalText}>Name</Text>
                    <TextInput 
                        style={styles.ModalInputText}
                        placeholder={props.roll.mRollName}
                        placeholderTextColor={styles.PlaceholderText.color}
                        onChangeText={(text) => setRollName(text)}
                    />
                </View>
                <View style={styles.ModalTextInputLine}>
                    <Text style={styles.ModalText}>Category</Text>
                    <TextInput 
                        style={styles.ModalInputText}
                        placeholder={props.roll.mRollCategory}
                        placeholderTextColor={styles.PlaceholderText.color}
                        onChangeText={(text) => setRollCategory(text)}
                    />
                </View>
                <View style={styles.ModalButtonLine}>
                    <Touchable 
                    style={styles.ModalButton}
                    hitSlop={styles.HitSlop}
                    foreground={Touchable.Ripple('white', true)}
                    onPress={() => props.dismissModal()}
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