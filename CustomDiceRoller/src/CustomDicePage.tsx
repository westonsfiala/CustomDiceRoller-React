
import React, { useState, useEffect } from 'react'

import {
    View, 
    Text,
    FlatList,
} from 'react-native';

import Touchable from 'react-native-platform-touchable';
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color'

import { Roll } from './dice/Roll';
import { RollProperties } from './dice/RollProperties';
import { CustomPageDieView } from './dice/CustomPageDieView';
import { AddCustomDiceButton } from './helpers/AddCustomDiceButton';
import { Die } from './dice/Die';
import { CreateRollDialog } from './dialogs/CreateRollDialog';
import RollManager from './sync/RollManager';
import CustomRollManager from './sync/CustomRollManager';
import { ConfirmOverrideDialog } from './dialogs/ConfirmOverrideDialog';

interface CustomRollPageInterface {
    displayRoll: (roll: Roll) => void;
}

export function CustomDicePage(props: CustomRollPageInterface) {

    const [createRollModalShown, setCreateRollModalShown] = useState(false);
    const [overrideRollModalShown, setOverrideRollModalShown] = useState(false);
    const [reload, setReload] = useState(false);
    
    CustomRollManager.getInstance().setUpdater(() => setReload(!reload));
    
    console.log('refresh custom page');

    function handleCreateRoll(newRoll: Roll, force: boolean = false) {
        CustomRollManager.getInstance().setRoll(newRoll);
        if(!RollManager.getInstance().addRoll(newRoll, force)) {
            setOverrideRollModalShown(true);
        }
    }

    return (
        <View style={styles.Background}>
            <FlatList 
                data={CustomRollManager.getInstance().getRoll().getDiePropArray()}
                ListEmptyComponent={
                    <View style={styles.NoDiceTextContainer}>
                        <Text style={styles.NoDiceText}>No dice</Text>
                    </View>
                }
                renderItem={({ item, index }) =>  (
                    <CustomPageDieView 
                        diePropPair={item} 
                        updateDie={CustomRollManager.getInstance().updateDie}
                        updateProperties={(newProperties : RollProperties) => CustomRollManager.getInstance().setRoll(CustomRollManager.getInstance().getRoll().addDieToRoll(item.mDie, newProperties))}
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
                        onPress={() => props.displayRoll(CustomRollManager.getInstance().getRoll())}
                    >
                        <Text style={styles.Text}>Roll</Text>
                    </Touchable>
                </View>
            </View>
            <CreateRollDialog 
                modalShown={createRollModalShown} 
                roll={CustomRollManager.getInstance().getRoll()} 
                dismissModal={() => setCreateRollModalShown(false)} 
                createRoll={handleCreateRoll} 
            />
            <ConfirmOverrideDialog 
                modalShown={overrideRollModalShown} 
                dismissModal={() => setOverrideRollModalShown(false)} 
                itemName={CustomRollManager.getInstance().getRoll().displayName} 
                override={() => handleCreateRoll(CustomRollManager.getInstance().getRoll(), true)} 
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