
import React, {
        useState
    } from 'react';

import {
        View,
        Text,
        TouchableOpacity,
    } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getModifierString } from './StringHelper';
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color'

export function NumDiceUpDownButtons({setExternalCount}) {
    return UpDownButtons({postFix:'d', forcePlusMinus:false, disallowZero:true, setExternalCount})
}

export function ModifierUpDownButtons({setExternalCount}) {
    return UpDownButtons({postFix:'', forcePlusMinus:true, disallowZero:false, setExternalCount})
}

function UpDownButtons({postFix = '', forcePlusMinus = false, disallowZero = false, setExternalCount}) {

    const [count, setCount] = useState( enforceGoodValue(0,0, disallowZero) );

    let countText = String(count);
    if(forcePlusMinus) {
        countText = getModifierString(count, false);
    }

    function handleChange(change: number) {
        let snappedChange = snapToNextIncrement(count, change)
        let newCount = enforceGoodValue(count, snappedChange, disallowZero)

        setCount(newCount);
        setExternalCount(newCount);
    }
    
    return(
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={() => {handleChange(-1)}}
                onLongPress={() => {handleChange(-100)}}
            >
                <Icon style={styles.buttonBackground} iconStyle={styles.buttonForeground} size={styles.iconConstants.width} name='arrow-down-bold' color={styles.iconConstants.color}/>
            </TouchableOpacity>
            <Text style={styles.text}>{countText}{postFix}</Text>
            <TouchableOpacity 
                onPress={() => {handleChange(1)}}
                onLongPress={() => {handleChange(100)}}
            >
                <Icon style={styles.buttonBackground} iconStyle={styles.buttonForeground} size={styles.iconConstants.width} name='arrow-up-bold' color={styles.iconConstants.color}/>
            </TouchableOpacity>
        </View>
    );
}

const styles = EStyleSheet.create({
    container:{
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: '5rem',
    },
    text:{
        flex: 1, 
        fontSize: '30rem', 
        textAlign: 'center', 
        color: '$textColor',
    },
    buttonBackground:{
        backgroundColor: '$primaryColorLightened',
        borderRadius: '10rem',
    },
    buttonForeground:{
        marginRight: 0,
    },
    iconConstants:{
        color: '$textColor',
        width: '45rem',
    }
})

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