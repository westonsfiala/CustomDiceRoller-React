import React, { useState, useRef, useEffect } from 'react';

import {
    View,
    Text,
    TextInput,
    Platform,
    FlatList,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color';

import { WordDie } from '../../Common/dice/WordDie';
import { OkCancelButtons } from '../../Common/buttons/OkCancelButtons';
import { VerticalSpace } from '../../Common/views/VerticalSpace';
import Touchable from 'react-native-platform-touchable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface CreateWordDieInterface {
    die : WordDie;
    createDie : (die: WordDie) => void;
    cancel : () => void;
}

export function CreateWordDieHelper(props : CreateWordDieInterface) {

    const [dieName, setDieName] = useState('');
    const [facesArray, setFacesArray] = useState(Array<string>());

    const secondLineRef = useRef(null);

    useEffect(() => {
        // If the name is the default, let the placeholder text show.
        if(props.die.displayName === WordDie.tempName(props.die.mFaces)) {
            setDieName('');
        } else {
            setDieName(props.die.displayName);
        }

        setFacesArray(props.die.mFaces);
    }, [props.die])

    function acceptHandler() {
        if(facesArray == undefined || facesArray.length == 0) return;
        let newFaces = new Array<string>();

        for(let faceString of facesArray) {
            if(faceString !== '') {
                newFaces.push(faceString);
            } else {
                props.cancel();
                return;
            }
        }

        props.createDie(new WordDie(dieName, newFaces));
        props.cancel();
    }

    function addFace() {
        let newFacesArray  = Object.assign(Array<string>(), facesArray);
        newFacesArray.push(String.fromCharCode('a'.charCodeAt(0) + newFacesArray.length).toString());
        setFacesArray(newFacesArray);
    }

    function setFaceString(text: string, index: number) {
        let newFacesArray  = Object.assign(Array<string>(), facesArray);
        newFacesArray[index] = text;
        setFacesArray(newFacesArray);
    }

    function removeFace(index: number) {
        let newFacesArray  = Object.assign(Array<string>(), facesArray);
        newFacesArray.splice(index,1);
        setFacesArray(newFacesArray);
    }

    let menuHeight = 3 * styles.MenuConstants.height;

    return(
        <View>
            <Touchable 
            style={styles.AddFaceButtonStyle}
            onPress={addFace}
            foreground={Touchable.Ripple('white', true)}
            hitSlop={styles.HitSlop}
            >
                <Text style={styles.ButtonText}>Add Face</Text>
            </Touchable>
            <FlatList 
                style={[{height:menuHeight}]}
                data={facesArray}
                numColumns={3}
                ListEmptyComponent={
                    <Text style={styles.ButtonText}>Click 'Add Face'</Text>
                }
                renderItem={({ item, index }) =>  (
                    <View 
                    style={styles.DieFaceButtonStyle}
                    >
                        <View style={styles.FaceButtonLayoutStyle}>
                            <Touchable 
                                style={styles.ButtonBackground}
                                foreground={Touchable.Ripple('white')}
                                onPress={() => {removeFace(index)}}
                                hitSlop={styles.HitSlop}
                            >
                                <Icon 
                                    name='close-circle-outline'
                                    size={styles.IconConstants.width}
                                    color={styles.IconConstants.color}
                                />
                            </Touchable>
                            <TextInput 
                            style={styles.ModalInputText}
                            selectTextOnFocus={true}
                            defaultValue={item}
                            keyboardType={'default'}
                            onChangeText={(text) => setFaceString(text, index)}
                            returnKeyType = { "done" }
                            blurOnSubmit={false}
                            />
                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.ModalTextInputLine}>
                <Text style={styles.ModalText}>Name</Text>
                <TextInput 
                style={styles.ModalInputText}
                ref={secondLineRef}
                selectTextOnFocus={true}
                defaultValue={dieName}
                placeholder={WordDie.tempName(facesArray)}
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
    DieFaceButtonStyle:{
        flex:1,
        margin:'5rem',
        backgroundColor: '$primaryColorLightened',
        borderRadius: '10rem',
        overflow:'hidden'
    },
    AddFaceButtonStyle:{
        padding:'5rem',
        margin:'5rem',
        backgroundColor: '$primaryColorLightened',
        borderRadius: '10rem',
        overflow:'hidden'
    },
    ButtonBackground:{
        justifyContent:'center',
        backgroundColor: '$primaryColorLightened',
        borderRadius: '10rem',
        overflow:'hidden'
    },
    IconConstants:{
        width:'$fontSizeHuge',
        color:'$textColor',
        backgroundColor:'transparent'
    },
    ButtonText: {
        fontSize:'$fontSizeNormal',
        paddingLeft:'5rem',
        paddingRight:'5rem',
        color:'$textColor',
        textAlign:'center',
    },
    FaceButtonLayoutStyle:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
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
    MenuConstants:{
        height:'45rem',
    },
    HitSlop: {
        top:'10rem',
        bottom:'10rem',
        right:'10rem',
        left:'10rem'
    }
})