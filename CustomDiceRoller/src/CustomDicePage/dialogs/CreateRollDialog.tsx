import React, { useState, useRef } from 'react';

import {
    View,
    Text,
    TextInput,
    Platform,
    LayoutAnimation,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color';

import { Roll } from "../../Common/dice/Roll";

import { ModalDialogBase } from "../../Common/dialogs/ModalDialogBase";

import { OkCancelButtons } from "../../Common/buttons/OkCancelButtons";
import { ConfirmActionButtons } from "../../Common/buttons/ConfirmActionButtons";

import CustomRollManager from "../managers/CustomRollManager";
import RollManager from "../../Common/managers/RollManager";

import { VerticalSpace } from "../../Common/views/VerticalSpace";

interface CreateRollDialogInterface {
    modalShown : boolean;
    roll: Roll;
    dismissModal: () => void;
}

export function CreateRollDialog(props : CreateRollDialogInterface) {

    const [rollName, setRollName] = useState('')
    const [rollCategory, setRollCategory] = useState('')
    const [showOverride, setShowOverride] = useState(false);

    function setShowOverrideNice(show : boolean) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShowOverride(show);
    }

    function dismissNice() {
        setShowOverrideNice(false);
        props.dismissModal();
    }

    const firstLineRef = useRef(null);
    const secondLineRef = useRef(null);

    function acceptHandler(force: boolean) {
        let newName = rollName;

        if(newName === '') {
            newName = props.roll.mRollName;
        }

        let newCategory = rollCategory;

        if(newCategory === '') {
            newCategory = props.roll.mRollCategory;
        }

        // Make the new roll, set it as the current roll, and try to override it
        let newRoll = props.roll.setNameCategory(newName, newCategory)
        CustomRollManager.getInstance().setRoll(newRoll);
        if(!RollManager.getInstance().addRoll(newRoll, force)) {
            if(force) {
                dismissNice();
            } else {
                setShowOverrideNice(true);
            }
        } else {
            dismissNice();
        }
    }

    function getBottomLine() {
        if(showOverride) {
            return (
                <ConfirmActionButtons 
                    show={showOverride} 
                    displayText={'Override?'}
                    confirm={() => acceptHandler(true)} 
                    cancel={() => setShowOverrideNice(false)}
                />
            );
        } else {
            return (
                <OkCancelButtons accept={() => acceptHandler(false)} dismiss={dismissNice}/>
            )
        }
    }

    return(
        <ModalDialogBase modalShown={props.modalShown} dismissModal={dismissNice}>
            <Text style={styles.ModalTitle}>Create Roll</Text>
            <View style={styles.ModalTextInputLine}>
                <Text style={styles.ModalText}>Name</Text>
                <TextInput 
                    style={styles.ModalInputText}
                    ref={firstLineRef}
                    autoFocus={true}
                    selectTextOnFocus={true}
                    defaultValue={props.roll.mRollName}
                    placeholder={'Temp'}
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
                    defaultValue={props.roll.mRollCategory}
                    placeholder={'Custom Roll'}
                    placeholderTextColor={styles.PlaceholderText.color}
                    onChangeText={(text) => setRollCategory(text)}
                    returnKeyType = { "done" }
                    onSubmitEditing={() => { acceptHandler(showOverride); }}
                    blurOnSubmit={false}
                />
            </View>
            <VerticalSpace/>
            {getBottomLine()}
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
    PlaceholderText:{
        color:Color.rgb(128,128,128).hex()
    },
})