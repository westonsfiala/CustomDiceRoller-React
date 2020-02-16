import AsyncStorage from "@react-native-community/async-storage";

const AnimationsEnabledKey = 'AnimationsEnabledKey';

export default class AnimationsEnabledManager {

    private static mInstance = null as AnimationsEnabledManager;

    private mAnimationsEnabled = true;

    private mSettingsUpdater = null;
    private mUpdater = null;

    static getInstance() : AnimationsEnabledManager {
        if(AnimationsEnabledManager.mInstance === null) {
            AnimationsEnabledManager.mInstance = new AnimationsEnabledManager();
        }
        return this.mInstance;
    }

    private constructor() {
        this.retrieveAnimationsEnabled().then((animationsEnabled) => {
            this.setAnimationsEnabled(animationsEnabled);
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

    setAnimationsEnabled(animationsEnabled : boolean) {
        this.saveAnimationsEnabled(animationsEnabled).then((value) => {
            this.mAnimationsEnabled = value;
            this.runUpdaters();
        });
    }

    getAnimationsEnabled() : boolean {
        return this.mAnimationsEnabled;
    }

    private async saveAnimationsEnabled(animationsEnabled : boolean) : Promise<boolean> {
        await AsyncStorage.setItem(AnimationsEnabledKey, animationsEnabled.toString());
        return animationsEnabled;
    }

    private async retrieveAnimationsEnabled() : Promise<boolean> {
        const animationsEnabledKey = await AsyncStorage.getItem(AnimationsEnabledKey);
        if(animationsEnabledKey === null) { return true; }
        return animationsEnabledKey == 'true';
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
import { ShakeEnabledSetting } from "./ShakeEnabledManager";
import { ShakeVolumeSetting } from "./ShakeVolumeManager";
import { ShakeLengthSetting } from "./ShakeLengthManager";
import { ShakeDieSizeSetting } from "./ShakeDieSizeManager";

export function AnimationsEnabledSetting() {

    const [reload, setReload] = useState(false);

    AnimationsEnabledManager.getInstance().setSettingsUpdater(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setReload(!reload);
    });

    let animationsEnabled = AnimationsEnabledManager.getInstance().getAnimationsEnabled();

    return (
        <View>
            <Touchable onPress={() => AnimationsEnabledManager.getInstance().setAnimationsEnabled(!animationsEnabled)} foreground={Touchable.Ripple('white')}>
                <View style={styles.SettingContainer} >
                    <Icon size={styles.IconConstants.width} name='animation-play' color={styles.IconConstants.color}/>
                    <View style={styles.TextContainer}>
                        <Text style={styles.TitleText}>Animations</Text>
                        <Text style={styles.ValueText}>{animationsEnabled ? 'Enabled' : 'Disabled'}</Text>
                    </View>
                </View>
            </Touchable>
            <View style={[ styles.ButtonContainer, {height: animationsEnabled ? null : 0}]}>
                <ShakeEnabledSetting/>
                <ShakeVolumeSetting/>
                <ShakeLengthSetting/>
                <ShakeDieSizeSetting/>
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