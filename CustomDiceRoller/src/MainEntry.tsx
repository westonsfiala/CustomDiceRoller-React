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
import { View, Dimensions, UIManager, LayoutAnimation, SafeAreaView } from 'react-native';

import { AppBar } from "./appBar/AppBar";
import ViewPager from '@react-native-community/viewpager';
import EStyleSheet from 'react-native-extended-stylesheet'; 

import { SimpleDicePage } from './SimpleDicePage';
import { RollDisplayHelper } from './dice/views/RollDisplayHelper'
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
import { LastHistoryItemViewPopup } from './helpers/HistoryItemView';
import QuickRollEnabledManager from './sync/QuickRollEnabledManager';

enum TopLevelItem
{
    Roller,
    Main,
    About,
}

// Main entry point for the app, controls the highest level of what is shown on the screen.
export function MainEntry() {
    const viewPager = useRef(null as ViewPager);
    const [currentPage, setCurrentPage] = useState(TopLevelItem.Main);
    const [window, setWindow] = useState(Dimensions.get('window'));

    console.log('refresh app');
    
    // This block of code enables layout animations to happen.
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

    function addRoll(newRoll: Roll) {
        if(newRoll !== null)
        {
            let newResult = new RollDisplayHelper(newRoll);
            HistoryManager.getInstance().addToHistory(newResult);
            if(!QuickRollEnabledManager.getInstance().getQuickRollEnabled())
            {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setCurrentPage(TopLevelItem.Roller);
            }
        }
    };

    function editRoll(existingRoll: Roll) {
        CustomRollManager.getInstance().setRoll(existingRoll);
        viewPager.current.setPage(3);
    }

    function showAboutPage() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setCurrentPage(TopLevelItem.About);
    }

    function returnToMainPage() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setCurrentPage(TopLevelItem.Main);
    }

    function dismissRollResultsPage() {
        returnToMainPage();
        HistoryManager.getInstance().runUpdaters();
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


    if(currentPage === TopLevelItem.Roller)
    {
        return (
            <SafeAreaView style={styles.AppBackground}>
                <RollResultsPage dismissPage={dismissRollResultsPage} window={window}/>
            </SafeAreaView>
        );
    }
    else if (currentPage === TopLevelItem.Main)
    {
        return (
            <SafeAreaView style={styles.AppBackground}>
                <AppBar
                    subtitle='Tap die icons to roll!' 
                    clearHistoryHandler={() => HistoryManager.getInstance().clearHistory()}
                    tabPressHandler={tabPressHandler}
                    showAboutPage={showAboutPage}
                    window={window}
                />
                <ViewPager style={styles.Pager} ref={viewPager} initialPage={TabManager.getInstance().tab} onPageSelected={(event) => TabManager.getInstance().tab = event.nativeEvent.position}>
                    <View key="a" >
                        <SettingsPage window={window}/>
                    </View>
                    <View key="b" >
                        <HistoryPage window={window}/>
                    </View>
                    <View key="c" >
                        <SimpleDicePage displayRoll={addRoll} window={window}/>
                    </View>
                    <View key="d" >
                        <CustomDicePage displayRoll={addRoll} window={window}/>
                    </View>
                    <View key="e" >
                        <SavedRollPage displayRoll={addRoll} editRoll={editRoll} window={window}/>
                    </View>
                </ViewPager>
                <LastHistoryItemViewPopup window={window}/>
            </SafeAreaView>
        );
    }
    else // if(currentPage === TopLevelItem.About)
    {
        return (
            <SafeAreaView style={styles.AppBackground}>
                <AboutPage dismissPage={returnToMainPage}/>
            </SafeAreaView>
        );
    }
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
