
import React, { useState } from 'react'

import {
    View, 
    Text,
    ScaledSize,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import { Roll } from '../Common/dice/Roll';

import RollManager from '../Common/managers/RollManager';

import { RollCategoryGroupView } from './views/RollCategoryGroupView';

interface SavedRollPageInterface {
    displayRoll : (roll: Roll) => void;
    editRoll : (roll: Roll) => void;
    window : ScaledSize;
}

export function SavedRollPage(props : SavedRollPageInterface) {
    const [reload, setReload] = useState(false);
    
    RollManager.getInstance().setUpdater(() => setReload(!reload));

    console.log('refresh saved roll page');

    let rolls = RollManager.getInstance().getRolls();

    if(rolls.length === 0) {
        return(
            <View style={styles.PageBackground}>
                <Text style={styles.NoRollsText}>No saved rolls</Text>
            </View>
        )
    }

    return (
        <View style={styles.PageBackground}>
            <RollCategoryGroupView baseCategory={''} depth={0} rolls={RollManager.getInstance().getRolls()} displayRoll={props.displayRoll} editRoll={props.editRoll} />
        </View>
    );
}

const styles = EStyleSheet.create({
    PageBackground:{
        flex:1,
    },
    NoRollsTextContainer:{
        flex:1, 
        alignItems:'center', 
        justifyContent:'center',
    },
    NoRollsText:{
        color:'$textColor', 
        textAlign:'center',
        fontSize:'$fontSizeHuge',
    },
})