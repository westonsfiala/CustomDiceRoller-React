import React, { useRef, useState } from 'react'

import {
    View, 
    Text,
    LayoutAnimation,
    Dimensions,
} from 'react-native';

import Touchable from 'react-native-platform-touchable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EStyleSheet from 'react-native-extended-stylesheet';

import {
    Menu,
    MenuTrigger,
    MenuOptions,
    MenuOption,
} from 'react-native-popup-menu';
import { DieView } from "../dice/DieView";
import { SimpleDie } from "../dice/SimpleDie";
import ThemeManager from './ThemeManager';

interface ThemeButtonInterface {
    menuRef : React.MutableRefObject<any>;
    icon : string;
    themeName : string;
    themeList : Array<string>;
};

function ThemeButton (props : ThemeButtonInterface) {
    return (
        <Touchable 
            style={styles.ButtonBackground}
            onPress={() => props.menuRef.current.open()} 
            foreground={Touchable.Ripple('white')}
        >
            <View style={styles.SettingContainer}>
                <Icon size={styles.ButtonIconConstants.width} name={props.icon} color={styles.ButtonIconConstants.color}/>
                <Menu ref={props.menuRef}>
                    <MenuTrigger/>
                    <MenuOptions>
                    {props.themeList.map((value, index) => 
                        <MenuOption key={index} style={styles.MenuBackground} onSelect={() => ThemeManager.getInstance().setDieTheme(value)}>
                            <Text style={styles.MenuText}>{value}</Text>
                        </MenuOption>
                    )}
                    </MenuOptions>
                </Menu>
                <View style={styles.TextContainer}>
                    <Text style={styles.TitleText}>{props.themeName}</Text>
                </View>
            </View>
        </Touchable>
    );
}

export function DieThemeSetting() {

    const [reload, setReload] = useState(false);
    ThemeManager.getInstance().setSettingsUpdater(() => setReload(!reload));

    const basicMenuRef = useRef(null);
    const metallicMenuRef = useRef(null);
    const iceCreamMenuRef = useRef(null);

    const [showButtons, setShowButtons] = useState(false);

    return (
        <View>
            <Touchable 
                onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    setShowButtons(!showButtons);
                }}
                foreground={Touchable.Ripple('white')}
            >
                <View style={styles.SettingContainer} >
                    <Icon size={styles.IconConstants.width} name='palette' color={styles.IconConstants.color}/>
                    <View style={styles.TextContainer}>
                        <Text style={styles.TitleText}>Die Theme</Text>
                        <Text style={styles.ValueText}>{ThemeManager.getInstance().getDieThemeString()}</Text>
                    </View>
                </View>
            </Touchable>
            <View style={[ styles.ButtonContainer, {height: showButtons ? null : 0}]}>
                <View style={styles.ThemeButtonContainer}>
                    <ThemeButton menuRef={basicMenuRef} icon={'palette-swatch'} themeName={'Basic'} themeList={ThemeManager.getInstance().BasicDieThemeList} />
                    <ThemeButton menuRef={metallicMenuRef} icon={'diamond-stone'} themeName={'Metallic'} themeList={ThemeManager.getInstance().MetallicDieThemeList} />
                    <ThemeButton menuRef={iceCreamMenuRef} icon={'ice-cream'} themeName={'Ice Cream'} themeList={ThemeManager.getInstance().IceCreamDieThemeList} />
                </View>
                <View style={{justifyContent:'center'}}>
                    <DieView die={new SimpleDie('Theme', 20)} size={Dimensions.get('window').width/3} />
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
    TextContainer: {
        justifyContent:'center',
        marginLeft:'10rem'
    },
    TitleText: {
        fontSize:'20rem',
        color:'$textColor',
    },
    ValueText: {
        fontSize:'15rem',
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
        fontSize:'18rem', 
        padding:'4rem',
        color:'$textColor',
    },
    ButtonBackground:{
        flex:1,
        margin:'5rem',
        backgroundColor: '$primaryColorLightened',
        borderRadius: '10rem',
        overflow:'hidden',
    },
    ButtonContainer:{
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'center',
        marginLeft:'10rem',
    },
    ThemeButtonContainer:{
        flex:1
    },
    DieConstants:{
        width:'40rem',
    },
})