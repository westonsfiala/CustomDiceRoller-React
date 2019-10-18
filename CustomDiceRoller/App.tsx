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

import React, { useState } from 'react'

import {AppBar} from "./src/appBar";
import {styles} from "./styles/styles";
import {SimpleDieView} from "./src/SimpleDieView";
import Modal, { ModalContent } from 'react-native-modals';

import {
    View, 
    Text,
    FlatList,
    Dimensions,
} from 'react-native';
import { UpDownButtons } from './src/upDownButtons';

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

const App = () => {

    const [width, setWidth] = useState(Dimensions.get("window").width);
    const [modalShown, setModalShown] = useState(false);
    const [pressedName, setPressedName] = useState("");

    function handleScreenChange({window}) {
        setWidth(window.width);
    }

    Dimensions.addEventListener("change", handleScreenChange)

    return (
        <View style={styles.AppBackground}>
            <AppBar title='RPG Dice Roller' subtitle='Tap die icons to roll!'/>
            <FlatList 
                data={standardDice}
                numColumns={4}
                renderItem={({ item }) =>  (
                    <SimpleDieView imageName='cursor-default-click-outline' name={item.id} size={width/4} pressCallback={() => {setModalShown(true), setPressedName(item.id)}} />
                )}
                extraData={width}
            />
            <UpDownButtons/>
            
            <Modal onTouchOutside={() => {setModalShown(false);}} visible={modalShown}>
                <ModalContent>
                    <Text>
                        {pressedName}
                    </Text>
                </ModalContent>
            </Modal>
        </View> 
    );
};

export default App;
