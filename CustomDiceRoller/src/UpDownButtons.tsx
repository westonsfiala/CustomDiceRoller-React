
import React, {
    useState
} from 'react';

import {
    View,
    Text,
    TextInput,
} from 'react-native';
    
import Modal, { 
    ModalContent, 
    ScaleAnimation,
} from 'react-native-modals';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Touchable from 'react-native-platform-touchable';
import { getModifierString } from './StringHelper';
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color'
import { number } from 'prop-types';

export function NumDiceUpDownButtons({setExternalCount}) {
    return UpDownButtons({postFix:'d', forcePlusMinus:false, disallowZero:true, setExternalCount})
}

export function ModifierUpDownButtons({setExternalCount}) {
    return UpDownButtons({postFix:'', forcePlusMinus:true, disallowZero:false, setExternalCount})
}

function UpDownButtons({postFix = '', forcePlusMinus = false, disallowZero = false, setExternalCount}) {

    const [count, setCount] = useState(enforceGoodValue(0,0, disallowZero));
    const [currentText, setCurrentText] = useState(count.toString());
    const [modalShown, setModalShown] = useState(false);

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

    function handleTextInputChange(value: string) {
        setCurrentText(value);
    }

    function setCountExact() {
        let possibleNumber = Number.parseInt(currentText)
        if(Number.isSafeInteger(possibleNumber))
        {
            let newCount = enforceGoodValue(possibleNumber, 0, disallowZero)

            setCount(newCount);
            setExternalCount(newCount);
        }
        setModalShown(false);
    }
    
    return(
        <View style={styles.Container}>
            <Touchable 
                style={styles.buttonRadius}
                foreground={Touchable.Ripple('white')}
                onPress={() => {handleChange(-1)}}
                onLongPress={() => {handleChange(-100)}}
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
                style={styles.buttonRadius}
                foreground={Touchable.Ripple('white')}
                onPress={() => {handleChange(1)}}
                onLongPress={() => {handleChange(100)}}
            >
                <Icon style={styles.ButtonBackground} iconStyle={styles.ButtonForeground} size={styles.IconConstants.width} name='arrow-up-bold' color={styles.IconConstants.color}/>
            </Touchable>
            <Modal 
                onTouchOutside={() => setModalShown(false)} 
                visible={modalShown}
                modalAnimation={new ScaleAnimation()}
                onDismiss={() => setModalShown(false)}
                width={.75}
            >
                <ModalContent style={styles.ModalContainer}>
                    <Text style={styles.ModalTitle}>Set Exact Value</Text>
                    <View style={styles.ModalTextInputLine}>
                        <Text style={styles.ModalText}>Number</Text>
                        <TextInput 
                        style={styles.ModalInputText}
                        autoFocus={true}
                        selectTextOnFocus={true}
                        defaultValue={count.toString()}
                        keyboardType={'number-pad'}
                        onChangeText={(text) => handleTextInputChange(text)}
                        />
                    </View>
                    <View style={styles.ModalButtonLine}>
                        <Touchable 
                        style={styles.ModalButton}
                        hitSlop={styles.HitSlop}
                        onPress={() => setModalShown(false)}
                        >
                            <Text style={styles.ModalText}>Cancel</Text>
                        </Touchable>
                        <Touchable 
                        style={styles.ModalButton}
                        hitSlop={styles.HitSlop}
                        onPress={() => setCountExact()}
                        >
                            <Text style={styles.ModalText}>OK</Text>
                        </Touchable>
                    </View>
                </ModalContent>
            </Modal>
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
    ModalContainer:{
        backgroundColor:'$primaryColor',
    },
    ModalTextInputLine:{
        flexDirection:'row',
        alignItems:'center'
    },
    ModalButtonLine:{
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    ModalButton:{
        paddingTop:'8rem',
        paddingLeft:'8rem',
        paddingRight:'8rem',
    },
    ModalTitle:{
        fontSize:'20rem',
        color:'$textColor',
    },
    ModalText:{
        fontSize:'16rem',
        color:'$textColor',
    },
    ModalInputText:{
        flex:1,
        color:'$textColor',
        marginLeft:'8rem',
        fontSize:'16rem',
        borderBottomWidth:'1rem',
        borderColor:Color.rgb(128,128,128).hex()
    },
    HitSlop: {
        top:'10rem',
        bottom:'10rem',
        right:'10rem',
        left:'10rem'
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