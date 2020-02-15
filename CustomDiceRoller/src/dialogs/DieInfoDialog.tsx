import { ModalDialogBase } from "./ModalDialogBase";

import React, { useState } from 'react';

import {
    View,
    Text,
    LayoutAnimation,
} from 'react-native';

import Touchable from 'react-native-platform-touchable';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Die } from "../dice/Die";
import { ConfirmActionButtons } from "../helpers/ConfirmActionButtons";
import { CreateDieHelper } from "../helpers/CreateDieHelper";

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

    return(
        <ModalDialogBase modalShown={props.modalShown} dismissModal={dismissNice}>
            <View>
                <Text style={styles.ModalName}>
                    Die info - {props.die.mDieName}
                </Text>
                <Text style={styles.ModalDetailText}>
                    Rolls a number between {props.die.min} and {props.die.max}
                </Text>
                <Text style={styles.ModalDetailText}>
                    Average of {props.die.average}
                </Text>
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
                <CreateDieHelper 
                    show={editDieShow}
                    die={props.die}
                    createDie={(newDie : Die) => {
                        props.editDie(newDie);
                        dismissNice();

                    }}
                    cancel={() => setEditDieNice(false)}
                />
                <ConfirmActionButtons
                    show={removeConfirmShow}
                    displayText={"Remove?"}
                    confirm={() => {
                        props.removeDie()
                        dismissNice();
                    }}
                    cancel={() => setRemoveConfirmNice(false)}
                />
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
        justifyContent:'space-between',
        paddingTop:'10rem',
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