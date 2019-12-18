
import React, { useState, useEffect } from 'react'

import {
    View, 
    Text,
    FlatList,
    Dimensions,
} from 'react-native';

import { SimplePageDieView } from "./dice/SimplePageDieView";
import { Die } from "./dice/Die";
import { NumDiceUpDownButtons, ModifierUpDownButtons } from './helpers/UpDownButtons';
import { Roll } from './dice/Roll';
import EStyleSheet from 'react-native-extended-stylesheet';
import RollManager from './sync/RollManager';
import { AddDiceButton } from './helpers/AddDiceButton';
import { PropertiesButton } from './helpers/PropertiesButton';
import Touchable from 'react-native-platform-touchable';

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
                            <View>
                                <Text style={styles.Text}>{item.mRollName}:{item.getDetailedRollName()}</Text>
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
    NoRollsTextContainer:{
        flex:1, 
        alignItems:'center', 
        justifyContent:'center',
    },
    NoRollsText:{
        color:'$textColor', 
        fontSize:'22rem'
    },
    ButtonBackground:{
        flex:1,
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
    Text:{
        fontSize: '30rem', 
        textAlign: 'center', 
        color: '$textColor',
    },
})