import { ModalDialogBase } from "./ModalDialogBase";

import React, { useState } from 'react';

import {
    View,
    Text,
    FlatList,
    LayoutAnimation,
} from 'react-native';

import Touchable from 'react-native-platform-touchable';
import EStyleSheet from 'react-native-extended-stylesheet';
import RollManager from "../sync/RollManager";
import { Roll } from "../dice/Roll";
import { ConfirmActionButtons } from "../helpers/ConfirmActionButtons";
import { HorizontalDivider } from "../helpers/HorizontalDivider";

interface ChangeCategoryDialogInterface {
    modalShown : boolean;
    roll : Roll;
    dismissModal : () => void;
}

export function ChangeCategoryDialog(props : ChangeCategoryDialogInterface) {

    const [showOverride, setShowOverride] = useState(false);
    const [possibleCategory, setPossibleCategory] = useState('');

    function setShowOverrideNice(show: boolean) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShowOverride(show);
    }

    function dismissNice() {
        setShowOverrideNice(false);
        props.dismissModal();
    }

    let categories = RollManager.getInstance().getPossibleCategories();
    // If you don't give a height to the menu, the scroll feature doesn't work. 
    // There is a small gap between each item, so the 1.2 is for making it fit a bit better
    let displayItems = Math.min(6, categories.length)
    let menuHeight = displayItems * styles.MenuConstants.height;

    function handleCategoryChange(category: string, force: boolean) {
        let newRoll = props.roll.setNameCategory(props.roll.mRollName, category);
        if(!RollManager.getInstance().editRoll(props.roll, newRoll, force)) {
            setPossibleCategory(category);
            if(force) {
                dismissNice();
            } else {
                setShowOverrideNice(true);
            }
        } else {
            dismissNice();
        }
    }

    function getBottom() {
        if(showOverride) {
            return (
                <ConfirmActionButtons 
                    show={showOverride} 
                    displayText={'Override?'}
                    confirm={() => handleCategoryChange(possibleCategory, true)} 
                    cancel={() => setShowOverrideNice(false)}
                />
            );
        } else {
            return (
                <View style={styles.ModalButtonContainer}>
                    <View style={styles.CancelButtonContainer}>
                        <View style={styles.ModalButtonPadding}>
                            <Touchable 
                            style={styles.ModalButton}
                            onPress={dismissNice}
                            foreground={Touchable.Ripple('white', true)}
                            hitSlop={styles.HitSlop}
                            >
                                <Text style={styles.ButtonText}>Cancel</Text>
                            </Touchable>
                        </View>
                    </View>
                </View>
            )
        }
    }

    return(
        <ModalDialogBase modalShown={props.modalShown} dismissModal={dismissNice}>
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
                                handleCategoryChange(item, false);
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
            </View>
            <HorizontalDivider/>
            {getBottom()}
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
    ButtonText: {
        fontSize:'$fontSizeNormal',
        paddingLeft:'5rem',
        paddingRight:'5rem',
        color:'$textColor',
    },
    ModalButtonContainer:{
        flexDirection:'row',
        justifyContent:'flex-end',
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