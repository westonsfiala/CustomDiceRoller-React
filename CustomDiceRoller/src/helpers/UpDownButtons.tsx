
import React, {
    useState
} from 'react';

import {
    View,
    Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Touchable from 'react-native-platform-touchable';
import { getModifierString } from './StringHelper';
import EStyleSheet from 'react-native-extended-stylesheet';
import { SetValueDialog } from '../dialogs/SetValueDialog';

import { enforceGoodValue, snapToNextIncrement } from './NumberHelper';

export function NumDiceUpDownButtons({count, setCount}) {
    return UpDownButtons({postFix:'d', forcePlusMinus:false, disallowZero:true, count, setCount})
}

export function ModifierUpDownButtons({count, setCount}) {
    return UpDownButtons({postFix:'', forcePlusMinus:true, disallowZero:false, count, setCount})
}

function UpDownButtons({postFix = '', forcePlusMinus = false, disallowZero = false, count, setCount}) {

    const [modalShown, setModalShown] = useState(false);

    // Force good values
    let checkVal = enforceGoodValue(count, 0, disallowZero);
    if(checkVal !== count) {
        setCount(checkVal)
    }

    let countText = String(count);
    if(forcePlusMinus) {
        countText = getModifierString(count, false);
    }

    function updateNumber(value: number) {
        setCount(value);
    }

    function handleChange(change: number) {
        let snappedChange = snapToNextIncrement(count, change)
        let newCount = enforceGoodValue(count, snappedChange, disallowZero)

        updateNumber(newCount)
    }
    
    return(
        <View style={styles.Container}>
            <Touchable 
                style={styles.ButtonRadius}
                foreground={Touchable.Ripple('white')}
                onPress={() => {handleChange(-1)}}
                onLongPress={() => {handleChange(-100)}}
                delayLongPress={300}
            >
                <Icon style={styles.ButtonBackground} iconStyle={styles.ButtonForeground} size={styles.IconConstants.width} name='arrow-down-bold' color={styles.IconConstants.color}/>
            </Touchable>
            <Touchable 
                style={styles.TextTouchable}
                onPress={() => setModalShown(true)}
            >
                <Text style={styles.Text}>{countText}{postFix}</Text>
            </Touchable>
            <Touchable 
                style={styles.ButtonRadius}
                foreground={Touchable.Ripple('white')}
                onPress={() => {handleChange(1)}}
                onLongPress={() => {handleChange(100)}}
                delayLongPress={300}
            >
                <Icon style={styles.ButtonBackground} iconStyle={styles.ButtonForeground} size={styles.IconConstants.width} name='arrow-up-bold' color={styles.IconConstants.color}/>
            </Touchable>
            <SetValueDialog 
                modalShown={modalShown} 
                disallowZero={disallowZero} 
                defaultValue={count} 
                dismissModal={() => setModalShown(false)} 
                acceptValue={updateNumber}
            />
        </View>
    );
}

const styles = EStyleSheet.create({
    Container:{
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: '5rem',
    },
    TextTouchable:{
        flex: 1, 
    },
    Text:{
        flex: 1, 
        fontSize: '30rem', 
        textAlign: 'center', 
        color: '$textColor',
    },
    ButtonRadius:{
        borderRadius: '10rem',
        overflow: 'hidden',
    },
    ButtonBackground:{
        backgroundColor: '$primaryColorLightened',
        borderRadius: '10rem',
    },
    ButtonForeground:{
        marginRight: 0,
    },
    IconConstants:{
        color: '$textColor',
        width: '45rem',
    },
})