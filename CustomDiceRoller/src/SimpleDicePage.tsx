
import React, { useState, useEffect } from 'react'

import {
    View, 
    Text,
    FlatList,
    Dimensions,
} from 'react-native';

import { DieView } from "./dice/DieView";
import { Die } from "./dice/Die";
import { NumDiceUpDownButtons, ModifierUpDownButtons } from './helpers/UpDownButtons';
import { Roll } from './dice/Roll';
import { RollProperties } from './dice/RollProperties';
import { RollDisplayHelper } from './dice/RollDisplayHelper';
import EStyleSheet from 'react-native-extended-stylesheet';
import { getAvailableDice, standardDice, setAvailableDice } from './sync/AvailableDice';
import { AddDiceButton } from './helpers/AddDiceButton';
import { CreateSimpleDieDialog } from './dialogs/CreateSimpleDieDialog';

export function SimpleDicePage({displayRoll}) {
    const [currentDice, setCurrentDice] = useState(standardDice as Array<Die>);
    const [forceReload, setForceReload] = useState(false);
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

    function hasDieByName(possibleDie: Die) {
        for(let dieIndex = 0; dieIndex < currentDice.length; ++dieIndex) {
            let currentDie = currentDice[dieIndex]

            if(currentDie.displayName === possibleDie.displayName) {
                return true;
            }
        }

        return false;
    }

    function resetDice() {
        setAvailableDice(standardDice).then(() => setForceReload(!forceReload));
    }

    function addDie(newDie: Die) {

        if(!hasDieByName(newDie))
        {
            currentDice.push(newDie)

            // Once the setting goes through, this will force a rerender to see whats now available.
            setAvailableDice(currentDice).then(() => setForceReload(!forceReload));
        }
        else 
        {
            // TODO: tell the user when something goes wrong.
        }

    }

    function removeDie(clickedDie: Die) {
        for(let dieIndex = 0; dieIndex < currentDice.length; ++dieIndex) {
            let currentDie = currentDice[dieIndex]

            if(currentDie.displayName === clickedDie.displayName) {
                currentDice.splice(dieIndex, 1);
                break;
            }
        }

        // Once the setting goes through, this will force a rerender to see whats now available.
        setAvailableDice(currentDice).then(() => setForceReload(!forceReload));
    }

    // If the dice are different, rerender.
    useEffect(() => {
        getAvailableDice().then((dice) => {
            if(JSON.stringify(currentDice) !== JSON.stringify(dice)) {
                setCurrentDice(dice)
            }
        });
    })

    useEffect(() => {
        Dimensions.addEventListener("change", handleScreenChange);
        
        return () => {
            Dimensions.removeEventListener("change", handleScreenChange);
        }
    });

    return (
        <View style={styles.SimpleDiePageBackground}>
            <FlatList 
                data={currentDice}
                numColumns={4}
                ListEmptyComponent={
                    <View style={styles.NoDiceTextContainer}>
                        <Text style={styles.NoDiceText}>
                            No created dice
                        </Text>
                        <AddDiceButton addDie={addDie} resetDice={resetDice}/>
                    </View>
                }
                renderItem={({ item }) =>  (
                    <DieView 
                    die={item} 
                    size={width/4} 
                    pressDieCallback={createNewRollHelper}
                    removeDieCallback={removeDie} 
                    editDieCallback={() => null} 
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
                extraData={width}
            />
            <View style={styles.ButtonsRow}>
                <NumDiceUpDownButtons setExternalCount={setNumDice} />
                <ModifierUpDownButtons setExternalCount={setModifier} />
            </View>
            <View style={styles.ButtonsRow}>
                <AddDiceButton addDie={addDie} resetDice={resetDice}/>
            </View>
        </View> 
    );
}

const styles = EStyleSheet.create({
    SimpleDiePageBackground:{
        flex:1,
    },
    ButtonsRow:{
        flexDirection:'row',
    },
    NoDiceTextContainer:{
        flex:1, 
        alignItems:'center', 
        justifyContent:'center',
    },
    NoDiceText:{
        color:'$textColor', 
        fontSize:'22rem'
    },
})