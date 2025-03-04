/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

// For searchable Icons go to https://oblador.github.io/react-native-vector-icons/
// For description of how to use icons go to https://github.com/oblador/react-native-vector-icons 

import React, { useState, useEffect } from 'react'
import { Dimensions, View, Text} from 'react-native';

import { MenuProvider, Menu } from 'react-native-popup-menu';
import EStyleSheet from 'react-native-extended-stylesheet'; 
import Color from 'color';

import { MainEntry } from './src/MainEntry'
import { OpenAllSingletons } from './src/Common/managers/SyncMaster';
import { BetterRenderer } from './src/Common/views/BetterRenderer';

let {height, width} = Dimensions.get('window');
EStyleSheet.build({
    $rem: Math.min(height,width) / 380, // This is an arbitrary value that allows for better scaling.
    $fontSizeNormal: '16rem',
    $fontSizeLarge: '20rem',
    $fontSizeHuge: '30rem',
    $fontSizeMassive: '40rem',
    $fontSizeGargantuan: '60rem',
    $fontSizeColossal: '80rem',
    $textColor: Color.rgb(255,255,255).hex(),
    $textColorDarkened: Color.rgb(255,255,255).darken(.25).hex(),
    $textColorHighlight: Color.rgb(0,255,255).darken(.25).hex(),
    $textColorBad: Color.rgb(255,0,0).darken(.25).hex(),
    $textColorGood: Color.rgb(0,255,0).darken(.25).hex(),
    $primaryColor: Color.rgb(63,63,63).hex(),
    $primaryColorLightened: Color.rgb(63,63,63).lighten(.5).hex(),
    $primaryColorDarkened: Color.rgb(63,63,63).darken(.5).hex(),
});

Menu.setDefaultRenderer(BetterRenderer);

// Main entry point for the app, controls the highest level of what is shown on the screen.
const App = () => {

    const [firstLoad, setFirstLoad] = useState(true);

    // Give the app time to sync all of its settings.
    useEffect(() => {
        if(firstLoad) {
            OpenAllSingletons();
            let clear = setTimeout(() => setFirstLoad(false), 500);
            return(() => clearTimeout(clear));
        }
    });

    if(firstLoad) {
        
        const appPkg = require("./app.json");
        const versionPkg = require('./package.json');

        return(
            <View style={styles.AppBackground}>
                <Text style={styles.LoadText}>Loading...</Text>
                <Text style={styles.LoadText}>{appPkg.displayName}</Text>
                <Text style={styles.LoadText}>Version {versionPkg.version}</Text>
            </View>
        );
    }

    return (
        <MenuProvider skipInstanceCheck={true} backHandler={true}>
            <MainEntry/>
        </MenuProvider>
    );
};

export default App;

const styles = EStyleSheet.create({
    AppBackground: {
        flex:1,
        justifyContent:'center',
        backgroundColor:'$primaryColor'
    },
    LoadText: {
        fontSize:'$fontSizeMassive',
        color:'$textColorDarkened',
        textAlign:'center',
    },
})
