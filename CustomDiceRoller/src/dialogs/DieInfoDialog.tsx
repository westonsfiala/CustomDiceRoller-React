import { ModalDialogBase } from "./ModalDialogBase";

import React from 'react';

import {
    View,
    Text,
} from 'react-native';

import Touchable from 'react-native-platform-touchable';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Die } from "../dice/Die";

interface DieInfoDialogInterface {
    modalShown : boolean;
    die : Die;
    dismissModal : () => void;
    removeDie : (die : Die) => void;
    editDie : (die : Die) => void;
}

export function DieInfoDialog(props : DieInfoDialogInterface) {

    function modalContent() {
        return(
            <View>
                <Text style={styles.ModalName}>
                    Die info - {props.die.mDieName}
                </Text>
                <Text style={styles.ModalDetailText}>
                    Rolls a number between {props.die.min} and {props.die.max}
                </Text>
                <Text style={styles.ModalDetailText}>
                    Average of {props.die.average}
                </Text>
                <View style={styles.ModalButtonContainer}>
                    <View>
                        <Touchable 
                        onPress={() => {
                            props.editDie(props.die);
                            props.dismissModal();
                        }}
                        foreground={Touchable.Ripple('white', true)}
                        hitSlop={styles.HitSlop}
                        >
                            <Text style={styles.EditButtonText}>Edit</Text>
                        </Touchable>
                    </View>
                    <View style={styles.RemoveOKButtonContainer}>
                        <Touchable 
                        onPress={() => {
                            props.removeDie(props.die);
                            props.dismissModal();
                        }}
                        foreground={Touchable.Ripple('white', true)}
                        hitSlop={styles.HitSlop}
                        >
                            <Text style={styles.RemoveOKButtonText}>Remove</Text>
                        </Touchable>
                        <Touchable 
                        onPress={() => props.dismissModal()}
                        foreground={Touchable.Ripple('white', true)}
                        hitSlop={styles.HitSlop}
                        >
                            <Text style={styles.RemoveOKButtonText}>OK</Text>
                        </Touchable>
                    </View>
                </View>
            </View>
        )
    }

    return(
        <ModalDialogBase modalShown={props.modalShown} dismissModal={props.dismissModal} width={.75} content={modalContent()}/>
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
    EditButtonText: {
        fontSize:'16rem',
        color:'$textColor',
    },
    RemoveOKButtonText: {
        fontSize:'16rem',
        paddingLeft:'8rem',
        paddingRight:'8rem',
        color:'$textColor',
    },
    ModalButtonContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingTop:'16rem'
    },
    RemoveOKButtonContainer:{
        flexDirection:'row',
    },
    HitSlop: {
        top:'10rem',
        bottom:'10rem',
        right:'10rem',
        left:'10rem'
    }
})