
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

export function SimpleDicePage({displayRoll}) {
    const [currentDice, setCurrentDice] = useState(standardDice as Array<Die>);
    const [forceReload, setForceReload] = useState(false);
    const [width, setWidth] = useState(Dimensions.get("window").width);
    const [rollProperties, setRollProperties] = useState(new RollProperties({}))

    function handleScreenChange({window}) {
        setWidth(window.width);
    }

    function createNewRollHelper(clickedDie: Die) {
        let tempRoll = new Roll("Unsaved Roll","");

        tempRoll.addDieToRoll(clickedDie, rollProperties);

        displayRoll(new RollDisplayHelper(tempRoll));
    }

    function hasDieByName(possibleDie: Die) : boolean {
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

    function addDie(newDie: Die) : boolean {
        let added = false;

        if(!hasDieByName(newDie))
        {
            currentDice.push(newDie)
            added = true;
        }
        else 
        {
            // TODO: tell the user when something goes wrong.
        }

        setAvailableDice(currentDice).then(() => setForceReload(!forceReload));

        return added;
    }

    function removeDie(clickedDie: Die) : boolean {
        let removed = false;

        for(let dieIndex = 0; dieIndex < currentDice.length; ++dieIndex) {
            let currentDie = currentDice[dieIndex]

            if(currentDie.displayName === clickedDie.displayName) {
                currentDice.splice(dieIndex, 1)
                removed = true;
            }
        }
        setAvailableDice(currentDice).then(() => setForceReload(!forceReload));

        return removed;
    }

    function editDie(originalDie: Die, newDie: Die) : boolean {
        let edited = false;

        if(removeDie(originalDie)) {
            if(addDie(newDie)) {
                edited = true
            } else {
                addDie(originalDie);
            }
        }

        setAvailableDice(currentDice).then(() => setForceReload(!forceReload));

        return edited;
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
                    editDieCallback={editDie} 
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
                extraData={width}
            />
            <View style={styles.ButtonsRow}>
                <NumDiceUpDownButtons 
                count={rollProperties.mNumDice} 
                setCount={(numDice: number) => 
                    {
                        let newProps = rollProperties.clone()
                        newProps.mNumDice = numDice;
                        setRollProperties(newProps);
                    }} 
                />
                <ModifierUpDownButtons 
                count={rollProperties.mModifier} 
                setCount={(modifier: number) => {
                    let newProps = rollProperties.clone()
                    newProps.mModifier = modifier;
                    setRollProperties(newProps);
                }}
                />
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