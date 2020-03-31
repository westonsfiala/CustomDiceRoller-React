
import React from 'react'
    
import Modal from 'react-native-modal';
import EStyleSheet from 'react-native-extended-stylesheet';

import { View, KeyboardAvoidingView } from 'react-native';

interface ModalDialogInterface {
    modalShown : boolean;
    dismissModal : () => void;
    extraStyle? : any;
    children : any;
}

export function ModalDialogBase(props : ModalDialogInterface) {

    return(
        <Modal
            isVisible={props.modalShown}
            animationIn={'fadeInLeft'}
            animationOut={'fadeOutRight'}
            useNativeDriver={true}
            hideModalContentWhileAnimating={true}
            onBackdropPress={() => props.dismissModal()} 
            onBackButtonPress={() => props.dismissModal()}
        >
            <KeyboardAvoidingView behavior={"padding"} keyboardVerticalOffset={styles.KeyboardConstants.height}>
                <View style={[styles.ModalContainer, props.extraStyle]}>
                    {props.children}
                </View>
            </KeyboardAvoidingView>
        </Modal>
    )
}

const styles = EStyleSheet.create({
    ModalContainer:{
        backgroundColor:'$primaryColor',
        padding:'10rem',
        borderRadius: '10rem',
    },
    KeyboardConstants:{
        height:'50rem',
    }
})
