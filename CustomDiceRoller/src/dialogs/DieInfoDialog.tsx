import { ModalDialogBase } from "./ModalDialogBase";

import React from 'react';

import {
    View,
    Text,
} from 'react-native';

import Touchable from 'react-native-platform-touchable';
import EStyleSheet from 'react-native-extended-stylesheet';

export function DieInfoDialog({modalShown, die, dismissModal, removeDie, editDie}) {

    function modalContent() {
        return(
            <View>
                <Text style={styles.ModalName}>
                    Die info - {die.mDieName}
                </Text>
                <Text style={styles.ModalDetailText}>
                    Rolls a number between {die.min} and {die.max}
                </Text>
                <Text style={styles.ModalDetailText}>
                    Average of {die.average}
                </Text>
                <View style={styles.ModalButtonContainer}>
                    <View>
                        <Touchable 
                        onPress={() => {
                            editDie(die);
                            dismissModal();
                        }}
                        hitSlop={styles.HitSlop}
                        >
                            <Text style={styles.EditButtonText}>Edit</Text>
                        </Touchable>
                    </View>
                    <View style={styles.RemoveOKButtonContainer}>
                        <Touchable 
                        onPress={() => {
                            removeDie(die);
                            dismissModal();
                        }}
                        hitSlop={styles.HitSlop}
                        >
                            <Text style={styles.RemoveOKButtonText}>Remove</Text>
                        </Touchable>
                        <Touchable 
                        onPress={() => dismissModal()}
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
        <ModalDialogBase modalShown={modalShown} dismissModal={dismissModal} width={.75} content={modalContent()}/>
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
        paddingTop:'4rem'
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