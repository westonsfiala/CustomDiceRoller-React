
import React, { useRef, useState } from 'react';

import {
    View,
    Text,
    Image,
    ScrollView,
} from 'react-native';

import {
    Menu,
    MenuTrigger,
    MenuOptions,
    MenuOption,
} from 'react-native-popup-menu';

import Touchable from 'react-native-platform-touchable';
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TabManager from '../sync/TabManager';

interface AppBarInterface {
    subtitle: string;
    clearHistoryHandler: () => void;
    tabPressHandler: (value: number) => void;
    showAboutPage: () => void;
}

export function AppBar(props: AppBarInterface) {

    const [reload, setReload] = useState(false);
    
    TabManager.getInstance().setUpdater(() => setReload(!reload));

    console.log('refresh app bar');

    const clearHistoryMenuRef = useRef(null);
    const tripleDotMenuRef = useRef(null);

    const appPkg = require("../../app.json");

    return (
        <View style={styles.AppBarBackground}>
            <View style={styles.ActionBarBackground}>
                <View>
                    <Text style={styles.AppTitleText}>{appPkg.displayName}</Text>
                    <Text style={styles.AppSubTitleText}>{props.subtitle}</Text>
                </View>
                <View style={styles.RowLayout}>
                    <Touchable
                        onPress={() => clearHistoryMenuRef.current.open()}
                        hitSlop={styles.HitSlop}
                        foreground={Touchable.Ripple('white', true)}
                    >
                        <Image source={require('./BurningBook.png')} style={styles.ClearHistory}/>
                    </Touchable>
                    <Menu ref={clearHistoryMenuRef}>
                        <MenuTrigger/>
                        <MenuOptions>
                            <MenuOption style={styles.Menu} onSelect={() => props.clearHistoryHandler()}>
                                <Text style={styles.MenuText}>
                                    Clear History
                                </Text>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
                    <Touchable 
                    onPress={() => tripleDotMenuRef.current.open()} 
                    style={{marginStart:20}}
                    foreground={Touchable.Ripple('white', true)}
                    >
                        <Icon 
                        name='dots-vertical'
                        size={styles.IconConstants.width}
                        color={styles.IconConstants.color}
                        />
                    </Touchable>
                    <Menu ref={tripleDotMenuRef}>
                        <MenuTrigger/>
                        <MenuOptions>
                            <MenuOption style={styles.Menu} onSelect={() => props.showAboutPage()}>
                                <Text style={styles.MenuText}>
                                    About
                                </Text>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.ScrollContainer}>
                <Touchable 
                style={[styles.TabItem, TabManager.getInstance().tab === 0 ? styles.ActiveTabItem : styles.InactiveTabItem]} 
                background={Touchable.Ripple('white')}
                onPress={() => props.tabPressHandler(0)}>
                    <Text style={styles.TabText}>
                        History
                    </Text>
                </Touchable>
                <Touchable 
                style={[styles.TabItem, TabManager.getInstance().tab === 1 ? styles.ActiveTabItem : styles.InactiveTabItem]} 
                background={Touchable.Ripple('white')}
                onPress={() => props.tabPressHandler(1)}>
                    <Text style={styles.TabText}>
                        Simple Roll
                    </Text>
                </Touchable>
                <Touchable 
                style={[styles.TabItem, TabManager.getInstance().tab === 2 ? styles.ActiveTabItem : styles.InactiveTabItem]} 
                background={Touchable.Ripple('white')}
                onPress={() => props.tabPressHandler(2)}>
                    <Text style={styles.TabText}>
                        Custom Roll
                    </Text>
                </Touchable>
                <Touchable 
                style={[styles.TabItem, TabManager.getInstance().tab === 3 ? styles.ActiveTabItem : styles.InactiveTabItem]} 
                background={Touchable.Ripple('white')}
                onPress={() => props.tabPressHandler(3)}>
                    <Text style={styles.TabText}>
                        Saved Rolls
                    </Text>
                </Touchable>
            </ScrollView>
        </View>
    );
};

const styles = EStyleSheet.create({
    AppBarBackground: {
        backgroundColor: '$primaryColorDarkened'
    },
    ActionBarBackground: {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding:'4rem',
    },
    AppTitleText:{
        color:'$textColor',
        fontSize:'20rem',
        fontWeight: 'bold',
    },
    AppSubTitleText:{
        color:'$textColor',
        fontSize:'14rem',
    },
    ScrollContainer: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    RowLayout: {
        flexDirection:'row',
        alignItems:'center'
    },
    ClearHistory:{
        width:'32rem',
        height:'32rem'
    },
    IconConstants:{
        width:'24rem',
        color:'$textColor',
        backgroundColor:'transparent'
    },
    Menu:{
        backgroundColor:'$primaryColor',
    },
    MenuText:{
        fontSize:'18rem', 
        padding:'4rem',
        color:'$textColor',
    },
    TabItem: {
        padding:'8rem', 
        alignItems:'center',
        borderBottomWidth:3, 
    },
    ActiveTabItem: {
        borderBottomColor:Color.rgb(0,255,255).hex(), // Cyan
    },
    InactiveTabItem: {
        borderBottomColor:'transparent'
    },
    TabText: {
        color:'$textColor', 
        fontSize:'16rem'
    },
    HitSlop: {
        top: '10rem',
        bottom: '10rem',
        right: '10rem',
        left: '10rem',
    }
  });