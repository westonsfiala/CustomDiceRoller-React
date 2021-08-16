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

import PagerView from 'react-native-pager-view';
import EStyleSheet from 'react-native-extended-stylesheet'; 

import { AppBar } from "./AppBar/AppBar";

import { AboutPage } from './AboutPage/AboutPage';
import { RollResultsPage } from './RollResultsPage/RollResultsPage';

import { SettingsPage } from './SettingsPage/SettingsPage';
import { HistoryPage } from './HistoryPage/HistoryPage';
import { SimpleDicePage } from './SimpleDicePage/SimpleDicePage';
import { CustomDicePage } from './CustomDicePage/CustomDicePage';
import { SavedRollPage } from './SavedRollPage/SavedRollPage';

import { Roll } from './Common/dice/Roll';
import { RollDisplayHelper } from './Common/dice/results/RollDisplayHelper'

import HistoryManager from './Common/managers/HistoryManager';
import TabManager from './AppBar/managers/TabManager';
import CustomRollManager from './CustomDicePage/managers/CustomRollManager';
import RateMeManager from './SettingsPage/Advanced/RateMeManager';
import AboutManager from './Common/managers/AboutManager';
import RollResultsManager from './Common/managers/RollResultsManager';
import RollContainerSizeManager from './SettingsPage/Roller/RollContainerSizeManager';

import { LastHistoryItemViewPopup } from './HistoryPage/views/HistoryItemView';
import { RateMeDialog } from './SettingsPage/Advanced/RateMeDialog';

// Main entry point for the app, controls the highest level of what is shown on the screen.
export function MainEntry() {
    const pagerView = useRef(null as PagerView);
    const [window, setWindow] = useState(Dimensions.get('window'));
    const [showRateDialog, setShowRateDialog] = useState(false);

    console.log('refresh app');

    useEffect(() => {
        RateMeManager.getInstance().shouldPopUpRateDialog().then((popUp) => {
            if(popUp) {
                setShowRateDialog(true);
            }
        })
    })
    
    // This block of code enables layout animations to happen.
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

    function addRoll(newRoll: Roll) {
        if(newRoll !== null)
        {
            let newResult = new RollDisplayHelper(newRoll);
            HistoryManager.getInstance().addToHistory(newResult);
            if(!RollContainerSizeManager.getInstance().isMinimal)
            {
                RollResultsManager.getInstance().showRollResultsDialog();
            }
        }
    };

    function editRoll(existingRoll: Roll) {
        CustomRollManager.getInstance().setRoll(existingRoll);
        pagerView.current.setPage(3);
    }

    function showAboutPage() {
        AboutManager.getInstance().showAboutDialog();
    }

    function dismissAboutPage() {
        AboutManager.getInstance().hideAboutDialog();
    }

    function dismissRollResultsPage() {
        RollResultsManager.getInstance().hideRollResultsDialog();
    }

    function tabPressHandler(index: number) {
        pagerView.current.setPage(index);
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
        <SafeAreaView style={styles.AppBackground}>
            <AppBar
                subtitle='Tap die icons to roll!' 
                clearHistoryHandler={() => HistoryManager.getInstance().clearHistory()}
                tabPressHandler={tabPressHandler}
                showAboutPage={showAboutPage}
                window={window}
            />
            <PagerView style={styles.Pager} ref={pagerView} initialPage={TabManager.getInstance().tab} onPageSelected={(event) => TabManager.getInstance().tab = event.nativeEvent.position}>
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
            </PagerView>
            <RollResultsPage dismissPage={dismissRollResultsPage} window={window}/>
            <AboutPage dismissPage={dismissAboutPage}/>
            <LastHistoryItemViewPopup window={window}/>
            <RateMeDialog modalShown={showRateDialog} dismissModal={() => setShowRateDialog(false)}/>
        </SafeAreaView>
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
