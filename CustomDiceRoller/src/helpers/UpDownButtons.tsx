
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
import { RollProperties } from '../dice/RollProperties';

interface SpecificUpDownButtonsInterface {
    getCount : () => number;
    setCount : (value: number) => Promise<any>;
}

export function NumDiceUpDownButtons(props : SpecificUpDownButtonsInterface) {
    return (
        <UpDownButtons postFix='d' forcePlusMinus={false} disallowZero={true} getCount={props.getCount} setCount={props.setCount}/>
    );
}

export function ModifierUpDownButtons(props : SpecificUpDownButtonsInterface) {
    return (
        <UpDownButtons postFix='' forcePlusMinus={true} disallowZero={false} getCount={props.getCount} setCount={props.setCount}/>
    );
}

interface UpDownButtonsInterface {
    postFix : string;
    forcePlusMinus : boolean;
    disallowZero : boolean;
    getCount : () => number;
    setCount : (value: number) => Promise<RollProperties>;
}

function UpDownButtons(props : UpDownButtonsInterface) {

    const [modalShown, setModalShown] = useState(false);
    const [reload, setReload] = useState(false);

    let count = props.getCount();

    // Force good values
    let checkVal = enforceGoodValue(count, 0, props.disallowZero);
    if(checkVal !== count) {
        props.setCount(checkVal)
    }

    let countText = String(count);
    if(props.forcePlusMinus) {
        countText = getModifierString(count, false);
    }

    function updateNumber(value: number) {
        props.setCount(value).then(() => setReload(!reload));
    }

    function handleChange(change: number) {
        let snappedChange = snapToNextIncrement(count, change)
        let newCount = enforceGoodValue(count, snappedChange, props.disallowZero)

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
                <Icon style={styles.ButtonBackground} size={styles.IconConstants.width} name='arrow-down-bold' color={styles.IconConstants.color}/>
            </Touchable>
            <Touchable 
                style={styles.TextTouchable}
                onPress={() => setModalShown(true)}
            >
                <Text style={styles.Text}>{countText}{props.postFix}</Text>
            </Touchable>
            <Touchable 
                style={styles.ButtonRadius}
                foreground={Touchable.Ripple('white')}
                onPress={() => {handleChange(1)}}
                onLongPress={() => {handleChange(100)}}
                delayLongPress={300}
            >
                <Icon style={styles.ButtonBackground} size={styles.IconConstants.width} name='arrow-up-bold' color={styles.IconConstants.color}/>
            </Touchable>
            <SetValueDialog 
                modalShown={modalShown} 
                valueEnforcer={(num : number) => {return enforceGoodValue(num, 0, props.disallowZero)}}
                titleText={"Set Value Exact"}
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