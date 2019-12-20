
import React, { useState, useEffect } from 'react'

import {
    View, 
    Text,
    FlatList,
    Dimensions,
} from 'react-native';

import Touchable from 'react-native-platform-touchable';
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color'

import { Roll } from './dice/Roll';
import { RollProperties } from './dice/RollProperties';
import { CustomPageDieView } from './dice/CustomPageDieView';
import { AddCustomDiceButton } from './helpers/AddCustomDiceButton';
import { Die } from './dice/Die';
import { cloneDie } from './dice/DieFactory';
import { CreateRollDialog } from './dialogs/CreateRollDialog';
import RollManager from './sync/RollManager';
import { CreateDieDialog } from './dialogs/CreateDieDialog';

interface CustomRollPageInterface {
    displayRoll: (roll: Roll) => void;
}

export function CustomDicePage(props: CustomRollPageInterface) {

    const [roll, setRoll] = useState(new Roll("Custom Roll", "temp"));
    const [editDie, setEditDie] = useState(null as Die);
    const [createRollModalShown, setCreateRollModalShown] = useState(false);
    
    console.log('refresh custom page');

    function addDieToRoll(die: Die) {
        let index = 1;
        let originalName = die.displayName;

        while(roll.containsDie(die))
        {
            die = cloneDie(die, originalName + "(" + index + ")");
            index += 1;
        }

        let newRoll = roll.addDieToRoll(die, new RollProperties({}))
        setRoll(newRoll);
    }

    function updateDie(oldDie: Die, newDie: Die) {
        let newRoll = roll.overrideDieInRoll(oldDie, newDie);
        setRoll(newRoll);
    }

    function handleCreateRoll(newRoll: Roll) {
        setRoll(newRoll);
        RollManager.getInstance().addRoll(newRoll);
    }

    return (
        <View style={styles.Background}>
            <FlatList 
                data={roll.getDiePropArray()}
                ListEmptyComponent={
                    <View style={styles.NoDiceTextContainer}>
                        <Text style={styles.NoDiceText}>No dice</Text>
                    </View>
                }
                renderItem={({ item, index }) =>  (
                    <CustomPageDieView 
                        diePropPair={item} 
                        updateDie={(die: Die) => updateDie(item, die)}
                        updateProperties={(newProperties : RollProperties) => setRoll(roll.addDieToRoll(item.mDie, newProperties))}
                        moveUpHandler={() => setRoll(roll.moveDieUp(index))}
                        deleteHandler={() => setRoll(roll.removeDieFromRoll(item.mDie))}
                        moveDownHandler={() => setRoll(roll.moveDieDown(index))}
                    />
                )}
                ItemSeparatorComponent={() => <View style={styles.ListDivider}/>}
                keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.BottomButtonsRow}>
                <AddCustomDiceButton 
                    addDie={(die: Die) => addDieToRoll(die)} 
                    resetDice={() => setRoll(new Roll(roll.displayName, roll.categoryName))}
                />
                <View style={styles.ButtonContainer}>
                    <Touchable
                        style={styles.ButtonBackground}
                        foreground={Touchable.Ripple('white')}
                        onPress={() => setCreateRollModalShown(true)}
                    >
                        <Text style={styles.Text}>Save</Text>
                    </Touchable>
                </View>
                <View style={styles.ButtonContainer}>
                    <Touchable
                        style={styles.ButtonBackground}
                        foreground={Touchable.Ripple('white')}
                        onPress={() => props.displayRoll(roll)}
                    >
                        <Text style={styles.Text}>Roll</Text>
                    </Touchable>
                </View>
            </View>
            <CreateRollDialog modalShown={createRollModalShown} roll={roll} dismissModal={() => setCreateRollModalShown(false)} createRoll={handleCreateRoll} />
        </View> 
    );
}

const styles = EStyleSheet.create({
    Background:{
        flex:1
    },
    BottomButtonsRow:{
        flexDirection:'row',
    },
    ButtonContainer:{
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: '5rem',
    },
    ListDivider:{
        marginStart:'4rem', 
        marginEnd:'4rem', 
        borderBottomColor: Color.rgb(128,128,128).hex(), 
        borderBottomWidth: 1,
    },
    Text:{
        fontSize: '30rem', 
        textAlign: 'center', 
        color: '$textColor',
    },
    ButtonBackground:{
        flex:1,
        backgroundColor: '$primaryColorLightened',
        borderRadius: '10rem',
        overflow:'hidden',
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