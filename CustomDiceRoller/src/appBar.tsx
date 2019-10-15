
import React, {
    useState
  } from 'react';

import {
    View,
    Text,
    Button,
    StyleSheet,
  } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function AppBar({title, subtitle}) {
    return (
        <View style={styles.AppBarBackground}>
            <View style={{padding:4}}>
                <Text style={[styles.TextWhite, styles.LargeText]}>{title}</Text>
                <Text style={styles.TextWhite}>{subtitle}</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'center', alignContent:'center'}}>
                <View style={{}}>
                    <Button title='clear history' onPress={() => null}/>
                </View>
                <View style={{marginStart:10}}>
                    <Icon.Button 
                    name='dots-vertical'
                    size={20}
                    iconStyle={{marginRight:0}}
                    color='#ffffff'
                    backgroundColor='#00000000'
                    onPress={() => null}/>
                </View>
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
    TextWhite: {
        color: '#ffffff',
    },
    TextBlack: {
        color: '#000000',
    },
    LargeText: {
        fontSize:20,
        fontWeight: 'bold'
    },
    SmallText: {
        fontSize:12,
    },
    AlignStart: {
        alignSelf:'flex-start'
    },
    AlignEnd: {
        alignSelf:'flex-end'
    },
  });