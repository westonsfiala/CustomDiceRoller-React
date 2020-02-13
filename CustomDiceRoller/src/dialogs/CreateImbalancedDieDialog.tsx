import { ModalDialogBase } from "./ModalDialogBase";

import React, { useState, useEffect, useRef } from 'react';

import {
    View,
    Text,
    TextInput,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color';
import { ImbalancedDie } from "../dice/ImbalancedDie";
import { concatterNoSpace } from "../helpers/StringHelper";
import { OkCancelButtons } from "../helpers/OkCancelButtons";

interface ImbalancedInterface {
    modalShown : boolean;
    die : ImbalancedDie;
    dismissModal : () => void;
    createDie : (die: ImbalancedDie) => void;
}

export function CreateImbalancedDieDialog(props : ImbalancedInterface) {

    const [dieName, setDieName] = useState('');
    const [facesString, setFacesString] = useState('');

    const firstLineRef = useRef(null);
    const secondLineRef = useRef(null);

    useEffect(() => {
        // If the name is the default, let the placeholder text show.
        let defaultFacesString = props.die.mFaces.reduce(concatterNoSpace, '');
        if(props.die.displayName === ImbalancedDie.tempName(defaultFacesString)) {
            setDieName('');
        } else {
            setDieName(props.die.displayName);
        }
        setFacesString(defaultFacesString);
    }, [props.die])

    function acceptHandler() {
        if(facesString == undefined) return;
        let numberStrings = facesString.split(',');
        let newFaces = new Array<number>();

        for(let numString of numberStrings) {
            let possibleNumber = Number.parseInt(numString);

            if(Number.isSafeInteger(possibleNumber)) {
                newFaces.push(possibleNumber);
            } else {
                props.dismissModal();
                return;
            }
        }

        props.createDie(new ImbalancedDie(dieName, newFaces));
        props.dismissModal();
    }

    return(
        <ModalDialogBase modalShown={props.modalShown} dismissModal={props.dismissModal}>
            <View>
                <Text style={styles.ModalTitle}>Create Imbalanced Die</Text>
                <Text style={styles.ModalSubTitle}>Use a comma separated list</Text>
                <View style={styles.ModalTextInputLine}>
                    <Text style={styles.ModalText}>Faces</Text>
                    <TextInput 
                    style={styles.ModalInputText}
                    ref={firstLineRef}
                    autoFocus={true}
                    selectTextOnFocus={true}
                    defaultValue={facesString}
                    keyboardType={'number-pad'}
                    onChangeText={(text) => setFacesString(text)}
                    returnKeyType = { "next" }
                    onSubmitEditing={() => { secondLineRef.current.focus(); }}
                    blurOnSubmit={false}
                    />
                </View>
                <View style={styles.ModalTextInputLine}>
                    <Text style={styles.ModalText}>Name</Text>
                    <TextInput 
                    style={styles.ModalInputText}
                    ref={secondLineRef}
                    selectTextOnFocus={true}
                    defaultValue={dieName}
                    placeholder={ImbalancedDie.tempName(facesString)}
                    placeholderTextColor={styles.PlaceholderText.color}
                    onChangeText={(text) => setDieName(text)}
                    returnKeyType = { "done" }
                    onSubmitEditing={() => { acceptHandler(); }}
                    blurOnSubmit={false}
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
    ModalSubTitle:{
        fontSize:'16rem',
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