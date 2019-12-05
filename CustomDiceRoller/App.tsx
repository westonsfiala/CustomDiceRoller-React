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

import React, { useState, useRef, useEffect } from 'react'
import { View, Dimensions } from 'react-native';

import { AppBar } from "./src/appBar/AppBar";
import ViewPager from '@react-native-community/viewpager';
import { MenuProvider } from 'react-native-popup-menu';
import EStyleSheet from 'react-native-extended-stylesheet'; 
import Color from 'color';

let {height, width} = Dimensions.get('window');
EStyleSheet.build({
    $rem: Math.min(height,width) / 380, // This is an arbitrary value that allows for better scaling.
    $textColor: Color.rgb(255,255,255).hex(),
    $textColorBad: Color.rgb(255,0,0).hex(),
    $primaryColor: Color.rgb(63,63,63).hex(),
    $primaryColorLightened: Color.rgb(63,63,63).lighten(.5).hex(),
    $primaryColorDarkened: Color.rgb(63,63,63).darken(.5).hex(),
});

import { SimpleDicePage } from './src/SimpleDicePage';
import { RollDisplayHelper } from './src/dice/RollDisplayHelper'
import { RollResultsDialog } from './src/dialogs/RollResultsDialog';
import { HistoryPage } from './src/HistoryPage';

// Main entry point for the app, controls the highest level of what is shown on the screen.
const App = () => {
    const [rollHelper, setRollHelper] = useState(null as RollDisplayHelper) 
    const viewPager = useRef(null as ViewPager);
    const [currentPage, setCurrentPage] = useState(1);
    const [rollHistory, setRollHistory] = useState(Array<RollDisplayHelper>());
    const previousRollHistory = useRef(null as Array<RollDisplayHelper>);

    console.log('refresh app');

    function clearRollHistoryHandler() {
        previousRollHistory.current = rollHistory;
        setRollHistory(Array<RollDisplayHelper>());
    }

    function addRollToHistory(newRoll: RollDisplayHelper) {
        // If we are adding something to the history, do not allow re-setting the old history.
        if(previousRollHistory.current !== null) {
            previousRollHistory.current = null;
        }

        // Do not set the rollHelper to null. The rollHelperDialog does this when it closes.
        rollHistory.push(newRoll);

        setRollHelper(newRoll);
    };

    function dismissRollHelperDisplay() {
        setRollHelper(null);
    }

    function tabPressHandler(index: number) {
        viewPager.current.setPage(index);
    }

    return (
        <MenuProvider>
            <View style={styles.AppBackground}>
                <AppBar 
                title='RPG Dice Roller' 
                subtitle='Tap die icons to roll!' 
                clearHistoryHandler={clearRollHistoryHandler} 
                tabIndex={currentPage} 
                tabPressHandler={tabPressHandler}
                />
                <ViewPager style={styles.Pager} ref={viewPager}  initialPage = {currentPage} onPageSelected={(event) => setCurrentPage(event.nativeEvent.position)}>
                    <View key="1" >
                        <HistoryPage rollHistory={rollHistory}/>
                    </View>
                    <View key="2" >
                        <SimpleDicePage displayRoll={addRollToHistory}/>
                    </View>
                </ViewPager>
                <RollResultsDialog rollHelper={rollHelper} addRollToHistory={addRollToHistory} dismissRollHelperDisplay={dismissRollHelperDisplay}/>
            </View>
        </MenuProvider>
    );
};

const styles = EStyleSheet.create({
    AppBackground: {
        flex:1,
        backgroundColor:'$primaryColor'
    },
    Pager: {
        flex:1,
    }
})

export default App;
