
import React, { useState } from 'react'

import {
    View, 
    Text,
    FlatList,
    ScaledSize,
} from 'react-native';

import { SimplePageDieView } from "./dice/views/SimplePageDieView";
import { Die } from "./dice/Die";
import { NumDiceUpDownButtons, ModifierUpDownButtons } from './helpers/UpDownButtons';
import { Roll } from './dice/Roll';
import { RollProperties } from './dice/RollProperties';
import EStyleSheet from 'react-native-extended-stylesheet';
import DiceManager from './sync/DiceManager';
import { AddDiceButton } from './helpers/AddDiceButton';
import { PropertiesButton } from './helpers/PropertiesButton';
import DieSizeManager from './sync/DieSizeManager';
import ThemeManager from './sync/ThemeManager';
import SimpleRollPropertiesManager from './sync/SimpleRollPropertiesManager';


interface DieViewListInterface {
    displayRoll : (roll: Roll) => void;
    window : ScaledSize;
}

function DieViewList(props: DieViewListInterface) {

    function createNewRollHelper(clickedDie: Die) {
        let tempRoll = new Roll("Simple Roll","");

        tempRoll = tempRoll.addDieToRoll(clickedDie, SimpleRollPropertiesManager.getInstance().getProperties());

        props.displayRoll(tempRoll);
    }

    let dieSize = Math.min(props.window.width, props.window.height) / DieSizeManager.getInstance().itemsPerRow;
    let itemsPerRow = Math.floor(props.window.width / dieSize);

    return (
        <FlatList 
            key={props.window.width.toString() + dieSize.toString() + itemsPerRow.toString()}
            data={DiceManager.getInstance().getDice()}
            numColumns={itemsPerRow}
            ListEmptyComponent={
                <View style={styles.NoDiceTextContainer}>
                    <Text style={styles.NoDiceText}>
                        No created dice
                    </Text>
                </View>
            }
            renderItem={({ item }) =>  (
                <SimplePageDieView 
                    die={item} 
                    size={dieSize} 
                    pressDieCallback={() => createNewRollHelper(item)}
                    removeDieCallback={() => DiceManager.getInstance().removeDie(item)} 
                    editDieCallback={(newDie: Die) => DiceManager.getInstance().editDie(item, newDie)} 
                />
            )}
            keyExtractor={(item, index) => index.toString()}
            extraData={props.window.width}
        />
    )
}

function NumDiceModifierButtons() {
    return(
        <View style={styles.ButtonsRow}>
            <NumDiceUpDownButtons 
                getCount={() => {
                    return SimpleRollPropertiesManager.getInstance().getProperties().mNumDice;
                }}
                setCount={(newNumDice: number) =>  {
                    let newProps = SimpleRollPropertiesManager.getInstance().getProperties().clone({numDice: newNumDice})
                    return SimpleRollPropertiesManager.getInstance().setProperties(newProps);
                }} 
            />
            <ModifierUpDownButtons 
                getCount={() => {
                    return SimpleRollPropertiesManager.getInstance().getProperties().mModifier;
                }}
                setCount={(newModifier: number) => {
                    let newProps = SimpleRollPropertiesManager.getInstance().getProperties().clone({modifier: newModifier})
                    return SimpleRollPropertiesManager.getInstance().setProperties(newProps);
                }}
            />
        </View>
    )
}

function PropertiesAddDiceButtons() {
    return (
        <View style={styles.ButtonsRow}>
            <PropertiesButton 
                getProperties={() => {
                    return SimpleRollPropertiesManager.getInstance().getProperties()
                }} 
                updateProperties={(newProps : RollProperties) => {
                    return SimpleRollPropertiesManager.getInstance().setProperties(newProps)
                }} 
            />
            <AddDiceButton 
            addDie={(die: Die) => DiceManager.getInstance().addDie(die)} 
            resetDice={() => DiceManager.getInstance().resetDice()}/>
        </View>
    )
}


interface SimpleDiePageInterface {
    displayRoll : (roll: Roll) => void;
    window : ScaledSize;
}

export function SimpleDicePage(props : SimpleDiePageInterface) {
    const [reload, setReload] = useState(false);
    
    DiceManager.getInstance().setSimpleUpdater(() => setReload(!reload));
    DieSizeManager.getInstance().setUpdater(() => setReload(!reload));
    ThemeManager.getInstance().setSimplePageUpdater(() => setReload(!reload));

    console.log('refresh simple page');

    return (
        <View style={styles.SimpleDiePageBackground}>
            <DieViewList displayRoll={props.displayRoll} window={props.window}/>
            <NumDiceModifierButtons/>
            <PropertiesAddDiceButtons/>
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
        fontSize:'$fontSizeHuge',
    },
})