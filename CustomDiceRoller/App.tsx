/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

// For searchable Icons go to https://oblador.github.io/react-native-vector-icons/
// For description of how to use icons go to https://github.com/oblador/react-native-vector-icons 

import React, { useState, useEffect } from 'react'

import {AppBar} from "./src/appBar";
import {styles} from "./styles/styles";
import {SimpleDieView} from "./src/SimpleDieView";
import Modal, { ModalContent } from 'react-native-modals';
import AsyncStorage from '@react-native-community/async-storage';

import {
    View, 
    Text,
    FlatList,
    Dimensions,
} from 'react-native';
import { NumDiceUpDownButtons, ModifierUpDownButtons } from './src/upDownButtons';

const standardDice = [
    {
        id:'d4',
    },
    {
        id:'d6',
    },
    {
        id:'d8',
    },
    {
        id:'d10',
    },
    {
        id:'d12',
    },
    {
        id:'d20',
    },
    {
        id:'d100',
    },
];

function getNumDice() {
    let value = 1
    const getSavedValue = async () => {
        let temp = '1'
        try {
            temp = await AsyncStorage.getItem('NumDiceSimple') || '1';
        } catch (error) {
            // Error retrieving data
            console.log(error.message)
        }
        return Number(temp)
    };
    getSavedValue().then(output => {value = output});
    return value;
}

function getModifier() {
    let value = 0
    const getSavedValue = async () => {
        let temp = '0'
        try {
            temp = await AsyncStorage.getItem('ModifierSimple') || '0';
        } catch (error) {
            // Error retrieving data
            console.log(error.message)
        }
        return Number(temp)
    };
    getSavedValue().then(output => {value = output});
    return value;
}

const App = () => {

    const [width, setWidth] = useState(Dimensions.get("window").width);
    const [modalShown, setModalShown] = useState(false);
    const [pressedName, setPressedName] = useState("");
    const [numDice, setNumDice] = useState(getNumDice())
    const [modifier, setModifier] = useState(getModifier())

    function handleScreenChange({window}) {
        setWidth(window.width);
    }

    useEffect(() => {
        Dimensions.addEventListener("change", handleScreenChange)
        
        return () => {
            Dimensions.removeEventListener("change", handleScreenChange);
        }
    });

    return (
        <View style={styles.AppBackground}>
            <AppBar title='RPG Dice Roller' subtitle='Tap die icons to roll!'/>
            <FlatList 
                data={standardDice}
                numColumns={4}
                renderItem={({ item }) =>  (
                    <SimpleDieView imageName='cursor-default-click-outline' name={item.id} size={width/4} pressCallback={() => {
                        setModalShown(true);
                        setPressedName(item.id);
                        let gotDice = getNumDice();
                        setNumDice(gotDice);
                        setModifier(getModifier())
                    }} />
                )}
                extraData={width}
            />
            <View style={{flexDirection:'row'}}>
                <NumDiceUpDownButtons settingsKey='NumDiceSimple' />
                <ModifierUpDownButtons settingsKey='ModifierSimple' />
            </View>
            
            <Modal onTouch={() => {setModalShown(false);}} onTouchOutside={() => {setModalShown(false);}} visible={modalShown}>
                <ModalContent>
                    <Text>
                        {pressedName + ' ' + numDice + ' ' + modifier}
                    </Text>
                </ModalContent>
            </Modal>
        </View> 
    );
};

export default App;
