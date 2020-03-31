import React from 'react';

import {
    View,
    Text,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import { Die } from "../../Common/dice/Die";
import { MinMaxDie } from "../../Common/dice/MinMaxDie";
import { ModalDialogBase } from "../../Common/dialogs/ModalDialogBase";

import { CreateMinMaxDieHelper } from "./CreateMinMaxDieHelper";

interface CreateMinMaxDieInterface {
    modalShown : boolean;
    die : MinMaxDie;
    dismissModal : () => void;
    createDie : (die : Die) => void;
}

export function CreateMinMaxDieDialog(props : CreateMinMaxDieInterface) {

    return(
        <ModalDialogBase modalShown={props.modalShown} dismissModal={props.dismissModal}>
            <View>
                <Text style={styles.ModalTitle}>Create MinMax Die</Text>
                <CreateMinMaxDieHelper die={props.die} createDie={props.createDie} cancel={props.dismissModal} />
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