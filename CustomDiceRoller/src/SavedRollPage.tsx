
import React, { useState, useEffect } from 'react'

import {
    View, 
    Dimensions,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import RollManager from './sync/RollManager';
import { RollCategoryGroupView } from './helpers/RollCategoryGroupView';
import { Roll } from './dice/Roll';

interface SavedRollPageInterface {
    displayRoll : (roll: Roll) => void;
    editRoll : (roll: Roll) => void;
}

export function SavedRollPage(props : SavedRollPageInterface) {
    const [reload, setReload] = useState(false);
    
    RollManager.getInstance().setUpdater(() => setReload(!reload));

    console.log('refresh saved roll page');

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
        fontSize:'22rem'
    },
})