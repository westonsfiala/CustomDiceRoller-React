

import React from 'react'

import {
    View, 
    Text,
    FlatList,
    ScrollView,
} from 'react-native';

import { SortSetting } from './sync/SortTypeManager';

import Touchable from 'react-native-platform-touchable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EStyleSheet from 'react-native-extended-stylesheet';
import { DieSizeSetting } from './sync/DieSizeManager';

interface SettingsInterface {
}

export function SettingsPage(props : SettingsInterface) {

    console.log('refresh settings page');

    return (
        <View style={styles.Container}>
            <ScrollView>
                <SortSetting/>
                <DieSizeSetting/>
            </ScrollView>
        </View>
    );
}

const styles = EStyleSheet.create({
    Container: {
        flex:1,
    },
})