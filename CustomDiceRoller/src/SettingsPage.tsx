

import React from 'react'

import {
    View, 
    Text,
    ScrollView,
} from 'react-native';

import { SortSetting } from './sync/SortTypeManager';

import EStyleSheet from 'react-native-extended-stylesheet';
import { DieSizeSetting } from './sync/DieSizeManager';
import Color from 'color';
import { DieThemeSetting } from './sync/ThemeSetting';

export function SettingsPage() {

    console.log('refresh settings page');

    return (
        <View style={styles.Container}>
            <ScrollView style={styles.ScrollPadding}>
                <Text style={styles.DividerText}>General</Text>
                <SortSetting/>
                <DieSizeSetting/>
                <DieThemeSetting/>
                <View style={styles.Divider}/>
            </ScrollView>
        </View>
    );
}

const styles = EStyleSheet.create({
    Container: {
        flex:1,
    },
    ScrollPadding: {
        marginLeft:'10rem',
        marginRight:'10rem',
    },
    DividerText: {
        color:'$textColorHighlight',
        fontSize:'18rem',
        marginTop:'10rem',
        marginBottom:'5rem',
    },
    Divider:{
        borderBottomColor: Color.rgb(128,128,128).hex(), 
        borderBottomWidth: 1,
    },
})