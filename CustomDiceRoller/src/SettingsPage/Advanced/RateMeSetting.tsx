import React, { useState } from 'react'

import {
    View, 
    Text,
} from 'react-native';

import Touchable from 'react-native-platform-touchable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EStyleSheet from 'react-native-extended-stylesheet';

import { MigrateRollsDialog } from "./MigrateRollsDialog";
import { openRatePage } from '../../Common/utility/FunctionHelper';

export function RateMeSetting() {

    const [showDialog, setShowDialog] = useState(false);

    return (
        <Touchable 
            onPress={openRatePage} 
            foreground={Touchable.Ripple('white')}
        >
            <View style={styles.SettingContainer} >
                <Icon size={styles.IconConstants.width} name='thumb-up' color={styles.IconConstants.color}/>
                <View style={styles.TextContainer}>
                    <Text style={styles.TitleText}>Rate the app</Text>
                    <Text style={styles.ValueText}>Click to open store page</Text>
                </View>
                <MigrateRollsDialog modalShown={showDialog} dismissModal={()=> setShowDialog(false)}/>
            </View>
        </Touchable>
    );
}

const styles = EStyleSheet.create({
    SettingContainer: {
        flexDirection:'row',
        alignContent:'center',
        flex:1
    },
    TextContainer: {
        justifyContent:'center',
        marginLeft:'10rem'
    },
    TitleText: {
        fontSize:'$fontSizeLarge',
        color:'$textColor',
    },
    ValueText: {
        fontSize:'$fontSizeNormal',
        color:'$textColorDarkened',
    },
    IconConstants: {
        width:'60rem',
        color:'$textColor'
    },
    MenuBackground:{
        backgroundColor:'$primaryColor',
    },
    MenuText:{
        fontSize:'$fontSizeNormal',
        padding:'4rem',
        color:'$textColor',
    },
})