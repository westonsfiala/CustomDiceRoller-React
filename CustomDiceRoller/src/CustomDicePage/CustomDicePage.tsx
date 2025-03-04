
import React, { useState } from 'react'

import {
    View, 
    Text,
    FlatList,
    LayoutAnimation,
    ScaledSize,
} from 'react-native';

import Touchable from 'react-native-platform-touchable';
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color'

import { Die } from '../Common/dice/Die';
import { Roll } from '../Common/dice/Roll';
import { RollProperties } from '../Common/dice/RollProperties';

import CustomRollManager from './managers/CustomRollManager';
import { AddCustomDiceButton } from './buttons/AddCustomDiceButton';
import { CreateRollDialog } from './dialogs/CreateRollDialog';
import { CustomPageDieView } from './views/CustomPageDieView';

import ThemeManager from '../SettingsPage/Dice/ThemeManager';
import DieTintManager from '../SettingsPage/Dice/DieTintManager';

interface CustomRollPageInterface {
    displayRoll: (roll: Roll) => void;
    window : ScaledSize;
}

export function CustomDicePage(props: CustomRollPageInterface) {

    const [createRollModalShown, setCreateRollModalShown] = useState(false);
    const [reload, setReload] = useState(false);

    function updateHandler() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setReload(!reload)
    }
    
    CustomRollManager.getInstance().setUpdater(updateHandler);
    ThemeManager.getInstance().setCustomPageUpdater(updateHandler);
    DieTintManager.getInstance().setCustomPageUpdater(updateHandler);
    
    console.log('refresh custom page');

    let currentRoll = CustomRollManager.getInstance().getRoll();

    return (
        <View style={styles.Background}>
            <FlatList 
                data={currentRoll.getDiePropArray()}
                ListEmptyComponent={
                    <View style={styles.NoDiceTextContainer}>
                        <Text style={styles.NoDiceText}>No dice</Text>
                    </View>
                }
                renderItem={({ item, index }) =>  (
                    <CustomPageDieView 
                        window={props.window}
                        diePropPair={item} 
                        updateDie={(oldDie : Die, newDie : Die) => CustomRollManager.getInstance().updateDie(oldDie, newDie)}
                        updateProperties={(newProperties : RollProperties) => {
                            CustomRollManager.getInstance().setRoll(CustomRollManager.getInstance().getRoll().addDieToRoll(item.mDie, newProperties))
                            // TODO: improve this so that we don't need to do this.
                            return new Promise<void>(() => null);
                        }}
                        moveUpHandler={() => CustomRollManager.getInstance().setRoll(CustomRollManager.getInstance().getRoll().moveDieUp(index))}
                        deleteHandler={() => CustomRollManager.getInstance().setRoll(CustomRollManager.getInstance().getRoll().removeDieFromRoll(item.mDie))}
                        moveDownHandler={() => CustomRollManager.getInstance().setRoll(CustomRollManager.getInstance().getRoll().moveDieDown(index))}
                    />
                )}
                ItemSeparatorComponent={() => <View style={styles.ListDivider}/>}
                keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.BottomButtonsRow}>
                <AddCustomDiceButton 
                    window={props.window}
                    addDie={(die: Die) => CustomRollManager.getInstance().addDieToRoll(die)} 
                    resetDice={() => CustomRollManager.getInstance().resetRoll()}
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
                        onPress={() => props.displayRoll(CustomRollManager.getInstance().getRoll().setNameCategory('Custom Roll', 'Temp'))}
                    >
                        <Text style={styles.Text}>Roll</Text>
                    </Touchable>
                </View>
            </View>
            <CreateRollDialog 
                modalShown={createRollModalShown} 
                roll={currentRoll} 
                dismissModal={() => setCreateRollModalShown(false)}
            />
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
        fontSize:'$fontSizeHuge',
        textAlign:'center', 
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
        fontSize:'$fontSizeHuge',
    },
})