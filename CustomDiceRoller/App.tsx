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
import Modal, { 
    ModalContent, 
    ScaleAnimation,
    ModalFooter,
    ModalButton
} from 'react-native-modals';

import {
    View, 
    Text,
    FlatList,
    Dimensions,
} from 'react-native';
import { NumDiceUpDownButtons, ModifierUpDownButtons } from './src/upDownButtons';
import { getModifierText } from './src/stringHelper';

const standardDice = [
    {
        id:'d4',
        dieInfo:{
            type:'simple',
            value:4,
        }
    },
    {
        id:'d6',
        die:{
            type:'simple',
            value:6,
        }
    },
    {
        id:'d8',
        die:{
            type:'simple',
            value:8,
        }
    },
    {
        id:'d10',
        die:{
            type:'simple',
            value:10,
        }
    },
    {
        id:'d12',
        die:{
            type:'simple',
            value:12,
        }
    },
    {
        id:'d20',
        die:{
            type:'simple',
            value:20,
        }
    },
    {
        id:'d100',
        die:{
            type:'simple',
            value:100,
        }
    },
];

const App = () => {

    const [width, setWidth] = useState(Dimensions.get("window").width);
    const [height, setHeight] = useState(Dimensions.get("window").height);
    const [modalShown, setModalShown] = useState(false);
    const [pressedName, setPressedName] = useState("");
    const [numDice, setNumDice] = useState(1)
    const [modifier, setModifier] = useState(0)

    function handleScreenChange({window}) {
        setWidth(window.width);
        setHeight(window.height);
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
                    }} />
                )}
                extraData={width}
            />
            <View style={{flexDirection:'row'}}>
                <NumDiceUpDownButtons setExternalCount={setNumDice} />
                <ModifierUpDownButtons setExternalCount={setModifier} />
            </View>
            
            <Modal 
                onTouchOutside={() => {setModalShown(false);}} 
                visible={modalShown}
                modalAnimation={new ScaleAnimation()}
                width={.5}
                height={.5}
            >
                <ModalContent style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <Text>
                        {numDice + pressedName + getModifierText(modifier, true)}
                    </Text>
                </ModalContent>
                <ModalFooter>
                    <ModalButton text="CANCEL" onPress={() => {setModalShown(false);}} />
                    <ModalButton text="OK" onPress={() => {setModalShown(false);}} />
                </ModalFooter>
            </Modal>
        </View> 
    );
};

export default App;
