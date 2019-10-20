
import React, {
    useState
  } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
  } from 'react-native';

  import AsyncStorage from '@react-native-community/async-storage';
  import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

  export function NumDiceUpDownButtons({settingsKey}) {
      return UpDownButtons({postFix:'d', forcePlusMinus:false, disallowZero:true, settingsKey})
  }

  export function ModifierUpDownButtons({settingsKey}) {
      return UpDownButtons({postFix:'', forcePlusMinus:true, disallowZero:false, settingsKey})
  }

  function UpDownButtons({postFix = '', forcePlusMinus = false, disallowZero = false, settingsKey}) {

        const [count, setCount] = useState( enforceGoodValue(0,0, disallowZero) )

        let preFix = ''
        if(forcePlusMinus && count >= 0) {
            preFix = '+'
        }

        function handleChange(change: number) {
            let newCount = enforceGoodValue(count, change, disallowZero)

            AsyncStorage.setItem(settingsKey, newCount.toString()).then()

            setCount(newCount);
        }
      
        return(
            <View style={{flex:1, flexDirection:'row', alignItems:'center', padding:4}}>
                <TouchableOpacity 
                    onPress={() => {handleChange(-1)}}
                    onLongPress={() => {handleChange(snapToNextIncrement(count, -100))}}
                >
                    <Icon style={{backgroundColor:'#5f5f5f', borderRadius:10}} iconStyle={{marginRight:0}} size={50} name='arrow-down-bold'  color="#ffffff"/>
                </TouchableOpacity>
                <Text style={{flex:1, fontSize:30, textAlign:'center', color:'#ffffff'}} >{preFix}{count}{postFix}</Text>
                <TouchableOpacity 
                    onPress={() => {handleChange(1)}}
                    onLongPress={() => {handleChange(snapToNextIncrement(count, 100))}}
                >
                    <Icon style={{backgroundColor:'#5f5f5f', borderRadius:10}} iconStyle={{marginRight:0}} size={50} name='arrow-up-bold' color="#ffffff"/>
                </TouchableOpacity>
            </View>
        );
  }

  // Sometimes we do not want to allow for the value to be 0.
  function enforceGoodValue(value: number, change: number, disallowZero: boolean) {

    let newValue = value + change;

    if(newValue != 0 || !disallowZero) {
      return newValue;
    }

    if(value < -1 && change > 1) {
      return -1;
    }

    if(value > 1 && change < -1) {
      return 1;
    }

    if(change >= 0) {
      return 1;
    }
    
    return -1
  }

    // Will return the increment that is needed to snap to the next evenly divisible stepSize.
    // i.e (101, 100) -> 99, (101,-100) -> -1
  function snapToNextIncrement(valueIn: number, stepSize: number) {

    if(stepSize == 0 )
    {
        return valueIn
    }

    let valueRem = valueIn % stepSize

    // If you are negative jumping up, or positive jumping down, just drop down/up the remainder.
    if((valueRem > 0 && stepSize < 0) || (valueRem < 0 && stepSize > 0))
    {
        return -valueRem
    }
    else
    {
        return -valueRem + stepSize
    }

  }