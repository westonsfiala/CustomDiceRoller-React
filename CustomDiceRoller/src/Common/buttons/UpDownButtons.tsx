
import React, {
    useState
} from 'react';

import {
    View,
    Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Touchable from 'react-native-platform-touchable';
import EStyleSheet from 'react-native-extended-stylesheet';

import { getModifierString } from '../utility/StringHelper';
import { enforceGoodValue, snapToNextIncrement } from '../utility/NumberHelper';

import { SetValueDialog } from '../dialogs/SetValueDialog';
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

    function updateNumber(value: number) {
        props.setCount(value).then(() => setReload(!reload));
    }

    function handleChange(change: number) {
        let currentCount = props.getCount();
        let snappedChange = snapToNextIncrement(currentCount, change)
        let newCount = enforceGoodValue(currentCount, snappedChange, props.disallowZero)

        updateNumber(newCount)
    }

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
        fontSize:'$fontSizeHuge',
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