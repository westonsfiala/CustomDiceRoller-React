
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
import { PropertiesButton } from './helpers/PropertiesButton';

export function SimpleDicePage({displayRoll}) {
    const [currentDice, setCurrentDice] = useState(standardDice as Array<Die>);
    const [width, setWidth] = useState(Dimensions.get("window").width);
    const [rollProperties, setRollProperties] = useState(new RollProperties({}))
    
    console.log('refresh simple page');

    function handleScreenChange({window}) {
        setWidth(window.width);
    }

    function createNewRollHelper(clickedDie: Die) {
        let tempRoll = new Roll("Unsaved Roll","");

        tempRoll.addDieToRoll(clickedDie, rollProperties);

        displayRoll(new RollDisplayHelper(tempRoll));
    }

    function hasDieByName(possibleDie: Die, dieList : Array<Die>) : boolean {
        for(let dieIndex = 0; dieIndex < currentDice.length; ++dieIndex) {
            let currentDie = currentDice[dieIndex]

            if(currentDie.displayName === possibleDie.displayName) {
                return true;
            }
        }

        return false;
    }

    function resetDice() {
        setAvailableDice(standardDice).then((dice) => setCurrentDice(dice));
    }

    function addDie(newDie: Die, dieList : Array<Die> = currentDice.concat()) : boolean {
        let added = false;

        if(!hasDieByName(newDie, dieList))
        {
            dieList.push(newDie)
            added = true;
        }
        else 
        {
            // TODO: tell the user when something goes wrong.
        }

        if(dieList !== currentDice) setAvailableDice(dieList).then((dice) => setCurrentDice(dice));

        return added;
    }

    function removeDie(clickedDie: Die, dieList : Array<Die> = currentDice.concat()) : boolean {
        let removed = false;

        for(let dieIndex = 0; dieIndex < dieList.length; ++dieIndex) {
            let currentDie = dieList[dieIndex]

            if(currentDie.displayName === clickedDie.displayName) {
                dieList.splice(dieIndex, 1)
                removed = true;
            }
        }

        if(dieList !== currentDice) setAvailableDice(dieList).then((dice) => setCurrentDice(dice));

        return removed;
    }

    function editDie(originalDie: Die, newDie: Die) : boolean {
        let edited = false;

        let dieList = currentDice.concat();

        if(removeDie(originalDie, dieList)) {
            if(addDie(newDie, dieList)) {
                edited = true
            } else {
                addDie(originalDie, dieList);
            }
        }

        setAvailableDice(dieList).then((dice) => setCurrentDice(dice));

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
                setCount={(newNumDice: number) => 
                    {
                        let newProps = rollProperties.clone({numDice: newNumDice})
                        setRollProperties(newProps);
                    }} 
                />
                <ModifierUpDownButtons 
                count={rollProperties.mModifier} 
                setCount={(newModifier: number) => {
                    let newProps = rollProperties.clone({modifier: newModifier})
                    setRollProperties(newProps);
                }}
                />
            </View>
            <View style={styles.ButtonsRow}>
                <PropertiesButton properties={rollProperties} updateProperties={setRollProperties} />
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