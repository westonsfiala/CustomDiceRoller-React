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

import {AppBar} from "./src/AppBar";
import {styles} from "./styles/styles";
import {SimpleDieView} from "./src/dice/SimpleDieView";
import {Die} from "./src/dice/Die";
import {SimpleDie} from "./src/dice/SimpleDie";
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
import { NumDiceUpDownButtons, ModifierUpDownButtons } from './src/UpDownButtons';
import { Roll } from './src/dice/Roll';
import { RollProperties } from './src/dice/RollProperties';
import { RollDisplayHelper } from './src/dice/RollHelper';

const standardDice = [
    {
        id:'d2',
        die: new SimpleDie('d2', 2)
    },
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
    const [numDice, setNumDice] = useState(1);
    const [modifier, setModifier] = useState(0);
    const [rollHelper, setRollHelper] = useState(null as RollDisplayHelper)

    function handleScreenChange({window}) {
        setWidth(window.width);
        setHeight(window.height);
    }

    function createNewRollHelper(clickedDie: Die) {
        let tempRoll = new Roll("","");
        let rollProps = new RollProperties({dieCount:numDice, modifier:modifier});

        tempRoll.addDieToRoll(clickedDie, rollProps);

        setRollHelper(new RollDisplayHelper(tempRoll));
    }

    useEffect(() => {
        Dimensions.addEventListener("change", handleScreenChange);
        
        return () => {
            Dimensions.removeEventListener("change", handleScreenChange);
        }
    });

    let modalShown = rollHelper !== null;

    if(modalShown) {
        // TODO: Add history fuction with date
        //val time = Calendar.getInstance().time
        //val formatter = SimpleDateFormat("yyyy/MM/dd\nHH:mm:ss", Locale.getDefault())
        //val formattedDate = formatter.format(time)

        //listener.onRollResult(HistoryStamp(
        //    rollTotal.text,
        //    rollName.text,
        //    rollDetails.text,
        //    formattedDate
        //))

        // TODO: lock screen rotation
        //dialog.setOnDismissListener {
        //    unlockRotation()
        //}

        // TODO: Add sound
        //if (rollValues.mRollMaximumValue) {
        //    playTripleHorn()
        //} else if (rollValues.mRollMinimumValue) {
        //    playWilhelmScream()
        //}
    }

    return (
        <View style={styles.AppBackground}>
            <AppBar title='RPG Dice Roller' subtitle='Tap die icons to roll!'/>
            <FlatList 
                data={standardDice}
                numColumns={4}
                renderItem={({ item }) =>  (
                    <SimpleDieView imageID={item.die.imageID} name={item.die.displayName} size={width/4} pressCallback={() => {
                        createNewRollHelper(item.die);
                    }} />
                )}
                extraData={width}
            />
            <View style={{flexDirection:'row'}}>
                <NumDiceUpDownButtons setExternalCount={setNumDice} />
                <ModifierUpDownButtons setExternalCount={setModifier} />
            </View>
            
            <Modal 
                onTouchOutside={() => setRollHelper(null)} 
                visible={modalShown}
                modalAnimation={new ScaleAnimation()}
                width={0.6}
                height={0.45}
                onDismiss={() => setRollHelper(null)}
            >
                <ModalContent style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <Text style={{fontSize:30}}>
                        {rollHelper && rollHelper.rollNameText || ''}
                    </Text>
                    <View style={{alignContent:'center', alignItems:'center', justifyContent:'center'}}>
                        <Text style={{fontSize:55, fontWeight:'bold', marginTop:4, marginBottom:4 }}>
                            {rollHelper && rollHelper.rollSumText.regularText || ''}
                            <Text style={{fontSize:50, fontWeight:'bold', marginTop:4, marginBottom:4, textDecorationLine: 'line-through' }}>
                                {rollHelper && rollHelper.rollSumText.struckText || ''}
                            </Text>
                        </Text>
                    </View>
                    <FlatList 
                        style={{flex:1}}
                        contentContainerStyle={{alignContent:'center', justifyContent:'center', alignItems:'center'}}
                        data={rollHelper && rollHelper.rollResultsText || []}
                        renderItem={({ item }) =>  (
                            <View style={{alignContent:'center', alignItems:'center', justifyContent:'center'}}>
                                <Text style={{fontSize:16}}>
                                    {item.regularText}
                                    <Text style={{textDecorationLine: 'line-through'}}>
                                        {item.struckText}
                                    </Text>
                                </Text>
                            </View>
                        )}
                    />
                </ModalContent>
                <ModalFooter>
                    <ModalButton text="Roll Again" onPress={() => setRollHelper(new RollDisplayHelper(rollHelper.storedRoll))} />
                    <ModalButton text="OK" onPress={() => setRollHelper(null)} />
                </ModalFooter>
            </Modal>
        </View> 
    );
};

export default App;
