
import React, { useState, useEffect } from 'react'

import {
    View, 
    FlatList,
    Dimensions,
} from 'react-native';

import {SimpleDieView} from "./dice/SimpleDieView";
import {Die} from "./dice/Die";
import { NumDiceUpDownButtons, ModifierUpDownButtons } from './UpDownButtons';
import { Roll } from './dice/Roll';
import { RollProperties } from './dice/RollProperties';
import { RollDisplayHelper } from './dice/RollDisplayHelper';
import {standardDice} from './dice/DefaultDice'
import EStyleSheet from 'react-native-extended-stylesheet';

export function SimpleDicePage({displayRoll}) {
    const [width, setWidth] = useState(Dimensions.get("window").width);
    const [numDice, setNumDice] = useState(1);
    const [modifier, setModifier] = useState(0);

    function handleScreenChange({window}) {
        setWidth(window.width);
    }

    function createNewRollHelper(clickedDie: Die) {
        let tempRoll = new Roll("Unsaved Roll","");
        let rollProps = new RollProperties({dieCount:numDice, modifier:modifier});

        tempRoll.addDieToRoll(clickedDie, rollProps);

        displayRoll(new RollDisplayHelper(tempRoll));
    }

    useEffect(() => {
        Dimensions.addEventListener("change", handleScreenChange);
        
        return () => {
            Dimensions.removeEventListener("change", handleScreenChange);
        }
    });

    return (
        <View style={styles.SimpleDiePageBackground}>
            <FlatList 
                data={standardDice}
                numColumns={4}
                renderItem={({ item }) =>  (
                    <SimpleDieView imageID={item.die.imageID} name={item.die.displayName} size={width/4} pressCallback={() => {
                        createNewRollHelper(item.die);
                    }} />
                )}
                extraData={width}
            />
            <View style={styles.UpDownButtons}>
                <NumDiceUpDownButtons setExternalCount={setNumDice} />
                <ModifierUpDownButtons setExternalCount={setModifier} />
            </View>
        </View> 
    );
}

const styles = EStyleSheet.create({
    SimpleDiePageBackground:{
        flex:1,
    },
    UpDownButtons:{
        flexDirection:'row',
    },
})