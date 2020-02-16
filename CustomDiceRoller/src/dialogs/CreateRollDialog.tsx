import { ModalDialogBase } from "./ModalDialogBase";

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
import { Roll } from "../dice/Roll";
import { OkCancelButtons } from "../helpers/OkCancelButtons";
import { ConfirmActionButtons } from "../helpers/ConfirmActionButtons";
import CustomRollManager from "../sync/CustomRollManager";
import RollManager from "../sync/RollManager";
import { HorizontalDivider } from "../helpers/HorizontalDivider";

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
                    onSubmitEditing={() => { acceptHandler(showOverride); }}
                    blurOnSubmit={false}
                />
            </View>
            <HorizontalDivider/>
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
    HitSlop: {
        top:'5rem',
        bottom:'5rem',
        right:'5rem',
        left:'5rem'
    }
})