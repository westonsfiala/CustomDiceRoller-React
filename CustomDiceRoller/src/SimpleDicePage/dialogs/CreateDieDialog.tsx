import React from 'react';

import {
    View,
} from 'react-native';

import { Die } from "../../Common/dice/Die";

import { SimpleDie } from "../../Common/dice/SimpleDie";
import { CreateSimpleDieDialog } from "./CreateSimpleDieDialog";

import { MinMaxDie } from "../../Common/dice/MinMaxDie";
import { CreateMinMaxDieDialog } from "./CreateMinMaxDieDialog";

import { ImbalancedDie } from "../../Common/dice/ImbalancedDie";
import { CreateImbalancedDieDialog } from "./CreateImbalancedDieDialog";

interface CreateDieInterface {
    modalShown : boolean;
    die : Die;
    dismissModal : () => void;
    createDie : (die : Die) => void;
}

export function CreateDieDialog(props : CreateDieInterface) {

    if(props.die.mDieType === SimpleDie.simpleDieIdentifier) {
        return (<CreateSimpleDieDialog modalShown={props.modalShown} die={props.die as SimpleDie} dismissModal={props.dismissModal} createDie={props.createDie}/>)
    } else if (props.die.mDieType === MinMaxDie.minMaxDieIdentifier) {
        return (<CreateMinMaxDieDialog modalShown={props.modalShown} die={props.die as MinMaxDie} dismissModal={props.dismissModal} createDie={props.createDie}/>)
    }if (props.die.mDieType === ImbalancedDie.imbalancedIdentifier) {
        return (<CreateImbalancedDieDialog modalShown={props.modalShown} die={props.die as ImbalancedDie} dismissModal={props.dismissModal} createDie={props.createDie}/>)
    }
    
    return (<View/>);
}