import React, { useRef, useState } from 'react'

import {
    View, 
    Text, 
    LayoutAnimation, 
    ScaledSize
} from 'react-native';

import Touchable from 'react-native-platform-touchable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EStyleSheet from 'react-native-extended-stylesheet';
import Slider from '@react-native-community/slider';

import DieTintManager from './DieTintManager';
import { SimpleDie } from "../../Common/dice/SimpleDie";
import { DieView } from "../../Common/dice/views/DieView";
import { decimalToString } from "../../Common/utility/StringHelper";

interface DieTintInterface
{
    window : ScaledSize
}

export function DieTintSetting(props: DieTintInterface) {

    const [reload, setReload] = useState(false);

    DieTintManager.getInstance().setSettingsUpdater(() => setReload(!reload));

    const [showButtons, setShowButtons] = useState(DieTintManager.getInstance().DieTintEnabled);

    let currentColor = DieTintManager.getInstance().DieTintColor;

    return (
        <View>
            <Touchable onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    DieTintManager.getInstance().setDieTintEnabled(!showButtons);
                    setShowButtons(!showButtons);
                }} foreground={Touchable.Ripple('white')}>
                <View style={styles.SettingContainer} >
                    <Icon size={styles.IconConstants.width} name='format-paint' color={styles.IconConstants.color}/>
                    <View style={styles.TextContainer}>
                        <Text style={styles.TitleText}>Die Tint</Text>
                        <Text style={styles.ValueText}>{showButtons ? currentColor.hex() : 'Disabled'}</Text>
                    </View>
                </View>
            </Touchable>
            <View style={[ styles.ButtonContainer, {height: showButtons ? null : 0}]}>
                <View style={styles.ThemeButtonContainer}>
                    <Text style={styles.ValueText}>Alpha - {decimalToString(currentColor.alpha() * 100, 0)}%</Text>
                    <Slider key={'a'} minimumValue={0} maximumValue={100} step={1} value={currentColor.alpha() * 100} 
                    onValueChange={(value: number) => { DieTintManager.getInstance().setDieTintAlpha(value / 100, false); }}
                    onSlidingComplete={(value: number) => { DieTintManager.getInstance().setDieTintAlpha(value / 100, true); }}
                    />
                    <Text style={styles.ValueText}>Red - {currentColor.red()}</Text>
                    <Slider key={'r'} minimumValue={0} maximumValue={255} step={1} value={currentColor.red()} 
                    onValueChange={(value: number) => { DieTintManager.getInstance().setDieTintRed(value, false); }}
                    onSlidingComplete={(value: number) => { DieTintManager.getInstance().setDieTintRed(value, true); }}
                    />
                    <Text style={styles.ValueText}>Green - {currentColor.green()}</Text>
                    <Slider key={'g'} minimumValue={0} maximumValue={255} step={1} value={currentColor.green()} 
                    onValueChange={(value: number) => { DieTintManager.getInstance().setDieTintGreen(value, false); }}
                    onSlidingComplete={(value: number) => { DieTintManager.getInstance().setDieTintGreen(value, true); }}
                    />
                    <Text style={styles.ValueText}>Blue - {currentColor.blue()}</Text>
                    <Slider key={'b'} minimumValue={0} maximumValue={255} step={1} value={currentColor.blue()} 
                    onValueChange={(value: number) => { DieTintManager.getInstance().setDieTintBlue(value, false); }}
                    onSlidingComplete={(value: number) => { DieTintManager.getInstance().setDieTintBlue(value, true); }}
                    />
                </View>
                <View style={{justifyContent:'center'}}>
                    <DieView die={new SimpleDie('Tint', 20)} size={props.window.width/3} />
                </View>
            </View>
        </View>
    );
}

const styles = EStyleSheet.create({
    SettingContainer: {
        flexDirection:'row',
        alignContent:'center',
        flex:1
    },
    IconContainer: {
        alignSelf:'center',
    },
    TextContainer: {
        marginLeft:'10rem',
        justifyContent:'center',
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
    ButtonIconConstants: {
        width:'50rem',
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
    ButtonBackground:{
        flex:1,
        margin:'5rem',
        backgroundColor: '$primaryColorLightened',
        borderRadius: '10rem',
    },
    ButtonContainer:{
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'center',
        marginLeft:'10rem',
        overflow:'hidden',
    },
    ThemeButtonContainer:{
        flex:1
    },
    DieConstants:{
        width:'40rem',
    },
})