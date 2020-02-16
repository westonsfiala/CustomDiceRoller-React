

import React from 'react'

import {
    View, 
    Text,
    ScrollView,
    ScaledSize,
} from 'react-native';

import { SortSetting } from './sync/SortTypeManager';

import EStyleSheet from 'react-native-extended-stylesheet';
import { DieSizeSetting } from './sync/DieSizeManager';
import Color from 'color';
import { DieThemeSetting } from './sync/ThemeSetting';
import { ExpectedResultSetting } from './sync/ExpectedResultManager';
import { RollResultVolumeSetting } from './sync/RollResultVolumeManager';
import { LegacyMigrationSetting } from './sync/LegacyMigrationSetting';
import { AnimationsEnabledSetting } from './sync/AnimationsEnabledManager';

interface SettingsInterface{
    window : ScaledSize
}

export function SettingsPage(props : SettingsInterface) {

    console.log('refresh settings page');

    return (
        <View style={styles.Container}>
            <ScrollView style={styles.ScrollPadding}>
                <Text style={styles.DividerText}>Dice</Text>
                <DieSizeSetting/>
                <DieThemeSetting window={props.window}/>
                <View style={styles.Divider}/>
                <Text style={styles.DividerText}>Roller</Text>
                <AnimationsEnabledSetting/>
                <RollResultVolumeSetting/>
                <View style={styles.Divider}/>
                <Text style={styles.DividerText}>Results</Text>
                <SortSetting/>
                <ExpectedResultSetting/>
                <View style={styles.Divider}/>
                <Text style={styles.DividerText}>Advanced</Text>
                <LegacyMigrationSetting/>
            </ScrollView>
        </View>
    );
}

const styles = EStyleSheet.create({
    Container: {
        flex:1,
    },
    ScrollPadding: {
        paddingLeft:'10rem',
        paddingRight:'10rem',
    },
    DividerText: {
        color:'$textColorHighlight',
        fontSize:'$fontSizeNormal',
        marginTop:'5rem',
        marginBottom:'5rem',
    },
    Divider:{
        borderBottomColor: Color.rgb(128,128,128).hex(), 
        borderBottomWidth: 1,
        marginTop:'10rem',
    },
})