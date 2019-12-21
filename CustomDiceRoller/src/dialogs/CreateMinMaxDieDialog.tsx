import { ModalDialogBase } from "./ModalDialogBase";

import React, { useState, useEffect } from 'react';

import {
    View,
    Text,
    TextInput,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color';
import { MinMaxDie } from "../dice/MinMaxDie";
import { OkCancelButtons } from "../helpers/OkCancelButtons";

interface MinMaxInterface {
    modalShown : boolean;
    die : MinMaxDie;
    dismissModal : () => void;
    createDie : (die: MinMaxDie) => void;
}

export function CreateMinMaxDieDialog(props : MinMaxInterface) {

    const [dieName, setDieName] = useState('');
    const [minString, setMinString] = useState('');
    const [maxString, setMaxString] = useState('');
    
    useEffect(() => {
        // If the name is the default, let the placeholder text show.
        let minString = props.die.min.toString();
        let maxString = props.die.max.toString();
        if(props.die.displayName === MinMaxDie.tempName(minString, maxString)) {
            setDieName('');
        } else {
            setDieName(props.die.displayName);
        }
        setMinString(minString);
        setMaxString(maxString);
    }, [props.die])

    function acceptHandler() {
        let possibleMin = Number.parseInt(minString);
        let possibleMax = Number.parseInt(maxString);

        if(Number.isSafeInteger(possibleMin) && Number.isSafeInteger(possibleMax))
        {
            props.createDie(new MinMaxDie(dieName, possibleMin, possibleMax))
        }

        props.dismissModal();
    }

    return(
        <ModalDialogBase modalShown={props.modalShown} dismissModal={props.dismissModal} width={.75}>
            <View>
                <Text style={styles.ModalTitle}>Create Min Max Die</Text>
                <View style={styles.ModalTextInputLine}>
                    <Text style={styles.ModalText}>Name</Text>
                    <TextInput 
                    style={styles.ModalInputText}
                    defaultValue={dieName}
                    placeholder={MinMaxDie.tempName(minString, maxString)}
                    placeholderTextColor={styles.PlaceholderText.color}
                    onChangeText={(text) => setDieName(text)}
                    />
                </View>
                <View style={styles.ModalTextInputLine}>
                    <Text style={styles.ModalText}>Min</Text>
                    <TextInput 
                    style={styles.ModalInputText}
                    autoFocus={true}
                    selectTextOnFocus={true}
                    defaultValue={minString}
                    keyboardType={'number-pad'}
                    onChangeText={(text) => setMinString(text)}
                    />
                </View>
                <View style={styles.ModalTextInputLine}>
                    <Text style={styles.ModalText}>Max</Text>
                    <TextInput 
                    style={styles.ModalInputText}
                    selectTextOnFocus={true}
                    defaultValue={maxString}
                    keyboardType={'number-pad'}
                    onChangeText={(text) => setMaxString(text)}
                    />
                </View>
                <OkCancelButtons accept={acceptHandler} dismiss={props.dismissModal}/>
            </View>
        </ModalDialogBase>
    );
}

const styles = EStyleSheet.create({
    ModalTextInputLine:{
        flexDirection:'row',
        alignItems:'center'
    },
    ModalButtonLine:{
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    ModalButton:{
        paddingTop:'16rem',
        paddingLeft:'8rem',
        paddingRight:'8rem',
    },
    ModalTitle:{
        fontSize:'20rem',
        color:'$textColor',
    },
    ModalText:{
        fontSize:'16rem',
        color:'$textColor',
    },
    ModalInputText:{
        flex:1,
        color:'$textColor',
        marginLeft:'8rem',
        fontSize:'16rem',
        borderBottomWidth:'1rem',
        borderColor:Color.rgb(128,128,128).hex()
    },
    PlaceholderText:{
        color:Color.rgb(128,128,128).hex()
    },
    HitSlop: {
        top:'10rem',
        bottom:'10rem',
        right:'10rem',
        left:'10rem'
    }
})