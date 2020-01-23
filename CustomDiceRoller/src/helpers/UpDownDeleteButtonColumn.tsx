import React from 'react'

import { View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Touchable from 'react-native-platform-touchable';
import EStyleSheet from 'react-native-extended-stylesheet';

export function UpDownDeleteButtonColumn({upPressHandler, deletePressHandler, downPressHandler}) {
    return (
        <View>
            <Touchable 
                style={styles.ButtonRadius}
                foreground={Touchable.Ripple('white')}
                onPress={() => upPressHandler()}
            >
                <Icon style={styles.ButtonBackground} size={styles.IconConstants.width} name='arrow-up-bold' color={styles.IconConstants.color}/>
            </Touchable>
            <Touchable 
                style={styles.ButtonRadius}
                foreground={Touchable.Ripple('white')}
                onPress={() => deletePressHandler()}
            >
                <Icon style={styles.ButtonBackground} size={styles.IconConstants.width} name='close-circle-outline' color={styles.IconConstants.color}/>
            </Touchable>
            <Touchable 
                style={styles.ButtonRadius}
                foreground={Touchable.Ripple('white')}
                onPress={() => downPressHandler()}
            >
                <Icon style={styles.ButtonBackground} size={styles.IconConstants.width} name='arrow-down-bold' color={styles.IconConstants.color}/>
            </Touchable>
        </View>
    );
}

const styles = EStyleSheet.create({
    ButtonRadius:{
        borderRadius: '10rem',
        margin: '3rem',
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