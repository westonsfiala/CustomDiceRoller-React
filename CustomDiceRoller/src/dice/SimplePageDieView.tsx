
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
import { ConfirmRemoveDialog } from '../dialogs/ConfirmRemoveDialog';

interface SimpleDieViewInterface {
    die : Die;
    size : number;
    pressDieCallback : () => void;
    removeDieCallback : () => void;
    editDieCallback : (editDie: Die) => void;
}

export function SimplePageDieView(props : SimpleDieViewInterface) {
    
    const [modalShown, setModalShown] = useState(false);
    const [editModalShown, setEditModalShown] = useState(false);
    const [removeModalShown, setRemoveModalShown] = useState(false);

    function handleBeginEdit() {
        setEditModalShown(true);
        setModalShown(false);
    }

    function handleEndEdit(editDie : Die) {
        setEditModalShown(false);
        props.editDieCallback(editDie);
    }

    return(
        <View style={{width:props.size}} >
            <Touchable 
            background={Touchable.Ripple('white')} 
            onPress={() => {props.pressDieCallback()}}
            delayLongPress={300}
            onLongPress={() => setModalShown(true)}
            >
                <DieView die={props.die} size={props.size}/>
            </Touchable>
            <DieInfoDialog modalShown={modalShown} die={props.die} dismissModal={() => setModalShown(false)} removeDie={() => setRemoveModalShown(true)} editDie={handleBeginEdit}/>
            <CreateDieDialog modalShown={editModalShown} die={props.die} dismissModal={() => setEditModalShown(false)} createDie={handleEndEdit}/>
            <ConfirmRemoveDialog 
                modalShown={removeModalShown} 
                removeName={props.die.mDieName} 
                dismissModal={() => setRemoveModalShown(false)} 
                remove={() => props.removeDieCallback()}
            />
        </View>
    );
};