
import React, { useState, useEffect } from 'react'

import {
    View, 
    Text,
    FlatList,
    Dimensions,
} from 'react-native';

import Touchable from 'react-native-platform-touchable';
import EStyleSheet from 'react-native-extended-stylesheet';

import { Roll } from './dice/Roll';
import { RollProperties } from './dice/RollProperties';
import { CustomPageDieView } from './dice/CustomPageDieView';
import { AddCustomDiceButton } from './helpers/AddCustomDiceButton';

export function CustomDicePage({displayRoll}) {

    const [roll, setRoll] = useState(new Roll("Custom Roll", "Undefined"))
    
    console.log('refresh custom page');

    return (
        <View style={styles.Background}>
            <FlatList 
                data={roll.getDiePropArray()}
                ListEmptyComponent={
                    <View style={styles.NoDiceTextContainer}>
                        <Text style={styles.NoDiceText}>
                            No added dice
                        </Text>
                        <AddCustomDiceButton addDie={() => null} resetDice={() => null}/>
                    </View>
                }
                renderItem={({ item }) =>  (
                    <CustomPageDieView diePropPair={item} updateProperties={(newProperties : RollProperties) => roll.addDieToRoll(item.mDie, newProperties)}/>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.BottomButtonsRow}>
                <AddCustomDiceButton addDie={() => null} resetDice={() => null}/>
                <View style={styles.ButtonContainer}>
                    <Touchable
                        style={styles.ButtonBackground}
                        foreground={Touchable.Ripple('white')}
                        onPress={() => null}
                    >
                        <Text style={styles.Text}>
                            Roll
                        </Text>
                    </Touchable>
                </View>
            </View>
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