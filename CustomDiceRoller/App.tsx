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
    ScrollView,
} from 'react-native';
import { NumDiceUpDownButtons, ModifierUpDownButtons } from './src/upDownButtons';
import { getModifierString } from './src/stringHelper';
import { Roll } from './src/dice/Roll';
import { RollProperties } from './src/dice/RollProperties';
import { Die } from './src/dice/Die';
import { createUnknownDie } from './src/dice/DieFactory'
import { string } from 'prop-types';

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

    let rollNameText = '';
    let rollSumText = {regularText:'', struckText:''};
    let dieResultsText = [];

    if(modalShown && clickedDie !== null) {

        let tempRoll = new Roll("","");
        let rollProps = new RollProperties({dieCount:numDice, modifier:modifier});

        const summer = (accumulator: number, current: number) => accumulator + current;
        const concatter = (accumulator: string, current: number) => current + ', ' + accumulator;

        tempRoll.addDieToRoll(clickedDie, rollProps);

        let rollValues = tempRoll.roll();

        rollNameText = tempRoll.getDetailedRollName();

        for(let dieJson of rollValues.mRollResults.keys()) {

            let die = createUnknownDie(dieJson);

            let rollResults = rollValues.mRollResults.get(dieJson);
            let rollResultsDropped = rollValues.mDroppedRolls.get(dieJson);
            let rollResultsReRolled = rollValues.mReRolledRolls.get(dieJson);
            let rollResultsStruck = rollValues.mStruckRollResults.get(dieJson);
            let rollResultsStruckDropped = rollValues.mStruckDroppedRolls.get(dieJson);
            let rollResultsStruckReRolled = rollValues.mStruckReRolledRolls.get(dieJson);
            let rollModifier = rollValues.mRollModifiers.get(dieJson);

            const processRollPair = (dieName: string, mainList: Array<number>, strikeList: Array<number>, modifier?: number | 0) : {id: string, regularText: string, struckText: string} =>
            {
                if(mainList && mainList.length !== 0 || strikeList && strikeList.length !== 0) {


                    let subTotal = mainList.reduce(summer,0) + modifier
                    let mainListString = mainList.toString()
                    let strikeListString = strikeList.toString()
                    let detailString = '';
                    detailString += dieName + ' [' + subTotal + ']: '; 
                    detailString += mainListString;
                    if(rollModifier !== 0)
                    {
                        if(mainListString.length !== 0)
                        {
                            detailString += ',';
                        }
                        detailString += '(' + getModifierString(rollModifier,true) + ')';
                    }
                    if(strikeListString.length !== 0) {
                        detailString += ' ';
                    }
                    return {id:dieName, regularText: detailString, struckText: strikeListString}
                }

                return null
            }

            let mainResults = processRollPair(die.displayName, rollResults, rollResultsStruck, rollModifier);
            if(mainResults !== null)
            {
                dieResultsText.push(mainResults)
            }

            let droppedResults = processRollPair(die.displayName, rollResultsDropped, rollResultsStruckDropped, 0);
            if(droppedResults !== null)
            {
                dieResultsText.push(droppedResults)
            }

            let rerolledResults = processRollPair(die.displayName, rollResultsReRolled, rollResultsStruckReRolled, 0);
            if(rerolledResults !== null)
            {
                dieResultsText.push(rerolledResults)
            }
        }

        // TODO: When settings are made, SHOW AVERAGE
        if(true) {
            let averageText = 'Expected Result - [' + tempRoll.average() + ']';

            dieResultsText.push({id:'expected', regularText: averageText, struckText:''})
        }

        let sumResult = 0;
        let sumStruck = 0;
        let displayStruck = false;
        let displayDropped = false;

        for(let dieRolls of rollValues.mRollResults.values())
        {
            sumResult += dieRolls.reduce(summer);
        }

        for(let dieMod of rollValues.mRollModifiers.values()) {
            sumResult += dieMod;
            sumStruck += dieMod;
        }

        // Only show the struck through text
        if(rollValues.mStruckRollResults.size !== 0) {
            for (let struckValues of rollValues.mStruckRollResults.values()) {
                if(struckValues.length !== 0) {
                    sumStruck += struckValues.reduce(summer);
                    displayStruck = true;
                }
            }
        }

        let sumDropped = sumResult
        if(rollValues.mDroppedRolls.size !== 0) {
            for (let droppedValues of rollValues.mDroppedRolls.values()) {
                if(droppedValues.length !== 0) {
                    sumDropped += droppedValues.reduce(summer);
                    displayDropped = true;
                }
            }
        }

        let highText = sumResult.toString();
        let lowText = sumStruck.toString();
        let droppedText = sumDropped.toString();
        let struckText = '';

        if(displayStruck) 
        {
            struckText = lowText;
        }
        else if(displayDropped)
        {
            struckText = droppedText;
        }

        rollSumText.regularText = highText;
        rollSumText.struckText = struckText;

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
                width={.6}
                height={.5}
                onDismiss={() => setClickedDie(null)}
            >
                <ModalContent style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <Text adjustsFontSizeToFit={true} style={{fontSize:21}}>
                        {rollNameText}
                    </Text>
                    <View style={{flexDirection:'row'}}>
                        <Text adjustsFontSizeToFit={true} style={{fontSize:40, fontWeight:'bold', marginTop:4, marginBottom:4 }}>
                            {rollSumText.regularText}
                        </Text>
                        <Text adjustsFontSizeToFit={true} style={{fontSize:40, fontWeight:'bold', marginTop:4, marginBottom:4, textDecorationLine: 'line-through' }}>
                            {rollSumText.struckText}
                        </Text>
                    </View>
                    <FlatList 
                        data={dieResultsText}
                        renderItem={({ item }) =>  (
                            <View style={{flexDirection:'row'}}>
                                <Text>
                                    {item.regularText}
                                </Text>
                                <Text style={{textDecorationLine: 'line-through'}}>
                                    {item.struckText}
                                </Text>
                            </View>
                        )}
                    />
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
