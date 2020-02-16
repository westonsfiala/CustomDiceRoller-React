
import React from 'react';

import {
    View,
    Text,
} from 'react-native';

import Touchable from 'react-native-platform-touchable';
import EStyleSheet from 'react-native-extended-stylesheet';
import { HorizontalDivider } from './HorizontalDivider';

interface ConfirmActionInterface {
    show : boolean;
    displayText : string;
    cancel : () => void;
    confirm : () => void;
}

export function ConfirmActionButtons(props : ConfirmActionInterface) {
    if(!props.show) return null;

    return (
        <View>
            <HorizontalDivider/>
            <View style={styles.TopContainer}>
                <Text style={styles.DisplayText}>{props.displayText}</Text>
                <View style={styles.ModalButtonLine}>
                    <View style={styles.ModalButtonContainer}>
                        <Touchable 
                        style={styles.ModalButton}
                        hitSlop={styles.HitSlop}
                        foreground={Touchable.Ripple('white', true)}
                        onPress={() => props.cancel()}
                        >
                            <Text style={styles.ModalText}>Cancel</Text>
                        </Touchable>
                    </View>
                    <View style={styles.ModalButtonContainer}>
                        <Touchable 
                        style={styles.ModalButton}
                        hitSlop={styles.HitSlop}
                        foreground={Touchable.Ripple('white', true)}
                        onPress={() => props.confirm()}
                        >
                            <Text style={styles.ModalText}>Confirm</Text>
                        </Touchable>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = EStyleSheet.create({
    TopContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    ModalButtonLine:{
        flexDirection:'row',
        justifyContent:'flex-end',
    },
    ModalButtonContainer:{
        paddingLeft:'10rem',
    },
    ModalButton:{
        padding:'5rem',
        backgroundColor: '$primaryColorLightened',
        borderRadius: '10rem',
        overflow:'hidden'
    },
    DisplayText:{
        fontSize:'$fontSizeNormal',
        color:'$textColor',
        alignSelf:'center',
    },
    ModalText:{
        fontSize:'$fontSizeNormal',
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
                