
import React, { useState } from 'react';

import 
{
    View,
    Text,
    Image,
} from 'react-native'

import Modal, { 
    ModalContent, 
    ScaleAnimation,
} from 'react-native-modals';

import Touchable from 'react-native-platform-touchable';
import EStyleSheet from 'react-native-extended-stylesheet';

import { getRequiredImage } from './DieImageGetter';
import { SimpleDie } from './SimpleDie';

export function SimpleDieView({die = new SimpleDie("temp", -1), size, pressCallback}) {
    const [modalShown, setModalShown] = useState(false);

    return(
        <View style={{width:size}} >
            <Touchable 
            background={Touchable.Ripple('white')} 
            onPress={() => {pressCallback()}}
            onLongPress={() => setModalShown(true)}
            >
                <View style={styles.Touch}>
                    <Image source={getRequiredImage(die.imageID)} style={{width:size-2, height:size-2}}/>
                    <Text numberOfLines={3} style={[styles.Text, {fontSize:size/4}]}>{die.mDieName}</Text>
                </View>
            </Touchable>
            <Modal 
            visible={modalShown}
            onTouchOutside={() => setModalShown(false)} 
            modalAnimation={new ScaleAnimation()}
            onDismiss={() => setModalShown(false)}
            >
                <ModalContent style={styles.ModalContainer}>
                    <View>
                        <Text style={styles.ModalName}>
                            Die info - {die.mDieName}
                        </Text>
                        <Text style={styles.ModalDetailText}>
                            Rolls a number between {die.min} and {die.max}
                        </Text>
                        <Text style={styles.ModalDetailText}>
                            Average of {die.average}
                        </Text>
                        <View style={styles.ModalButtonContainer}>
                            <View>
                                <Touchable hitSlop={styles.HitSlop}>
                                    <Text style={styles.EditButtonText}>Edit</Text>
                                </Touchable>
                            </View>
                            <View style={styles.RemoveOKButtonContainer}>
                                <Touchable hitSlop={styles.HitSlop}>
                                    <Text style={styles.RemoveOKButtonText}>Remove</Text>
                                </Touchable>
                                <Touchable hitSlop={styles.HitSlop}>
                                    <Text style={styles.RemoveOKButtonText}>OK</Text>
                                </Touchable>
                            </View>
                        </View>
                    </View>
                </ModalContent>
            </Modal>
        </View>
    );
};

const styles = EStyleSheet.create({
    Touch:{
        flexDirection:'column', 
        alignItems:'center', 
        padding:2
    },
    Text:{
        color:'$textColor'
    },
    ModalContainer:{
        backgroundColor:'$primaryColor',
    },
    ModalName:{
        fontSize:'24rem',
        color:'$textColor',
    },
    ModalDetailText: {
        fontSize:'16rem',
        color:'$textColor',
    },
    EditButtonText: {
        fontSize:'16rem',
        color:'$textColor',
    },
    RemoveOKButtonText: {
        fontSize:'16rem',
        paddingLeft:'4rem',
        paddingRight:'4rem',
        color:'$textColor',
    },
    ModalButtonContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingTop:'4rem'
    },
    RemoveOKButtonContainer:{
        flexDirection:'row',
    },
    HitSlop: {
        top:'10rem',
        bottom:'10rem',
        right:'10rem',
        left:'10rem'
    }
})