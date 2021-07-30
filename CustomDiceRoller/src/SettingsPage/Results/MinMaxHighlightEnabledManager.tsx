import AsyncStorage from "@react-native-async-storage/async-storage";

const MinMaxHighlightEnabledKey = 'MinMaxHighlightEnabledKey';

export default class MinMaxHighlightEnabledManager {

    private static mInstance = null as MinMaxHighlightEnabledManager;

    private mMinMaxHighlightEnabled = true;

    private mSettingsUpdater = null;

    static getInstance() : MinMaxHighlightEnabledManager {
        if(MinMaxHighlightEnabledManager.mInstance === null) {
            MinMaxHighlightEnabledManager.mInstance = new MinMaxHighlightEnabledManager();
        }
        return this.mInstance;
    }

    private constructor() {
        this.retrieveMinMaxHighlightEnabled().then((MinMaxHighlightEnabled) => {
            this.setMinMaxHighlightEnabled(MinMaxHighlightEnabled);
        });
    }

    setSettingsUpdater(updater : () => void) {
        this.mSettingsUpdater = updater;
    }

    runUpdaters() {
        if(this.mSettingsUpdater !== null) this.mSettingsUpdater();
    }

    setMinMaxHighlightEnabled(MinMaxHighlightEnabled : boolean) {
        this.saveMinMaxHighlightEnabled(MinMaxHighlightEnabled).then((value) => {
            this.mMinMaxHighlightEnabled = value;
            this.runUpdaters();
        });
    }

    getMinMaxHighlightEnabled() : boolean {
        return this.mMinMaxHighlightEnabled;
    }

    private async saveMinMaxHighlightEnabled(MinMaxHighlightEnabled : boolean) : Promise<boolean> {
        await AsyncStorage.setItem(MinMaxHighlightEnabledKey, MinMaxHighlightEnabled.toString());
        return MinMaxHighlightEnabled;
    }

    private async retrieveMinMaxHighlightEnabled() : Promise<boolean> {
        const MinMaxHighlightEnabledString = await AsyncStorage.getItem(MinMaxHighlightEnabledKey);
        if(MinMaxHighlightEnabledString === null) { return true; }
        return MinMaxHighlightEnabledString == 'true';
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

export function MinMaxHighlightEnabledSetting() {

    const [reload, setReload] = useState(false);

    MinMaxHighlightEnabledManager.getInstance().setSettingsUpdater(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setReload(!reload);
    });

    let MinMaxHighlightEnabled = MinMaxHighlightEnabledManager.getInstance().getMinMaxHighlightEnabled();

    return (
        <Touchable onPress={() => MinMaxHighlightEnabledManager.getInstance().setMinMaxHighlightEnabled(!MinMaxHighlightEnabled)} foreground={Touchable.Ripple('white')}>
            <View style={styles.SettingContainer} >
                <Icon size={styles.IconConstants.width} name='format-color-highlight' color={styles.IconConstants.color}/>
                <View style={styles.TextContainer}>
                    <Text style={styles.TitleText}>Min-Max Highlight</Text>
                    <Text style={styles.ValueText}>{MinMaxHighlightEnabled ? 'Enabled' : 'Disabled'}</Text>
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
    ButtonContainer:{
        flexDirection:'column',
        overflow:'hidden',
    },
})