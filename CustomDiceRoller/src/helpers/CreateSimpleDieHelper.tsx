
import React, { useState, useRef, useEffect } from 'react';

import {
    View,
    Text,
    TextInput,
    Platform,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color';
import { SimpleDie } from '../dice/SimpleDie';
import { OkCancelButtons } from './OkCancelButtons';

interface CreateSimpleDieInterface {
    die : SimpleDie;
    createDie : (die: SimpleDie) => void;
    cancel : () => void;
}

export function CreateSimpleDieHelper(props : CreateSimpleDieInterface) {

    const [dieName, setDieName] = useState('')
    const [dieNumberString, setDieNumberString] = useState('')

    const firstLineRef = useRef(null);
    const secondLineRef = useRef(null);

    useEffect(() => {
        // If the name is the default, let the placeholder text show.
        let defaultDieString = props.die.mDie.toString();
        if(props.die.displayName === SimpleDie.tempName(defaultDieString)) {
            setDieName('');
        } else {
            setDieName(props.die.displayName);
        }
        setDieNumberString(defaultDieString);
    }, [props.die])

    function acceptHandler() {
        let possibleNumber = Number.parseInt(dieNumberString)
        if(Number.isSafeInteger(possibleNumber) && possibleNumber > 0)
        {
            props.createDie(new SimpleDie(dieName, possibleNumber));
        }
        props.cancel();
    }

    return(
        <View>
            <View style={styles.ModalTextInputLine}>
                <Text style={styles.ModalText}>Die</Text>
                <TextInput 
                    style={styles.ModalInputText}
                    ref={firstLineRef}
                    autoFocus={true}
                    selectTextOnFocus={true}
                    defaultValue={dieNumberString}
                    keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'number-pad'}
                    onChangeText={(text) => setDieNumberString(text)}
                    returnKeyType = { 'next' }
                    onSubmitEditing={() => { secondLineRef.current.focus(); }}
                    blurOnSubmit={false}
                />
            </View>
            <View style={styles.ModalTextInputLine}>
                <Text style={styles.ModalText}>Name</Text>
                <TextInput 
                    style={styles.ModalInputText}
                    ref={secondLineRef}
                    defaultValue={dieName}
                    placeholder={SimpleDie.tempName(dieNumberString)}
                    placeholderTextColor={styles.PlaceholderText.color}
                    onChangeText={(text) => setDieName(text)}
                    returnKeyType = { 'done' }
                    onSubmitEditing={acceptHandler}
                    blurOnSubmit={false}
                />
            </View>
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
        fontSize:'20rem',
        color:'$textColor',
    },
    ModalInputText:{
        flex:1,
        color:'$textColor',
        marginLeft:'8rem',
        fontSize:'20rem',
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
                