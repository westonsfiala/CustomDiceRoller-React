
import React, { } from 'react';

import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

import Menu, {
    MenuTrigger,
    MenuOptions,
    MenuOption,
} from 'react-native-popup-menu';

import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function AppBar({title, subtitle, clearHistoryHandler, tabPressHandler, tabIndex}) {

    return (
        <View style={styles.AppBarBackground}>
            <View style={styles.ActionBarBackground}>
                <View>
                    <Text style={styles.AppTitleText}>{title}</Text>
                    <Text style={styles.AppSubTitleText}>{subtitle}</Text>
                </View>
                <View style={styles.RowLayout}>
                    <Menu name='clearHistoryMenu'>
                        <MenuTrigger>
                            <Image source={require('./BurningBook.png')} style={styles.ClearHistory}/>
                        </MenuTrigger>
                        <MenuOptions>
                            <MenuOption style={styles.Menu} onSelect={() => clearHistoryHandler()}>
                                <Text style={styles.MenuText}>
                                    Clear History
                                </Text>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
                    <TouchableOpacity onPress={() => null} style={{marginStart:10}}>
                        <Icon 
                        name='dots-vertical'
                        size={styles.IconConstants.width}
                        iconStyle={{marginRight:0}}
                        color={styles.IconConstants.color}
                        backgroundColor={styles.IconConstants.backgroundColor}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.RowLayout}>
                <TouchableOpacity style={[styles.TabItem, tabIndex === 0 ? styles.ActiveTabItem : styles.InactiveTabItem]} onPress={() => tabPressHandler(0)}>
                    <Text style={styles.TabText}>
                        History
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.TabItem, tabIndex === 1 ? styles.ActiveTabItem : styles.InactiveTabItem]} onPress={() => tabPressHandler(1)}>
                    <Text style={styles.TabText}>
                        Simple Roll
                    </Text>
                </TouchableOpacity>
            </View>
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
    RowLayout: {
        flexDirection:'row',
        alignItems:'center',
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
        flex:1, 
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
    }
  });