
import React, { useState } from 'react';

import 
{
    View,
} from 'react-native'

import Touchable from 'react-native-platform-touchable';

import { DieInfoDialog } from '../dialogs/DieInfoDialog';
import { Die } from '../../Common/dice/Die';
import { DieView } from '../../Common/dice/views/DieView';

interface SimpleDieViewInterface {
    die : Die;
    size : number;
    pressDieCallback : () => void;
    removeDieCallback : () => void;
    editDieCallback : (editDie: Die) => void;
}

export function SimplePageDieView(props : SimpleDieViewInterface) {
    
    const [modalShown, setModalShown] = useState(false);

    return(
        <View style={{width:props.size}} >
            <Touchable 
            background={Touchable.Ripple('white')} 
            onPress={props.pressDieCallback}
            delayLongPress={300}
            onLongPress={() => setModalShown(true)}
            >
                <DieView die={props.die} size={props.size}/>
            </Touchable>
            <DieInfoDialog 
                modalShown={modalShown} 
                die={props.die} 
                dismissModal={() => setModalShown(false)} 
                removeDie={props.removeDieCallback} 
                editDie={props.editDieCallback}
            />
        </View>
    );
};