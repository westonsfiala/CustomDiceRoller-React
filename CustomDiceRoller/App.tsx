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
  useState
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
    </View>
  );
};

function Counter({initialCount}) {
  const [count, setCount] = useState(initialCount);
  return (
    <View>
      <Text>Count: {count}</Text>
      <Button title='Reset' onPress={() => setCount(initialCount)}/>
      <Button title='-' onPress={() => setCount(count - 1)}/>
      <Button title='+' onPress={() => setCount(count + 1)}/>
    </View>
  );
};

export default App;
