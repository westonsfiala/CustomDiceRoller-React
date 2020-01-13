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
import { View, Dimensions, UIManager } from 'react-native';

import { AppBar } from "./src/appBar/AppBar";
import ViewPager from '@react-native-community/viewpager';
import { MenuProvider } from 'react-native-popup-menu';
import EStyleSheet from 'react-native-extended-stylesheet'; 
import Color from 'color';

let {height, width} = Dimensions.get('window');
EStyleSheet.build({
    $rem: Math.min(height,width) / 380, // This is an arbitrary value that allows for better scaling.
    $textColor: Color.rgb(255,255,255).hex(),
    $textColorDarkened: Color.rgb(255,255,255).darken(.25).hex(),
    $textColorBad: Color.rgb(255,0,0).hex(),
    $primaryColor: Color.rgb(63,63,63).hex(),
    $primaryColorLightened: Color.rgb(63,63,63).lighten(.5).hex(),
    $primaryColorDarkened: Color.rgb(63,63,63).darken(.5).hex(),
});

import { SimpleDicePage } from './src/SimpleDicePage';
import { RollDisplayHelper } from './src/dice/RollDisplayHelper'
import { HistoryPage } from './src/HistoryPage';
import { Roll } from './src/dice/Roll';
import { RollResultsPage } from './src/RollResultsPage';
import { CustomDicePage } from './src/CustomDicePage';
import { SavedRollPage } from './src/SavedRollPage';
import HistoryManager from './src/sync/HistoryManager';
import TabManager from './src/sync/TabManager';
import CustomRollManager from './src/sync/CustomRollManager';

// Main entry point for the app, controls the highest level of what is shown on the screen.
const App = () => {
    const viewPager = useRef(null as ViewPager);
    const dialogPager = useRef(null as ViewPager);

    console.log('refresh app');
    
    // This block of code enables layout animations to happen.
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

    function addRoll(newRoll: Roll) {
        if(newRoll !== null)
        {
            let newResult = new RollDisplayHelper(newRoll);
            HistoryManager.getInstance().addToHistory(newResult);
            dialogPager.current.setPage(0);
        }
    };

    function editRoll(existingRoll: Roll) {
        CustomRollManager.getInstance().setRoll(existingRoll);
        viewPager.current.setPage(2);
    }

    function dismissRollResultsDialog() {
        dialogPager.current.setPage(1);
        HistoryManager.getInstance().runUpdaters();
    }

    function tabPressHandler(index: number) {
        viewPager.current.setPage(index);
    }

    return (
        <MenuProvider>
            <View style={styles.AppBackground}>
                <ViewPager style={styles.Pager} ref={dialogPager} initialPage={1} orientation="vertical" scrollEnabled={false}>
                    <View key="1">
                        <RollResultsPage dismissDialog={dismissRollResultsDialog}/>
                    </View>
                    <View>
                        <AppBar 
                            title='RPG Dice Roller' 
                            subtitle='Tap die icons to roll!' 
                            clearHistoryHandler={() => HistoryManager.getInstance().clearHistory()}
                            tabPressHandler={tabPressHandler}
                        />
                        <ViewPager style={styles.Pager} ref={viewPager} initialPage={1} onPageSelected={(event) => TabManager.getInstance().tab = event.nativeEvent.position}>
                            <View key="1" >
                                <HistoryPage/>
                            </View>
                            <View key="2" >
                                <SimpleDicePage displayRoll={addRoll}/>
                            </View>
                            <View key="3" >
                                <CustomDicePage displayRoll={addRoll}/>
                            </View>
                            <View key="4" >
                                <SavedRollPage displayRoll={addRoll} editRoll={editRoll}/>
                            </View>
                        </ViewPager>
                    </View>
                </ViewPager>
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
    },
})

export default App;
