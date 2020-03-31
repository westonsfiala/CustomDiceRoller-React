import React from 'react';

import {
    View,
    Text,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import { ModalDialogBase } from "../../Common/dialogs/ModalDialogBase";

import { ConfirmActionButtons } from "../../Common/buttons/ConfirmActionButtons";

interface ConfirmRemoveDialogInterface {
    modalShown : boolean;
    removeName : string;
    dismissModal : () => void;
    remove : () => void;
}

export function ConfirmRemoveDialog(props : ConfirmRemoveDialogInterface) {

    return(
        <ModalDialogBase modalShown={props.modalShown} dismissModal={props.dismissModal}>
            <View>
                <Text style={styles.ModalName}>
                    Remove - {props.removeName}
                </Text>
                <ConfirmActionButtons 
                    show={true} 
                    displayText={'Remove?'}
                    confirm={props.remove} 
                    cancel={props.dismissModal}
                />
            </View>
        </ModalDialogBase>
    );
}

const styles = EStyleSheet.create({
    ModalName:{
        fontSize:'$fontSizeHuge',
        color:'$textColor',
        paddingBottom:'10rem'
    },
    ModalDetailText: {
        fontSize:'$fontSizeNormal',
        color:'$textColor',
    },
    ButtonText: {
        fontSize:'$fontSizeNormal',
        paddingLeft:'5rem',
        paddingRight:'5rem',
        color:'$textColor',
    },
    ModalButtonContainer:{
        flexDirection:'row',
        justifyContent:'flex-end',
        paddingTop:'10rem',
    },
    YesNoButtonContainer:{
        flexDirection:'row',
    },
    ModalButton:{
        padding:'5rem',
        backgroundColor: '$primaryColorLightened',
        borderRadius: '10rem',
        overflow:'hidden'
    },
    ModalButtonPadding:{
        paddingLeft:'10rem',
    },
    HitSlop: {
        top:'5rem',
        bottom:'5rem',
        right:'5rem',
        left:'5rem'
    }
})