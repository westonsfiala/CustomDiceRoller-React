import React from 'react';

import {
    View,
    Text,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import { Die } from "../../Common/dice/Die";
import { ImbalancedDie } from "../../Common/dice/ImbalancedDie";
import { ModalDialogBase } from "../../Common/dialogs/ModalDialogBase";

import { CreateImbalancedDieHelper } from "./CreateImbalancedDieHelper";

interface CreateImbalancedDieInterface {
    modalShown : boolean;
    die : ImbalancedDie;
    dismissModal : () => void;
    createDie : (die : Die) => void;
}

export function CreateImbalancedDieDialog(props : CreateImbalancedDieInterface) {

    return(
        <ModalDialogBase modalShown={props.modalShown} dismissModal={props.dismissModal}>
            <View>
                <Text style={styles.ModalTitle}>Create Imbalanced Die</Text>
                <CreateImbalancedDieHelper die={props.die} createDie={props.createDie} cancel={props.dismissModal} />
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