
import React from 'react'
    
import Modal, { 
    ModalContent, 
    ScaleAnimation,
} from 'react-native-modals';

import EStyleSheet from 'react-native-extended-stylesheet';
import { MenuProvider, Menu } from 'react-native-popup-menu';

interface ModalDialogInterface {
    modalShown : boolean;
    dismissModal : () => void;
    width? : number;
    height? : number;
    extraStyle? : any;
    children : any;
}

export function ModalDialogBase(props : ModalDialogInterface) {

    return(
    <Modal 
        onTouchOutside={() => props.dismissModal()} 
        visible={props.modalShown}
        modalAnimation={new ScaleAnimation()}
        onDismiss={() => props.dismissModal()}
        width={props.width || 0.75}
        height={props.height}
    >
        <ModalContent style={[styles.ModalContainer, props.extraStyle]}>
            {props.children}
        </ModalContent>
    </Modal>
    )
}

const styles = EStyleSheet.create({
    ModalContainer:{
        backgroundColor:'$primaryColor',
    },
})
