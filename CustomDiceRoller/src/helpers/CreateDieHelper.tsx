import React from 'react';

import { Die } from "../dice/Die";
import { SimpleDie } from "../dice/SimpleDie";
import { MinMaxDie } from "../dice/MinMaxDie";
import { ImbalancedDie } from "../dice/ImbalancedDie";
import { CreateSimpleDieHelper } from './CreateSimpleDieHelper';
import { CreateMinMaxDieHelper } from './CreateMinMaxDieHelper';
import { CreateImbalancedDieHelper } from './CreateImbalancedDieHelper';
import { View } from 'react-native';
import { HorizontalDivider } from './HorizontalDivider';

interface CreateDieInterface {
    show : boolean;
    die : Die;
    createDie : (die : Die) => void;
    cancel : () => void;
}

export function CreateDieHelper(props : CreateDieInterface) {

    if(!props.show) return null;

    if(props.die.mDieType === SimpleDie.simpleDieIdentifier) {
        return (<CreateSimpleDieHelper die={props.die as SimpleDie} cancel={props.cancel} createDie={props.createDie}/>)
    } else if (props.die.mDieType === MinMaxDie.minMaxDieIdentifier) {
        return (<CreateMinMaxDieHelper die={props.die as MinMaxDie} cancel={props.cancel} createDie={props.createDie}/>)
    }if (props.die.mDieType === ImbalancedDie.imbalancedIdentifier) {
        return (<CreateImbalancedDieHelper die={props.die as ImbalancedDie} cancel={props.cancel} createDie={props.createDie}/>)
    }
    
    return (null);
}