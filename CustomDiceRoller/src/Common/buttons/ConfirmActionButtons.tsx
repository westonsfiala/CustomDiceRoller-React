
import React from 'react';

import {
    View,
    Text,
    Pressable,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

interface ConfirmActionInterface {
    show : boolean;
    displayText : string;
    cancel : () => void;
    confirm : () => void;
}

export function ConfirmActionButtons(props : ConfirmActionInterface) {
    if(!props.show) return null;

    return (
        <View style={styles.TopContainer}>
            <Text style={styles.DisplayText}>{props.displayText}</Text>
            <View style={styles.ModalButtonLine}>
                <View style={styles.ModalButtonContainer}>
                    <View style={styles.ModalButton}>
                        <Pressable 
                            style={styles.ModalButtonInside}
                            android_ripple={{color:'white', borderless:false}}
                            hitSlop={styles.HitSlop}
                            onPress={() => props.cancel()}
                        >
                            <Text style={styles.ModalText}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.ModalButtonContainer}>
                    <View style={styles.ModalButton}>
                        <Pressable 
                            style={styles.ModalButtonInside}
                            android_ripple={{color:'white', borderless:false}}
                            hitSlop={styles.HitSlop}
                            onPress={() => props.confirm()}
                        >
                            <Text style={styles.ModalText}>Confirm</Text>
                        </Pressable>
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
        backgroundColor: '$primaryColorLightened',
        borderRadius: '10rem',
        overflow:'hidden'
    },
    ModalButtonInside:{
        padding:'5rem',
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
                