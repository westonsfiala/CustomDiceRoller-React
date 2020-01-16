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

import React, { useRef, useState, useEffect } from 'react'
import { View, Dimensions, UIManager, LayoutAnimation } from 'react-native';

import { AppBar } from "./appBar/AppBar";
import ViewPager from '@react-native-community/viewpager';
import EStyleSheet from 'react-native-extended-stylesheet'; 

import { SimpleDicePage } from './SimpleDicePage';
import { RollDisplayHelper } from './dice/RollDisplayHelper'
import { HistoryPage } from './HistoryPage';
import { Roll } from './dice/Roll';
import { RollResultsPage } from './RollResultsPage';
import { CustomDicePage } from './CustomDicePage';
import { SavedRollPage } from './SavedRollPage';
import HistoryManager from './sync/HistoryManager';
import TabManager from './sync/TabManager';
import CustomRollManager from './sync/CustomRollManager';
import { AboutPage } from './AboutPage';
import { SettingsPage } from './SettingsPage';

// Main entry point for the app, controls the highest level of what is shown on the screen.
export function MainEntry() {
    const viewPager = useRef(null as ViewPager);
    const dialogPager = useRef(null as ViewPager);
    const [window, setWindow] = useState(Dimensions.get('window'));

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
        viewPager.current.setPage(3);
    }

    function dismissRollResultsPage() {
        dialogPager.current.setPage(1);
        HistoryManager.getInstance().runUpdaters();
    }

    function showAboutPage() {
        dialogPager.current.setPage(2);
    }

    function returnToMainPage() {
        dialogPager.current.setPage(1);
    }

    function tabPressHandler(index: number) {
        viewPager.current.setPage(index);
    }

    function handleScreenChange({window}) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setWindow(window);
    }

    useEffect(() => {
        Dimensions.addEventListener("change", handleScreenChange);
        
        return () => {
            Dimensions.removeEventListener("change", handleScreenChange);
        }
    });

    return (
        <View style={styles.AppBackground}>
            <ViewPager style={styles.Pager} ref={dialogPager} initialPage={1} orientation="vertical" scrollEnabled={false}>
                <View key="1">
                    <RollResultsPage dismissPage={dismissRollResultsPage}/>
                </View>
                <View key="2">
                    <AppBar
                        subtitle='Tap die icons to roll!' 
                        clearHistoryHandler={() => HistoryManager.getInstance().clearHistory()}
                        tabPressHandler={tabPressHandler}
                        showAboutPage={showAboutPage}
                    />
                    <ViewPager style={styles.Pager} ref={viewPager} initialPage={2} onPageSelected={(event) => TabManager.getInstance().tab = event.nativeEvent.position}>
                        <View key="a" >
                            <SettingsPage/>
                        </View>
                        <View key="b" >
                            <HistoryPage/>
                        </View>
                        <View key="c" >
                            <SimpleDicePage displayRoll={addRoll} window={window}/>
                        </View>
                        <View key="d" >
                            <CustomDicePage displayRoll={addRoll}/>
                        </View>
                        <View key="e" >
                            <SavedRollPage displayRoll={addRoll} editRoll={editRoll}/>
                        </View>
                    </ViewPager>
                </View>
                <View key="3">
                    <AboutPage dismissPage={returnToMainPage}/>
                </View>
                <View key="4">
                    <AboutPage dismissPage={returnToMainPage}/>
                </View>
            </ViewPager>
        </View>
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
