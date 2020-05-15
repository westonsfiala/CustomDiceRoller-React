import React from 'react';

import { Die } from "../../Common/dice/Die";
import { SimpleDie } from "../../Common/dice/SimpleDie";
import { MinMaxDie } from "../../Common/dice/MinMaxDie";
import { ImbalancedDie } from "../../Common/dice/ImbalancedDie";
import { CreateSimpleDieHelper } from './CreateSimpleDieHelper';
import { CreateMinMaxDieHelper } from './CreateMinMaxDieHelper';
import { CreateImbalancedDieHelper } from './CreateImbalancedDieHelper';
import { WordDie } from '../../Common/dice/WordDie';
import { CreateWordDieHelper } from './CreateWordDieHelper';

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
    } else if (props.die.mDieType === ImbalancedDie.imbalancedIdentifier) {
        return (<CreateImbalancedDieHelper die={props.die as ImbalancedDie} cancel={props.cancel} createDie={props.createDie}/>)
    } else if (props.die.mDieType === WordDie.wordIdentifier) {
        return (<CreateWordDieHelper die={props.die as WordDie} cancel={props.cancel} createDie={props.createDie}/>)
    }
    
    return (null);
}