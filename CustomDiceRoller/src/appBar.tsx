
import React, { } from 'react';

import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
  } from 'react-native';

  import Menu, {
    MenuTrigger,
    MenuOptions,
    MenuOption,
  } from 'react-native-popup-menu';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function AppBar({title, subtitle, clearHistoryHandler, tabPressHandler, tabIndex}) {

    return (
        <View>
            <View style={styles.AppBarBackground}>
                <View style={{padding:4}}>
                    <Text style={[styles.TextWhite, styles.LargeText]}>{title}</Text>
                    <Text style={styles.TextWhite}>{subtitle}</Text>
                </View>
                <View style={styles.ButtonLayout}>
                    <Menu name='clearMenu'>
                        <MenuTrigger>
                            <Image source={require('./BurningBook.png')} style={{width:32, height:32}}/>
                        </MenuTrigger>
                        <MenuOptions>
                            <MenuOption onSelect={() => clearHistoryHandler()}>
                                <Text style={{fontSize:20, padding:4}}>
                                    Clear History
                                </Text>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
                    <TouchableOpacity onPress={() => null} style={{marginStart:10}}>
                        <Icon 
                        name='dots-vertical'
                        size={32}
                        iconStyle={{marginRight:0}}
                        color='white'
                        backgroundColor='transparent'
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flexDirection:'row', backgroundColor:'#1f1f1f'}}>
                <TouchableOpacity style={[styles.TabItem, tabIndex === 0 ? styles.ActiveTabItem : []]} onPress={() => tabPressHandler(0)}>
                    <Text style={{color:'white', fontSize:18}}>
                        History
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.TabItem, tabIndex === 1 ? styles.ActiveTabItem : []]} onPress={() => tabPressHandler(1)}>
                    <Text style={{color:'white', fontSize:18}}>
                        Simple Roll
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    AppBarBackground: {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor:'#1f1f1f', // Black
        padding:4,
    },
    ButtonLayout: {
        flexDirection:'row', 
        alignItems:'center',
        justifyContent:'center', 
        alignContent:'center'
    },
    TabItem: {
        flex:1, 
        padding:8, 
        alignItems:'center'
    },
    ActiveTabItem: {
        borderBottomWidth:3, 
        borderBottomColor:'cyan'
    },
    TextWhite: {
        color: '#ffffff',
    },
    LargeText: {
        fontSize:20,
        fontWeight: 'bold'
    },
  });