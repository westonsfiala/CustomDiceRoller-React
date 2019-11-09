
import React, { useState } from 'react';

import 
{
    View,
    Text,
    Image,
} from 'react-native'

import Touchable from 'react-native-platform-touchable';
import EStyleSheet from 'react-native-extended-stylesheet';

import { getRequiredImage } from './DieImageGetter';
import { Die } from './Die';
import { SimpleDie } from './SimpleDie';
import { DieInfoDialog } from '../dialogs/DieInfoDialog';
import { CreateSimpleDieDialog } from '../dialogs/CreateSimpleDieDialog';

export function DieView({die = new SimpleDie("temp", -1) as Die, size, pressDieCallback, removeDieCallback, editDieCallback}) {
    
    const [modalShown, setModalShown] = useState(false);
    const [editModalShown, setEditModalShown] = useState(false);

    function handleBeginEdit() {
        setEditModalShown(true);
        setModalShown(false);
    }

    function handleEndEdit(editDie : Die) {
        editDieCallback(die, editDie);
        setEditModalShown(false);
    }

    return(
        <View style={{width:size}} >
            <Touchable 
            background={Touchable.Ripple('white')} 
            onPress={() => {pressDieCallback(die)}}
            delayLongPress={300}
            onLongPress={() => setModalShown(true)}
            >
                <View style={styles.Touch}>
                    <Image source={getRequiredImage(die.imageID)} style={{width:size-2, height:size-2}}/>
                    <Text numberOfLines={3} style={[styles.Text, {fontSize:size/4}]}>{die.mDieName}</Text>
                </View>
            </Touchable>
            <DieInfoDialog modalShown={modalShown} die={die} dismissModal={() => setModalShown(false)} removeDie={removeDieCallback} editDie={handleBeginEdit}/>
            <CreateSimpleDieDialog modalShown={editModalShown} die={die} dismissModal={() => setEditModalShown(false)} createDie={handleEndEdit}/>
        </View>
    );
};

const styles = EStyleSheet.create({
    Touch:{
        flexDirection:'column', 
        alignItems:'center', 
        padding:'2rem'
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