

import React from 'react'

import {
    View, 
    Text,
    ScrollView,
    ScaledSize,
} from 'react-native';

import { DieSizeSetting } from './Dice/DieSizeManager';
import { DieThemeSetting } from './Dice/ThemeSetting';

import { ExpectedResultSetting } from './Results/ExpectedResultManager';
import { SortSetting } from './Results/SortTypeManager';
import { MinMaxHighlightEnabledSetting } from './Results/MinMaxHighlightEnabledManager';

import { RollResultVolumeSetting } from './Roller/RollResultVolumeManager';
import { RollContainerSizeSetting } from './Roller/RollContainerSizeManager';

import { LegacyMigrationSetting } from './Advanced/LegacyMigrationSetting';

import Color from 'color';
import EStyleSheet from 'react-native-extended-stylesheet';
import { RateMeSetting } from './Advanced/RateMeSetting';

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
                <RollContainerSizeSetting/>
                <RollResultVolumeSetting/>
                <View style={styles.Divider}/>
                <Text style={styles.DividerText}>Results</Text>
                <SortSetting/>
                <ExpectedResultSetting/>
                <MinMaxHighlightEnabledSetting/>
                <View style={styles.Divider}/>
                <Text style={styles.DividerText}>Advanced</Text>
                <RateMeSetting/>
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