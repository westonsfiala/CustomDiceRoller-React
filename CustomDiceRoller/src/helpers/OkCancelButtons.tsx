
import React from 'react';

import {
    View,
    Text,
} from 'react-native';

import Touchable from 'react-native-platform-touchable';
import EStyleSheet from 'react-native-extended-stylesheet';

interface OkCancelInterface {
    dismiss : () => void;
    accept : () => void;
}

export function OkCancelButtons(props : OkCancelInterface) {
    return (
        <View style={styles.ModalButtonLine}>

            <View style={styles.ModalButtonContainer}>
                <Touchable 
                style={styles.ModalButton}
                hitSlop={styles.HitSlop}
                foreground={Touchable.Ripple('white', true)}
                onPress={() => props.dismiss()}
                >
                    <Text style={styles.ModalText}>Cancel</Text>
                </Touchable>
            </View>
            <View style={styles.ModalButtonContainer}>
                <Touchable 
                style={styles.ModalButton}
                hitSlop={styles.HitSlop}
                foreground={Touchable.Ripple('white', true)}
                onPress={() => props.accept()}
                >
                    <Text style={styles.ModalText}>OK</Text>
                </Touchable>
            </View>
        </View>
    )
}

const styles = EStyleSheet.create({
    ModalButtonLine:{
        flexDirection:'row',
        justifyContent:'flex-end',
        paddingTop:'10rem'
    },
    ModalButtonContainer:{
        paddingTop:'10rem',
        paddingLeft:'10rem',
    },
    ModalButton:{
        padding:'5rem',
        backgroundColor: '$primaryColorLightened',
        borderRadius: '10rem',
        overflow:'hidden'
    },
    ModalText:{
        fontSize:'16rem',
        paddingLeft:'8rem',
        paddingRight:'8rem',
        color:'$textColor',
    },
    HitSlop: {
        top:'5rem',
        bottom:'5rem',
        right:'5rem',
        left:'5rem'
    }
})
                