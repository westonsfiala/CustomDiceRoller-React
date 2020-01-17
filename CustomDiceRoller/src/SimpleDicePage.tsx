
import React, { useState } from 'react'

import {
    View, 
    Text,
    FlatList,
    LayoutAnimation,
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
import DieSizeManager, { DieSizeSetting } from './sync/DieSizeManager';
import ThemeManager from './sync/ThemeManager';

interface SimpleDiePageInterface {
    displayRoll : (roll: Roll) => void;
    window : ScaledSize;
}

export function SimpleDicePage(props : SimpleDiePageInterface) {
    const [rollProperties, setRollProperties] = useState(new RollProperties({}))
    const [reload, setReload] = useState(false);

    function updateHandler() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setReload(!reload)
    }
    
    DiceManager.getInstance().setUpdater(updateHandler);
    DieSizeManager.getInstance().setUpdater(updateHandler);
    ThemeManager.getInstance().setSimplePageUpdater(updateHandler);

    console.log('refresh simple page');

    function createNewRollHelper(clickedDie: Die) {
        let tempRoll = new Roll("Simple Roll","");

        tempRoll = tempRoll.addDieToRoll(clickedDie, rollProperties);

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