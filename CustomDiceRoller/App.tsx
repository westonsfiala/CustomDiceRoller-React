/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React from 'react'

import {AppBar} from "./src/appBar";
import {Blink} from "./src/blink"
import {styles} from "./styles/styles"

import {
  View,
} from 'react-native';

const App = () => {
  return (
    <View style={styles.AppBackground}>
      <AppBar title='RPG Dice Roller' subtitle='Tap die icons to roll!'/>
      <Blink text='I Blink!'/>
    </View> 
  );
};

export default App;
