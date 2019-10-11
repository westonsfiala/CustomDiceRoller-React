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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Hello, world!</Text>
      <Counter initialCount ={0}/>
      <Blink text='I Blink!'/>
    </View>
  );
};

function Counter({initialCount}) {
  const [count, setCount] = useState(initialCount);
  return (
    <View>
      <Text>Count: {count}</Text>
      <Button title='Reset' onPress={() => setCount(initialCount)}/>
      <Button title='-' onPress={() => setCount(prevCount => prevCount - 1)}/>
      <Button title='+' onPress={() => setCount(prevCount => prevCount + 1)}/>
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
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

export default App;
