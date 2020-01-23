
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

interface SimpleDiePageInterface {
    displayRoll : (roll: Roll) => void;
    window : ScaledSize;
}

export function SimpleDicePage(props : SimpleDiePageInterface) {
    const [reload, setReload] = useState(false);
    
    DiceManager.getInstance().setUpdater(() => setReload(!reload));
    DieSizeManager.getInstance().setUpdater(() => setReload(!reload));
    ThemeManager.getInstance().setSimplePageUpdater(() => setReload(!reload));
    SimpleRollPropertiesManager.getInstance().setUpdater(() => setReload(!reload));

    console.log('refresh simple page');

    let properties = SimpleRollPropertiesManager.getInstance().getProperties();

    function createNewRollHelper(clickedDie: Die) {
        let tempRoll = new Roll("Simple Roll","");

        tempRoll = tempRoll.addDieToRoll(clickedDie, properties);

        props.displayRoll(tempRoll);
    }

    let dieSize = Math.min(props.window.width, props.window.height) / DieSizeManager.getInstance().itemsPerRow;
    let itemsPerRow = Math.floor(props.window.width / dieSize);

    return (
        <View style={styles.SimpleDiePageBackground}>
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
            <View style={styles.ButtonsRow}>
                <NumDiceUpDownButtons 
                count={properties.mNumDice} 
                setCount={(newNumDice: number) => 
                    {
                        let newProps = properties.clone({numDice: newNumDice})
                        SimpleRollPropertiesManager.getInstance().setProperties(newProps);
                    }} 
                />
                <ModifierUpDownButtons 
                count={properties.mModifier} 
                setCount={(newModifier: number) => 
                    {
                        let newProps = properties.clone({modifier: newModifier})
                        SimpleRollPropertiesManager.getInstance().setProperties(newProps);
                    }}
                />
            </View>
            <View style={styles.ButtonsRow}>
                <PropertiesButton properties={properties} updateProperties={(newProps : RollProperties) => SimpleRollPropertiesManager.getInstance().setProperties(newProps)} />
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