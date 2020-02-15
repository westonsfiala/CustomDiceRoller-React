import { ModalDialogBase } from "./ModalDialogBase";

import React from 'react';

import {
    View,
    Text,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import { SimpleDie } from "../dice/SimpleDie";
import { Die } from "../dice/Die";
import { CreateSimpleDieHelper } from "../helpers/CreateSimpleDieHelper";

interface CreateSimpleDieInterface {
    modalShown : boolean;
    die : SimpleDie;
    dismissModal : () => void;
    createDie : (die : Die) => void;
}

export function CreateSimpleDieDialog(props : CreateSimpleDieInterface) {

    return(
        <ModalDialogBase modalShown={props.modalShown} dismissModal={props.dismissModal}>
            <View>
                <Text style={styles.ModalTitle}>Create Simple Die</Text>
                <CreateSimpleDieHelper die={props.die} createDie={props.createDie} cancel={props.dismissModal} />
            </View>
        </ModalDialogBase>
    );
}

const styles = EStyleSheet.create({
    ModalTitle:{
        fontSize:'25rem',
        color:'$textColor',
    },
})