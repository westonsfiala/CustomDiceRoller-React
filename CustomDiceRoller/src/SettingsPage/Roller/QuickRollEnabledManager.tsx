import AsyncStorage from "@react-native-community/async-storage";

const QuickRollEnabledKey = 'QuickRollEnabledKey';

export default class QuickRollEnabledManager {

    private static mInstance = null as QuickRollEnabledManager;

    private mQuickRollEnabled = true;

    private mSettingsUpdater = null;
    private mUpdater = null;

    static getInstance() : QuickRollEnabledManager {
        if(QuickRollEnabledManager.mInstance === null) {
            QuickRollEnabledManager.mInstance = new QuickRollEnabledManager();
        }
        return this.mInstance;
    }

    private constructor() {
        this.retrieveQuickRollEnabled().then((QuickRollEnabled) => {
            this.setQuickRollEnabled(QuickRollEnabled);
        });
    }

    setSettingsUpdater(updater : () => void) {
        this.mSettingsUpdater = updater;
    }

    setUpdater(updater : () => void) {
        this.mUpdater = updater;
    }

    runUpdaters() {
        if(this.mSettingsUpdater !== null) this.mSettingsUpdater();
        if(this.mUpdater !== null) this.mUpdater();
    }

    setQuickRollEnabled(QuickRollEnabled : boolean) {
        this.saveQuickRollEnabled(QuickRollEnabled).then((value) => {
            this.mQuickRollEnabled = value;
            this.runUpdaters();
        });
    }

    getQuickRollEnabled() : boolean {
        return this.mQuickRollEnabled;
    }

    private async saveQuickRollEnabled(QuickRollEnabled : boolean) : Promise<boolean> {
        await AsyncStorage.setItem(QuickRollEnabledKey, QuickRollEnabled.toString());
        return QuickRollEnabled;
    }

    private async retrieveQuickRollEnabled() : Promise<boolean> {
        const quickRollEnabledKey = await AsyncStorage.getItem(QuickRollEnabledKey);
        if(quickRollEnabledKey === null) { return false; }
        return quickRollEnabledKey == 'true';
    }
}

import React, { useState } from 'react'

import {
    View, 
    Text,
    LayoutAnimation,
} from 'react-native';

import Touchable from 'react-native-platform-touchable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EStyleSheet from 'react-native-extended-stylesheet';

import { AnimationsEnabledSetting } from "./AnimationsEnabledManager";

export function QuickRollEnabledSetting() {

    const [reload, setReload] = useState(false);

    QuickRollEnabledManager.getInstance().setSettingsUpdater(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setReload(!reload);
    });

    let QuickRollEnabled = QuickRollEnabledManager.getInstance().getQuickRollEnabled();

    return (
        <View>
            <Touchable onPress={() => QuickRollEnabledManager.getInstance().setQuickRollEnabled(!QuickRollEnabled)} foreground={Touchable.Ripple('white')}>
                <View style={styles.SettingContainer} >
                    <Icon size={styles.IconConstants.width} name='fast-forward' color={styles.IconConstants.color}/>
                    <View style={styles.TextContainer}>
                        <Text style={styles.TitleText}>Quick Roll</Text>
                        <Text style={styles.ValueText}>{QuickRollEnabled ? 'Enabled' : 'Disabled'}</Text>
                    </View>
                </View>
            </Touchable>
            <View style={[ styles.ButtonContainer, {height: QuickRollEnabled ? 0 : null}]}>
                <AnimationsEnabledSetting/>
            </View>
        </View>
        
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
    ButtonContainer:{
        flexDirection:'column',
        overflow:'hidden',
    },
})