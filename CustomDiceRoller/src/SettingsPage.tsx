

import React from 'react'

import {
    View, 
    Text,
    FlatList,
    ScrollView,
} from 'react-native';

import SortTypeManager, { SortSetting } from './sync/SortTypeManager';

import Touchable from 'react-native-platform-touchable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EStyleSheet from 'react-native-extended-stylesheet';

interface SettingsInterface {
}

export function SettingsPage(props : SettingsInterface) {

    console.log('refresh settings page');

    return (
        <View style={styles.Container}>
            <ScrollView>
                <SortSetting/>
            </ScrollView>
        </View>
    );
}

const styles = EStyleSheet.create({
    Container: {
        flex:1,
        alignContent:'center',
    },
    SettingContainer: {
        flexDirection:'row',
        alignContent:'center',
        flex:1
    },
    TextContainer: {
        justifyContent:'center',
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
    }
})