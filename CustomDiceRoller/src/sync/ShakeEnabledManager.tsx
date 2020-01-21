import AsyncStorage from "@react-native-community/async-storage";

const ShakeEnabledKey = 'ShakeEnabledKey';

export default class ShakeEnabledManager {

    private static mInstance = null as ShakeEnabledManager;

    private mShakeEnabled = true;

    private mSettingsUpdater = null;
    private mUpdater = null;

    static getInstance() : ShakeEnabledManager {
        if(ShakeEnabledManager.mInstance === null) {
            ShakeEnabledManager.mInstance = new ShakeEnabledManager();
        }
        return this.mInstance;
    }

    private constructor() {
        this.retrieveShakeEnabled().then((shakeEnabled) => {
            this.setShakeEnabled(shakeEnabled);
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

    setShakeEnabled(shakeEnabled : boolean) {
        this.saveShakeEnabled(shakeEnabled).then((value) => {
            this.mShakeEnabled = value;
            this.runUpdaters();
        });
    }

    getShakeEnabled() : boolean {
        return this.mShakeEnabled;
    }

    private async saveShakeEnabled(shakeEnabled : boolean) : Promise<boolean> {
        await AsyncStorage.setItem(ShakeEnabledKey, shakeEnabled.toString());
        return shakeEnabled;
    }

    private async retrieveShakeEnabled() : Promise<boolean> {
        const shakeEnabledKey = await AsyncStorage.getItem(ShakeEnabledKey);
        if(shakeEnabledKey === null) { return true; }
        return shakeEnabledKey == 'true';
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
import { ShakeSensitivitySetting } from "./ShakeSensitivityManager";

export function ShakeEnabledSetting() {

    const [reload, setReload] = useState(false);

    ShakeEnabledManager.getInstance().setSettingsUpdater(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setReload(!reload);
    });

    let shakeEnabled = ShakeEnabledManager.getInstance().getShakeEnabled();

    return (
        <View>
            <Touchable onPress={() => ShakeEnabledManager.getInstance().setShakeEnabled(!shakeEnabled)} foreground={Touchable.Ripple('white')}>
                <View style={styles.SettingContainer} >
                    <Icon size={styles.IconConstants.width} name='dice-multiple' color={styles.IconConstants.color}/>
                    <View style={styles.TextContainer}>
                        <Text style={styles.TitleText}>Shake</Text>
                        <Text style={styles.ValueText}>{shakeEnabled ? 'Enabled' : 'Disabled'}</Text>
                    </View>
                </View>
            </Touchable>
            <View style={[ styles.ButtonContainer, {height: shakeEnabled ? null : 0}]}>
                <ShakeSensitivitySetting/>
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
        fontSize:'20rem',
        color:'$textColor',
    },
    ValueText: {
        fontSize:'15rem',
        color:'$textColorDarkened',
    },
    IconConstants: {
        width:'60rem',
        color:'$textColor'
    },
    ButtonContainer:{
        flexDirection:'row',
        overflow:'hidden',
    },
})