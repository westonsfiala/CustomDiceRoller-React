
import React, {
    useState
  } from 'react';

import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
  } from 'react-native';

  import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

  export function UpDownButtons() {
      const [count, setCount] = useState(0)
      return(
          <View style={{flexDirection:'row', alignItems:'center'}}>
              <TouchableOpacity>
                <Icon style={{backgroundColor:'#5f5f5f', borderRadius:10}} iconStyle={{marginRight:0}} size={50} name='arrow-down-bold' onPress={() => {setCount(count-1)}} color="#ffffff"/>
              </TouchableOpacity>
              <Text style={{flex:1, fontSize:30, textAlign:'center', color:'#ffffff'}} >{count}d</Text>
              <TouchableOpacity>
                <Icon style={{backgroundColor:'#5f5f5f', borderRadius:10}} iconStyle={{marginRight:0}} size={50} name='arrow-up-bold' onPress={() => {setCount(count+1)}} color="#ffffff"/>
              </TouchableOpacity>
          </View>
      );
  }