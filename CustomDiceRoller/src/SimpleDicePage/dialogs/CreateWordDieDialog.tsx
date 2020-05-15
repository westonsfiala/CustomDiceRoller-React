import React from 'react';

import {
    View,
    Text,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import { Die } from "../../Common/dice/Die";
import { WordDie } from "../../Common/dice/WordDie";
import { ModalDialogBase } from "../../Common/dialogs/ModalDialogBase";

import { CreateWordDieHelper } from "./CreateWordDieHelper";

interface CreateWordDieInterface {
    modalShown : boolean;
    die : WordDie;
    dismissModal : () => void;
    createDie : (die : Die) => void;
}

export function CreateWordDieDialog(props : CreateWordDieInterface) {

    return(
        <ModalDialogBase modalShown={props.modalShown} dismissModal={props.dismissModal}>
            <View>
                <Text style={styles.ModalTitle}>Create Word Die</Text>
                <CreateWordDieHelper die={props.die} createDie={props.createDie} cancel={props.dismissModal} />
            </View>
        </ModalDialogBase>
    );
}

const styles = EStyleSheet.create({
    ModalTitle:{
        fontSize:'$fontSizeHuge',
        color:'$textColor',
    },
})