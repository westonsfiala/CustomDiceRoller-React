
import React, { useState, useEffect } from 'react'

import {
    View, 
    Text,
    FlatList,
    Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Touchable from 'react-native-platform-touchable';
import EStyleSheet from 'react-native-extended-stylesheet';

import { DieView } from "./dice/DieView";
import { Die } from "./dice/Die";
import { NumDiceUpDownButtons, ModifierUpDownButtons } from './helpers/UpDownButtons';
import { Roll } from './dice/Roll';
import { RollProperties } from './dice/RollProperties';
import { UpDownDeleteButtonColumn } from './helpers/UpDownDeleteButtonColumn';
import { SimpleDie } from './dice/SimpleDie';
import { PropertiesButton } from './helpers/PropertiesButton';
import { CustomPageDieView } from './dice/CustomPageDieView';

export function CustomDicePage({displayRoll}) {
    
    console.log('refresh custom page');

    return (
        <View style={styles.Background}>
            <FlatList 
                data={[new SimpleDie("temp", 2), new SimpleDie("temp2", 4), new SimpleDie("temp3", 6)]}
                ListEmptyComponent={
                    <View style={styles.NoDiceTextContainer}>
                        <Text style={styles.NoDiceText}>
                            No added dice
                        </Text>
                    </View>
                }
                renderItem={({ item }) =>  (
                    <CustomPageDieView die={item}/>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.BottomButtonsRow}>
                <View style={styles.ButtonContainer}>
                    <Touchable
                        style={styles.ButtonBackground}
                        foreground={Touchable.Ripple('white')}
                        onPress={() => null}
                    >
                        <Text style={styles.Text}>
                            Add Die
                        </Text>
                    </Touchable>
                </View>
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
})