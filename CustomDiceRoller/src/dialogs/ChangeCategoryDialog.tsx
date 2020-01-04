import { ModalDialogBase } from "./ModalDialogBase";

import React from 'react';

import {
    View,
    Text,
    FlatList,
} from 'react-native';

import Touchable from 'react-native-platform-touchable';
import EStyleSheet from 'react-native-extended-stylesheet';
import RollManager from "../sync/RollManager";

interface ChangeCategoryDialogInterface {
    modalShown : boolean;
    dismissModal : () => void;
    chooseCategory : (category: string) => void;
}

export function ChangeCategoryDialog(props : ChangeCategoryDialogInterface) {

    let dice = RollManager.getInstance().getPossibleCategories();
    // If you don't give a height to the menu, the scroll feature doesn't work. 
    // There is a small gap between each item, so the 1.2 is for making it fit a bit better
    let displayItems = Math.min(6, dice.length)
    let menuHeight = displayItems * styles.MenuConstants.height;

    return(
        <ModalDialogBase modalShown={props.modalShown} dismissModal={props.dismissModal} width={.75}>
            <View>
                <Text style={styles.ModalName}>
                    Select Catagory
                </Text>
                <FlatList 
                    style={{height:menuHeight}}
                    data={RollManager.getInstance().getPossibleCategories()}
                    renderItem={({ item }) =>  (
                        <View style={styles.SelectCategoryButton}>
                            <Touchable 
                            style={styles.ModalButton}
                            onPress={() => {
                                props.dismissModal();
                                props.chooseCategory(item);
                            }}
                            foreground={Touchable.Ripple('white', true)}
                            hitSlop={styles.HitSlop}
                            >
                                <Text style={styles.ButtonText}>{item}</Text>
                            </Touchable>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={styles.ModalButtonContainer}>
                    <View style={styles.CancelButtonContainer}>
                        <View style={styles.ModalButtonPadding}>
                            <Touchable 
                            style={styles.ModalButton}
                            onPress={() => props.dismissModal()}
                            foreground={Touchable.Ripple('white', true)}
                            hitSlop={styles.HitSlop}
                            >
                                <Text style={styles.ButtonText}>Cancel</Text>
                            </Touchable>
                        </View>
                    </View>
                </View>
            </View>
        </ModalDialogBase>
    );
}

const styles = EStyleSheet.create({
    ModalName:{
        fontSize:'24rem',
        color:'$textColor',
    },
    ModalDetailText: {
        fontSize:'16rem',
        color:'$textColor',
    },
    ButtonText: {
        fontSize:'16rem',
        paddingLeft:'5rem',
        paddingRight:'5rem',
        color:'$textColor',
    },
    ModalButtonContainer:{
        flexDirection:'row',
        justifyContent:'flex-end',
        paddingTop:'10rem',
    },
    CancelButtonContainer:{
        flexDirection:'row',
    },
    ModalButton:{
        padding:'5rem',
        backgroundColor: '$primaryColorLightened',
        borderRadius: '10rem',
        overflow:'hidden'
    },
    ModalButtonPadding:{
        paddingLeft:'10rem',
    },
    SelectCategoryButton:{
        padding:'5rem',
    },
    MenuConstants:{
        height:'40rem',
    },
    HitSlop: {
        top:'5rem',
        bottom:'5rem',
        right:'5rem',
        left:'5rem'
    }
})