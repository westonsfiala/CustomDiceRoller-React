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
import {Die} from "./src/dice/die";
import {SimpleDie} from "./src/dice/simpleDie";
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
    ScrollView,
} from 'react-native';
import { NumDiceUpDownButtons, ModifierUpDownButtons } from './src/upDownButtons';
import { getModifierText } from './src/stringHelper';
import { randomIntFromInterval } from './src/rollHelper';

const standardDice = [
    {
        id:'d4',
        die: new SimpleDie('d4', 4)
    },
    {
        id:'d6',
        die: new SimpleDie('d6', 6)
    },
    {
        id:'d8',
        die: new SimpleDie('d8', 8)
    },
    {
        id:'d10',
        die: new SimpleDie('d10', 10)
    },
    {
        id:'d12',
        die: new SimpleDie('d12', 12)
    },
    {
        id:'d20',
        die: new SimpleDie('d20', 20)
    },
    {
        id:'d100',
        die: new SimpleDie('d100', 100)
    },
];

const App = () => {

    const [width, setWidth] = useState(Dimensions.get("window").width);
    const [height, setHeight] = useState(Dimensions.get("window").height);
    const [modalShown, setModalShown] = useState(false);
    const [numDice, setNumDice] = useState(1);
    const [modifier, setModifier] = useState(0);
    const [clickedDie, setClickedDie] = useState(new SimpleDie('temp', 0))

    function handleScreenChange({window}) {
        setWidth(window.width);
        setHeight(window.height);
    }

    useEffect(() => {
        Dimensions.addEventListener("change", handleScreenChange);
        
        return () => {
            Dimensions.removeEventListener("change", handleScreenChange);
        }
    });

    let rollName = '';
    let rollSum = '';
    let dieResultsString = '';

    if(modalShown && clickedDie !== null) {

        let dieResults = [];

        rollName = numDice + '' + clickedDie.displayName + getModifierText(modifier, true);

        for(var i = 0; i < Math.abs(numDice); ++i) {
            dieResults.push(clickedDie.roll());
        }

        const summer = (accumulator: number, current: number) => accumulator + current;

        rollSum = dieResults.reduce(summer);

        const concatter = (accumulator: String, current: number) => accumulator + ', ' + current;

        dieResultsString = dieResults.reduce(concatter);
    }

    return (
        <View style={styles.AppBackground}>
            <AppBar title='RPG Dice Roller' subtitle='Tap die icons to roll!'/>
            <FlatList 
                data={standardDice}
                numColumns={4}
                renderItem={({ item }) =>  (
                    <SimpleDieView imageName='cursor-default-click-outline' name={item.die.displayName} size={width/4} pressCallback={() => {
                        setModalShown(true);
                        setClickedDie(item.die);
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
                width={.7}
                height={.5}
                onDismiss={() => setClickedDie(null)}
            >
                <ModalContent style={{flex:1, alignItems:'center'}}>
                    <ScrollView style={{}} contentContainerStyle={{alignItems:'center'}}>
                        <Text style={{fontSize:25, padding:2}}>
                            {rollName}
                        </Text>
                        <Text style={{fontSize:30, fontWeight:'bold', padding:8}}>
                            {rollSum}
                        </Text>
                        <Text>
                            {dieResultsString}
                        </Text>
                    </ScrollView>
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
