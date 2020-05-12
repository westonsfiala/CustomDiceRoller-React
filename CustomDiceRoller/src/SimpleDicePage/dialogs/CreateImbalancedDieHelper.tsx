import React, { useState, useRef, useEffect } from 'react';

import {
    View,
    Text,
    TextInput,
    Platform,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color';

import { ImbalancedDie } from '../../Common/dice/ImbalancedDie';
import { OkCancelButtons } from '../../Common/buttons/OkCancelButtons';
import { concatterNoSpace } from '../../Common/utility/StringHelper';
import { VerticalSpace } from '../../Common/views/VerticalSpace';

interface CreateImbalancedDieInterface {
    die : ImbalancedDie;
    createDie : (die: ImbalancedDie) => void;
    cancel : () => void;
}

export function CreateImbalancedDieHelper(props : CreateImbalancedDieInterface) {

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
                props.cancel();
                return;
            }
        }

        props.createDie(new ImbalancedDie(dieName, newFaces));
        props.cancel();
    }

    return(
        <View>
            <Text style={styles.ModalText}>Use a comma separated list</Text>
            <View style={styles.ModalTextInputLine}>
                <Text style={styles.ModalText}>Faces</Text>
                <TextInput 
                style={styles.ModalInputText}
                ref={firstLineRef}
                autoFocus={true}
                selectTextOnFocus={true}
                defaultValue={facesString}
                keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'number-pad'}
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
            <VerticalSpace/>
            <OkCancelButtons accept={acceptHandler} dismiss={props.cancel}/>
        </View>
    );
}

const styles = EStyleSheet.create({
    ModalTextInputLine:{
        flexDirection:'row',
        alignItems:'center',
        paddingTop: Platform.OS === 'ios' ? '5rem' : 0,
        paddingBottom: Platform.OS === 'ios' ? '5rem' : 0,
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
    ModalText:{
        fontSize:'$fontSizeLarge',
        color:'$textColor',
    },
    ModalInputText:{
        flex:1,
        color:'$textColor',
        marginLeft:'8rem',
        fontSize:'$fontSizeLarge',
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