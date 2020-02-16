import { ModalDialogBase } from "./ModalDialogBase";

import React from 'react';

import {
    View,
    Text,
} from 'react-native';

import Touchable from 'react-native-platform-touchable';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ConfirmActionButtons } from "../helpers/ConfirmActionButtons";

interface ConfirmOverrideDialogInterface {
    modalShown : boolean;
    itemName : string;
    dismissModal : () => void;
    override : () => void;
}

export function ConfirmOverrideDialog(props : ConfirmOverrideDialogInterface) {

    return(
        <ModalDialogBase modalShown={props.modalShown} dismissModal={props.dismissModal}>
            <View>
                <Text style={styles.ModalName}>
                    Override Item - {props.itemName}
                </Text>
                <ConfirmActionButtons 
                    show={true} 
                    displayText={'Override?'}
                    confirm={props.override} 
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