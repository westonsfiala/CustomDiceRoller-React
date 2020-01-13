

import React from 'react'

import {
    View, 
    Text,
    FlatList,
} from 'react-native';

import Touchable from 'react-native-platform-touchable';
import EStyleSheet from 'react-native-extended-stylesheet';

interface SettingsInterface {
}

export function SettingsPage(props : SettingsInterface) {

    console.log('refresh settings page');

    return (
        <View style={styles.Container}>
        </View>
    );
}

const styles = EStyleSheet.create({
    Container: {
        flex:1,
        alignContent:'center',
    },
    TitleText: {
        fontSize:'40rem',
        color:'$textColor',
        textAlign:'center',
    },
    DetailText: {
        fontSize:'18rem',
        color:'$textColor',
        textAlign:'center',
    },
    TipText: {
        fontSize:'18rem',
        color:'$textColor',
        margin:'5rem',
        paddingLeft:'5rem',
        backgroundColor:'$primaryColorLightened',
    },
    ButtonContainer: {
        flexDirection:'row', 
        alignItems:'stretch',
        alignContent:'stretch',
        justifyContent:'space-around',
        marginTop:'8rem'
    },
    ButtonBackground: {
        flex:1,
        backgroundColor: '$primaryColorLightened',
        borderRadius: '10rem',
        overflow:'hidden',
        margin:'10rem'
    },
    ButtonText: {
        fontSize: '30rem', 
        textAlign: 'center', 
        color: '$textColor',
    },
    HitSlop: {
        top:'10rem',
        bottom:'10rem',
        right:'10rem',
        left:'10rem'
    }
})