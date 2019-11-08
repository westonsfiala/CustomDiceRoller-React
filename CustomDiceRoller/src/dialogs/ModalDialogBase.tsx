
import React from 'react'
    
import Modal, { 
    ModalContent, 
    ScaleAnimation,
} from 'react-native-modals';

import EStyleSheet from 'react-native-extended-stylesheet';

export function ModalDialogBase({modalShown, dismissModal, width = null, height = null, content, extraStyle = {}}) {
    return(
    <Modal 
        onTouchOutside={() => dismissModal()} 
        visible={modalShown}
        modalAnimation={new ScaleAnimation()}
        onDismiss={() => dismissModal()}
        width={width}
        height={height}
    >
        <ModalContent style={[styles.ModalContainer, extraStyle]}>
            {content}
        </ModalContent>
    </Modal>
    )
}

const styles = EStyleSheet.create({
    ModalContainer:{
        backgroundColor:'$primaryColor',
    },
})
