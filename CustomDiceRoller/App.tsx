/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {
  useState, useEffect
} from 'react';

import {
  View,
  Text,
  Button,
} from 'react-native';

import {AppBar} from "./src/appBar";
import {styles} from "./styles/styles"

const App = () => {
  return (
    <View style={styles.AppBackground}>
      <AppBar title='RPG Dice Roller' subtitle='Tap die icons to roll!'/>
      <Blink text='I Blink!'/>
    </View> 
  );
};

function Counter({initialCount}) {
  const [count, setCount] = useState(initialCount);
  return (
    <View style={styles.flexColumn}>
      <Text>Count: {count}</Text>
      <View style={styles.flexRow}>
        <Button title='Reset' onPress={() => setCount(initialCount)}/>
        <Button title='-' onPress={() => setCount(prevCount => prevCount - 1)}/>
        <Button title='+' onPress={() => setCount(prevCount => prevCount + 1)}/>
      </View>
    </View>
  );
};

function Blink({text}) {
  const [shown, setShown] = useState(true);

  useEffect(
    () => {
      setTimeout(() => (
        setShown(!shown)
        ), 1000);
      }
    );

  if(shown) {
    return (
      <Text>{text}</Text>
    )
  };

  return (
    <Text />
  )
}

export default App;
