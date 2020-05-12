import React from 'react';

import {
    View,
    Text,
    FlatList,
    Linking,
    Platform,
} from 'react-native';

import Touchable from 'react-native-platform-touchable';
import EStyleSheet from 'react-native-extended-stylesheet';

import { ModalDialogBase } from "../../Common/dialogs/ModalDialogBase";
import { openRatePage } from '../../Common/utility/FunctionHelper';

interface RateMeDialogInterface {
    modalShown : boolean;
    dismissModal : () => void;
}

export function RateMeDialog(props : RateMeDialogInterface) {

    return(
        <ModalDialogBase modalShown={props.modalShown} dismissModal={props.dismissModal}>
            <View>
                <Text style={styles.ModalName}>
                    Rate Me
                </Text>
                <Text style={styles.ModalDetailText}>
                    If you are enjoying the app, please leave a review!
                </Text>
                <View style={styles.ModalButtonLine}>
                <View style={styles.ModalButtonContainer}>
                    <Touchable 
                    style={styles.ModalButton}
                    hitSlop={styles.HitSlop}
                    foreground={Touchable.Ripple('white', true)}
                    onPress={() => props.dismissModal()}
                    >
                        <Text style={styles.ModalText}>Dismiss</Text>
                    </Touchable>
                </View>
                <View style={styles.ModalButtonContainer}>
                    <Touchable 
                    style={styles.ModalButton}
                    hitSlop={styles.HitSlop}
                    foreground={Touchable.Ripple('white', true)}
                    onPress={openRatePage}
                    >
                        <Text style={styles.ModalText}>Rate</Text>
                    </Touchable>
                </View>
            </View>
            </View>
        </ModalDialogBase>
    );
}

const styles = EStyleSheet.create({
    ModalName:{
        fontSize:'$fontSizeHuge',
        color:'$textColor',
    },
    ModalDetailText: {
        fontSize:'$fontSizeNormal',
        color:'$textColor',
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