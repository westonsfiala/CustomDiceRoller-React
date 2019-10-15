
import {
    View,
    Text,
    Button,
    StyleSheet,
  } from 'react-native';
  
import React, {
    useState
  } from 'react';



export function AppBar({title, subtitle}) {
    return (
        <View style={styles.AppBarBackground}>
            <View>
                <Text style={[styles.TextWhite, styles.LargeText]}>{title}</Text>
                <Text style={styles.TextWhite}>{subtitle}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                <View style={{padding:4}}>
                    <Button title='clear history' onPress={() => null}></Button>
                </View>
                <View style={{padding:4}}>
                    <Button title='menu' onPress={() => null}></Button>
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