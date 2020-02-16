import { ModalDialogBase } from "./ModalDialogBase";

import React from 'react';

import {
    View,
    Text,
    FlatList,
} from 'react-native';

import Touchable from 'react-native-platform-touchable';
import EStyleSheet from 'react-native-extended-stylesheet';
import LegacyMigrationManager from "../sync/LegacyMigrationManager";

interface MigrateRollsInterface {
    modalShown : boolean;
    dismissModal : () => void;
}

export function MigrateRollsDialog(props : MigrateRollsInterface) {

    return(
        <ModalDialogBase modalShown={props.modalShown} dismissModal={props.dismissModal}>
            <View>
                <Text style={styles.ModalName}>
                    Legacy Roll Migration
                </Text>
                <Text style={styles.ModalDetailText}>
                    Imported Rolls:
                </Text>
                <FlatList 
                    data={LegacyMigrationManager.getInstance().getMigratedRolls()}
                    style={styles.ScrollArea}
                    ListEmptyComponent={<Text style={styles.ModalSubDetailText}>None</Text>}
                    renderItem={({item}) => {
                        return <Text style={styles.ModalSubDetailText}>{item.mRollCategory}/{item.mRollName}</Text>
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
                <Text style={styles.ModalDetailText}>
                    Errors:
                </Text>
                <FlatList 
                    data={LegacyMigrationManager.getInstance().getMigrationErrors()}
                    style={styles.ScrollArea}
                    ListEmptyComponent={<Text style={styles.ModalSubDetailText}>None</Text>}
                    renderItem={({item}) => {
                        return <Text style={styles.ModalSubDetailText}>{item}</Text>
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
                <Touchable 
                    style={styles.ModalButton}
                    onPress={() => props.dismissModal()}
                    foreground={Touchable.Ripple('white', true)}
                    hitSlop={styles.HitSlop}
                >
                    <Text style={styles.ButtonText}>OK</Text>
                </Touchable>
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
    ModalSubDetailText: {
        fontSize:'$fontSizeNormal',
        color:'$textColorDarkened',
    },
    ScrollArea: {
        height:'75rem',
    },
    ButtonText: {
        fontSize:'$fontSizeNormal',
        textAlign:'center',
        paddingLeft:'5rem',
        paddingRight:'5rem',
        color:'$textColor',
    },
    ModalButton:{
        padding:'5rem',
        backgroundColor: '$primaryColorLightened',
        borderRadius: '10rem',
        marginTop:'10rem',
        overflow:'hidden',
    },
    HitSlop: {
        top:'5rem',
        bottom:'5rem',
        right:'5rem',
        left:'5rem'
    }
})