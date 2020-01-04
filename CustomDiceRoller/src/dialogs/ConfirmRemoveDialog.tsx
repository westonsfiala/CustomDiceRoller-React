import { ModalDialogBase } from "./ModalDialogBase";

import React from 'react';

import {
    View,
    Text,
} from 'react-native';

import Touchable from 'react-native-platform-touchable';
import EStyleSheet from 'react-native-extended-stylesheet';

interface ConfirmRemoveDialogInterface {
    modalShown : boolean;
    removeName : string;
    dismissModal : () => void;
    remove : () => void;
}

export function ConfirmRemoveDialog(props : ConfirmRemoveDialogInterface) {

    return(
        <ModalDialogBase modalShown={props.modalShown} dismissModal={props.dismissModal} width={.85}>
            <View>
                <Text style={styles.ModalName}>
                    Remove - {props.removeName}
                </Text>
                <Text style={styles.ModalDetailText}>
                    Are you sure you wish to remove - {props.removeName}
                </Text>
                <View style={styles.ModalButtonContainer}>
                    <View style={styles.RemoveOKButtonContainer}>
                        <View style={styles.ModalButtonPadding}>
                            <Touchable 
                            style={styles.ModalButton}
                            onPress={() => props.dismissModal()}
                            foreground={Touchable.Ripple('white', true)}
                            hitSlop={styles.HitSlop}
                            >
                                <Text style={styles.ButtonText}>No</Text>
                            </Touchable>
                        </View>
                        <View style={styles.ModalButtonPadding}>
                            <Touchable 
                            style={styles.ModalButton}
                            onPress={() => {
                                props.remove();
                                props.dismissModal();
                            }}
                            foreground={Touchable.Ripple('white', true)}
                            hitSlop={styles.HitSlop}
                            >
                                <Text style={styles.ButtonText}>Yes</Text>
                            </Touchable>
                        </View>
                    </View>
                </View>
            </View>
        </ModalDialogBase>
    );
}

const styles = EStyleSheet.create({
    ModalName:{
        fontSize:'24rem',
        color:'$textColor',
    },
    ModalDetailText: {
        fontSize:'16rem',
        color:'$textColor',
    },
    ButtonText: {
        fontSize:'16rem',
        paddingLeft:'5rem',
        paddingRight:'5rem',
        color:'$textColor',
    },
    ModalButtonContainer:{
        flexDirection:'row',
        justifyContent:'flex-end',
        paddingTop:'10rem',
    },
    RemoveOKButtonContainer:{
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