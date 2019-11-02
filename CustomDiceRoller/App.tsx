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

import React, { useState, useRef } from 'react'
import { View, Text } from 'react-native';

import { AppBar } from "./src/AppBar";
import { styles } from "./styles/styles";
import ViewPager from '@react-native-community/viewpager';

import { SimpleDicePage } from './src/SimpleDicePage';
import { RollDisplayHelper } from './src/dice/RollDisplayHelper'
import { RollResultsDialog } from './src/dialogs/RollResultsDialog';
import { HistoryPage } from './src/HistoryPage';

const App = () => {
    const [rollHelper, setRollHelper] = useState(null as RollDisplayHelper)
    const [rollHistory, setRollHistory] = useState(Array<RollDisplayHelper>())
    const previousRollHistory = useRef(null as Array<RollDisplayHelper>)

    function clearHistoryHandler() {
        previousRollHistory.current = rollHistory;
        setRollHistory(Array<RollDisplayHelper>())
    }

    if(rollHelper !== null) {
        // If we are adding something to the history, do not allow re-setting the old history.
        if(previousRollHistory !== null) {
            previousRollHistory.current = null;
        }

        // Do not set the rollHelper to null. The rollHelperDialog does this when it closes.
        rollHistory.unshift(rollHelper);
    }

    return (
        <View style={styles.AppBackground}>
            <AppBar title='RPG Dice Roller' subtitle='Tap die icons to roll!' clearHistoryHandler={clearHistoryHandler}/>
            <ViewPager style={{flex:1}} initialPage = {1}>
                <View key="1" >
                    <HistoryPage historyItems={rollHistory}/>
                </View>
                <View key="2" >
                    <SimpleDicePage displayRoll={setRollHelper}/>
                </View>
            </ViewPager>
            <RollResultsDialog rollHelper={rollHelper} setRollHelper={setRollHelper}/>
        </View> 
    );
};

export default App;
