import AsyncStorage from "@react-native-community/async-storage";

const ExpectedResultKey = 'ExpectedResultKey';

export default class ExpectedResultManager {

    private static mInstance = null as ExpectedResultManager;

    private mShowExpected = true;
    private mSettingsUpdater = null;
    private mUpdater = null;

    static getInstance() : ExpectedResultManager {
        if(ExpectedResultManager.mInstance === null) {
            ExpectedResultManager.mInstance = new ExpectedResultManager();
        }

        return this.mInstance;
    }

    private constructor() {
        this.retrieveShowExpected().then((showExpected) => {
            this.mShowExpected = showExpected;
        });
    }

    setSettingsUpdater(updater : () => void) {
        this.mSettingsUpdater = updater;
    }

    setUpdater(updater : () => void) {
        this.mUpdater = updater;
    }

    runUpdaters() {
        if(this.mUpdater !== null) this.mUpdater();
        if(this.mSettingsUpdater !== null) this.mSettingsUpdater();
    }

    setShowExpected(showExpected : boolean) {
        this.saveShowExpected(showExpected).then((value) => {
            this.mShowExpected = value;
            this.runUpdaters();
        });
    }

    getShowExpected() : boolean {
        return this.mShowExpected;
    }

    private async saveShowExpected(showExpected : boolean) : Promise<boolean> {
        await AsyncStorage.setItem(ExpectedResultKey, showExpected.toString());
        return showExpected;
    }

    private async retrieveShowExpected() : Promise<boolean> {
        const showExpectedString = await AsyncStorage.getItem(ExpectedResultKey);
        if(showExpectedString === null) { return true; }

        try {
            return showExpectedString == 'true';
        } catch {
            return true;
        }
    }
}

import React, { useState } from 'react'

import {
    View, 
    Text,
} from 'react-native';

import Touchable from 'react-native-platform-touchable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EStyleSheet from 'react-native-extended-stylesheet';

export function ExpectedResultSetting() {

    const [reload, setReload] = useState(false);

    ExpectedResultManager.getInstance().setSettingsUpdater(() => setReload(!reload));

    let showExpected = ExpectedResultManager.getInstance().getShowExpected();

    return (
        <Touchable onPress={() => ExpectedResultManager.getInstance().setShowExpected(!showExpected)} foreground={Touchable.Ripple('white')}>
            <View style={styles.SettingContainer} >
                <Icon size={styles.IconConstants.width} name='information-variant' color={styles.IconConstants.color}/>
                <View style={styles.TextContainer}>
                    <Text style={styles.TitleText}>Show Expected Result</Text>
                    <Text style={styles.ValueText}>{showExpected ? 'Enabled' : 'Disabled'}</Text>
                </View>
            </View>
        </Touchable>
    );
}

const styles = EStyleSheet.create({
    SettingContainer: {
        flexDirection:'row',
        alignContent:'center',
        flex:1
    },
    TextContainer: {
        justifyContent:'center',
        marginLeft:'10rem'
    },
    TitleText: {
        fontSize:'$fontSizeLarge',
        color:'$textColor',
    },
    ValueText: {
        fontSize:'$fontSizeNormal',
        color:'$textColorDarkened',
    },
    IconConstants: {
        width:'60rem',
        color:'$textColor'
    },
})