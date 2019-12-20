
import React, { useState, useEffect } from 'react'

import {
    View, 
    Dimensions,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import RollManager from './sync/RollManager';
import { RollCategoryGroupView } from './helpers/RollCategoryGroup';
import { Roll } from './dice/Roll';

interface SavedRollPageInterface {
    displayRoll : (roll: Roll) => void;
}

export function SavedRollPage(props : SavedRollPageInterface) {
    const [width, setWidth] = useState(Dimensions.get("window").width);
    const [reload, setReload] = useState(false);
    
    RollManager.getInstance().setUpdater(() => setReload(!reload));

    console.log('refresh saved roll page');

    function handleScreenChange({window}) {
        setWidth(window.width);
    }

    useEffect(() => {
        Dimensions.addEventListener("change", handleScreenChange);
        
        return () => {
            Dimensions.removeEventListener("change", handleScreenChange);
        }
    });

    return (
        <View style={styles.PageBackground}>
            <RollCategoryGroupView baseCategoryName={''} rolls={RollManager.getInstance().getRolls()} displayRoll={props.displayRoll} />
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