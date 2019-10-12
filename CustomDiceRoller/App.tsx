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
  StyleSheet,
} from 'react-native';

const App = () => {
  return (
    <View style={styles.AppBackground}>
      <Text style={styles.flexRow}>Hello, world!</Text>
      <Counter initialCount={0}/>
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

const styles = StyleSheet.create({
  AppBackground: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#3f3f3f', // Dark Theme
  },
  flexRow: {
    flex: 1, 
    flexWrap: 'wrap',
    alignContent: 'center',
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  flexColumn: {
    flex: 1, flexDirection: 'column',
    padding: 10, backgroundColor: 'blue'
  },
});

export default App;
