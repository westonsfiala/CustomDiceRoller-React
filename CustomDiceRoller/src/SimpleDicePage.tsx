
import React, { useState, useEffect } from 'react'

import {
    View, 
    Text,
    FlatList,
    Dimensions,
} from 'react-native';

import { SimplePageDieView } from "./dice/SimplePageDieView";
import { Die } from "./dice/Die";
import { NumDiceUpDownButtons, ModifierUpDownButtons } from './helpers/UpDownButtons';
import { Roll } from './dice/Roll';
import { RollProperties } from './dice/RollProperties';
import EStyleSheet from 'react-native-extended-stylesheet';
import DiceManager from './sync/DiceManager';
import { AddDiceButton } from './helpers/AddDiceButton';
import { PropertiesButton } from './helpers/PropertiesButton';

export function SimpleDicePage({displayRoll}) {
    const [width, setWidth] = useState(Dimensions.get("window").width);
    const [rollProperties, setRollProperties] = useState(new RollProperties({}))
    const [reload, setReload] = useState(false);
    
    DiceManager.getInstance().setUpdater(() => setReload(!reload));

    console.log('refresh simple page');

    function handleScreenChange({window}) {
        setWidth(window.width);
    }

    function createNewRollHelper(clickedDie: Die) {
        let tempRoll = new Roll("Simple Roll","");

        tempRoll = tempRoll.addDieToRoll(clickedDie, rollProperties);

        displayRoll(tempRoll);
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
                data={DiceManager.getInstance().getDice()}
                numColumns={4}
                ListEmptyComponent={
                    <View style={styles.NoDiceTextContainer}>
                        <Text style={styles.NoDiceText}>
                            No created dice
                        </Text>
                        <AddDiceButton addDie={(die: Die) => DiceManager.getInstance().addDie(die)} resetDice={() => DiceManager.getInstance().resetDice()}/>
                    </View>
                }
                renderItem={({ item }) =>  (
                    <SimplePageDieView 
                    die={item} 
                    size={width/4} 
                    pressDieCallback={createNewRollHelper}
                    removeDieCallback={(die: Die) => DiceManager.getInstance().removeDie(die)} 
                    editDieCallback={(oldDie: Die, newDie: Die) => DiceManager.getInstance().editDie(oldDie, newDie)} 
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
                <AddDiceButton addDie={(die: Die) => DiceManager.getInstance().addDie(die)} resetDice={() => DiceManager.getInstance().resetDice()}/>
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