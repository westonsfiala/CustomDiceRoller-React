import { ModalDialogBase } from "../../Common/dialogs/ModalDialogBase";

import React, { useState } from 'react';

import {
    View,
    Text,
    LayoutAnimation,
} from 'react-native';

import Touchable from 'react-native-platform-touchable';
import EStyleSheet from 'react-native-extended-stylesheet';

import { Die } from "../../Common/dice/Die";
import { ConfirmActionButtons } from "../../Common/buttons/ConfirmActionButtons";
import { HorizontalDivider } from "../../Common/views/HorizontalDivider";

import { CreateDieHelper } from "./CreateDieHelper";

interface DieInfoDialogInterface {
    modalShown : boolean;
    die : Die;
    dismissModal : () => void;
    removeDie : () => void;
    editDie : (editDie: Die) => void;
}

export function DieInfoDialog(props : DieInfoDialogInterface) {

    const [removeConfirmShow, setRemoveConfirmShow] = useState(false);
    const [editDieShow, setEditDieShow] = useState(false);

    function setRemoveConfirmNice(show: boolean) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setEditDieShow(false);
        setRemoveConfirmShow(show);
    }

    function setEditDieNice(edit: boolean) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setRemoveConfirmShow(false);
        setEditDieShow(edit);
    }

    function dismissNice() {
        setRemoveConfirmNice(false);
        props.dismissModal();
    }

    function getBottomLine() {
        if(removeConfirmShow) {
            return (
                <ConfirmActionButtons
                    show={removeConfirmShow}
                    displayText={"Remove?"}
                    confirm={() => {
                        props.removeDie()
                        dismissNice();
                    }}
                    cancel={() => setRemoveConfirmNice(false)}
                />
            )
        } else if(editDieShow) {
            return (
                <CreateDieHelper 
                    show={editDieShow}
                    die={props.die}
                    createDie={(newDie : Die) => {
                        props.editDie(newDie);
                        dismissNice();

                    }}
                    cancel={() => setEditDieNice(false)}
                />
            )
        }

        return (
            <View style={styles.ModalButtonContainer}>
                <View>
                    <Touchable 
                    style={styles.ModalButton}
                    onPress={() => {
                        setEditDieNice(true);
                    }}
                    foreground={Touchable.Ripple('white', true)}
                    hitSlop={styles.HitSlop}
                    >
                        <Text style={styles.ButtonText}>Edit</Text>
                    </Touchable>
                </View>
                <View style={styles.RemoveOKButtonContainer}>
                    <View style={styles.ModalButtonPadding}>
                        <Touchable 
                        style={styles.ModalButton}
                        onPress={() => {
                            setRemoveConfirmNice(true);
                        }}
                        foreground={Touchable.Ripple('white', true)}
                        hitSlop={styles.HitSlop}
                        >
                            <Text style={styles.ButtonText}>Remove</Text>
                        </Touchable>
                    </View>
                    
                    <View style={styles.ModalButtonPadding}>
                        <Touchable 
                        style={styles.ModalButton}
                        onPress={dismissNice}
                        foreground={Touchable.Ripple('white', true)}
                        hitSlop={styles.HitSlop}
                        >
                            <Text style={styles.ButtonText}>OK</Text>
                        </Touchable>
                    </View>
                </View>
            </View>
        )
    }

    return(
        <ModalDialogBase modalShown={props.modalShown} dismissModal={dismissNice}>
            <View>
                <Text style={styles.ModalName}>
                    Die info - {props.die.mDieName}
                </Text>
                <Text style={styles.ModalDetailText}>
                    {props.die.info}
                </Text>
                <HorizontalDivider/>
                {getBottomLine()}
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
    ButtonText: {
        fontSize:'$fontSizeNormal',
        paddingLeft:'5rem',
        paddingRight:'5rem',
        color:'$textColor',
    },
    ModalButtonContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    RemoveOKButtonContainer:{
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
    HitSlop: {
        top:'5rem',
        bottom:'5rem',
        right:'5rem',
        left:'5rem'
    }
})