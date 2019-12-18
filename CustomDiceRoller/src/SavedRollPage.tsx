
import React, { useState, useEffect } from 'react'

import {
    View, 
    Text,
    FlatList,
    Dimensions,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import RollManager from './sync/RollManager';
import Touchable from 'react-native-platform-touchable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function SavedRollPage({displayRoll}) {
    const [width, setWidth] = useState(Dimensions.get("window").width);
    const [reload, setReload] = useState(false);
    
    RollManager.getInstance().setUpdater(() => setReload(!reload));

    console.log('refresh saved roll page');

    function handleScreenChange({window}) {
        setWidth(window.width);
    }

    useEffect(() => {
        Dimensions.addEventListener("change", handleScreenChange);
        
        return () => {
            Dimensions.removeEventListener("change", handleScreenChange);
        }
    });

    return (
        <View style={styles.PageBackground}>
            <FlatList 
                data={RollManager.getInstance().getRolls()}
                ListEmptyComponent={
                    <View style={styles.NoRollsTextContainer}>
                        <Text style={styles.NoRollsText}>No rolls</Text>
                    </View>
                }
                renderItem={({ item }) =>  (
                    <View style={styles.ButtonContainer}> 
                        <Touchable 
                            style={styles.ButtonBackground}
                            foreground={Touchable.Ripple('white')}
                            onPress={() => displayRoll(item)}
                            delayLongPress={300}
                            onLongPress={() => RollManager.getInstance().removeRoll(item)}
                        >
                            <View style={{flexDirection:'row'}}>
                                <View style={styles.TextBackground}>
                                    <Text style={styles.RollName}>{item.mRollName}</Text>
                                    <Text style={styles.RollDetails}>{item.getDetailedRollName()}</Text>
                                </View>
                                <View>
                                    <Touchable 
                                        style={styles.ButtonBackground}
                                        foreground={Touchable.Ripple('white')}
                                        onPress={() => null}
                                        delayLongPress={300}
                                        onLongPress={() => null}
                                    >
                                        <Icon 
                                            name='information-outline'
                                            size={styles.IconConstants.width}
                                            iconStyle={{marginRight:0}}
                                            color={styles.IconConstants.color}
                                            backgroundColor={styles.IconConstants.backgroundColor}
                                        />
                                    </Touchable>
                                </View>
                            </View>
                        </Touchable>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                extraData={width}
            />
        </View> 
    );
}

const styles = EStyleSheet.create({
    PageBackground:{
        flex:1,
    },
    TextBackground:{
        flex:1,
        marginLeft:10,
        marginBottom:5
    },
    NoRollsTextContainer:{
        flex:1, 
        alignItems:'center', 
        justifyContent:'center',
    },
    NoRollsText:{
        color:'$textColor', 
        fontSize:'22rem'
    },
    IconConstants:{
        width:'48rem',
        color:'$textColor',
        backgroundColor:'transparent'
    },
    ButtonBackground:{
        flex:1,
        justifyContent:'center',
        backgroundColor: '$primaryColorLightened',
        borderRadius: '10rem',
        overflow:'hidden'
    },
    ButtonContainer:{
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: '5rem',
    },
    RollName:{
        fontSize: '20rem', 
        color: '$textColor',
    },
    RollDetails:{
        fontSize: '15rem', 
        color: '$textColorDarkened',
    },
})