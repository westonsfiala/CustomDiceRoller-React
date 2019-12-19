
import React, { useState } from 'react';

import 
{
    View,
} from 'react-native'

import Touchable from 'react-native-platform-touchable';

import { Die } from './Die';
import { DieInfoDialog } from '../dialogs/DieInfoDialog';
import { DieView } from './DieView';
import { CreateDieDialog } from '../dialogs/CreateDieDialog';

interface SimpleDieViewInterface {
    die : Die;
    size : number;
    pressDieCallback : (die: Die) => void;
    removeDieCallback : (die : Die) => void;
    editDieCallback : (die: Die, editDie: Die) => void;
}

export function SimplePageDieView(props : SimpleDieViewInterface) {
    
    const [modalShown, setModalShown] = useState(false);
    const [editModalShown, setEditModalShown] = useState(false);

    function handleBeginEdit() {
        setEditModalShown(true);
        setModalShown(false);
    }

    function handleEndEdit(editDie : Die) {
        props.editDieCallback(props.die, editDie);
        setEditModalShown(false);
    }

    return(
        <View style={{width:props.size}} >
            <Touchable 
            background={Touchable.Ripple('white')} 
            onPress={() => {props.pressDieCallback(props.die)}}
            delayLongPress={300}
            onLongPress={() => setModalShown(true)}
            >
                <DieView die={props.die} size={props.size}/>
            </Touchable>
            <DieInfoDialog modalShown={modalShown} die={props.die} dismissModal={() => setModalShown(false)} removeDie={props.removeDieCallback} editDie={handleBeginEdit}/>
            <CreateDieDialog modalShown={editModalShown} die={props.die} dismissModal={() => setEditModalShown(false)} createDie={handleEndEdit}/>
        </View>
    );
};