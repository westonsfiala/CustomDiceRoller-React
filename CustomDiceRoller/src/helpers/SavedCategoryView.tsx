
import React, { useState } from 'react'

import {
    View, 
    Text,
    FlatList,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EStyleSheet from 'react-native-extended-stylesheet';
import Touchable from 'react-native-platform-touchable';

import {Roll} from '../dice/Roll';
import { SavedRollView } from './SavedRollView';

interface SavedCategoryInterface {
    category: string;
    rolls : Array<Roll>;
    displayRoll : (roll: Roll) => void;
}

export function SavedCategoryView(props : SavedCategoryInterface) {

    const [showRolls, setShowRolls] = useState(false);

    return (
        <View>
            <Touchable 
                foreground={Touchable.Ripple('white')}
                onPress={() => setShowRolls(!showRolls)}
            >
                <View style={styles.CategoryContainer}>
                    <Icon 
                        name='arrow-right-thick'
                        size={styles.IconConstants.width}
                        color={styles.IconConstants.color}
                    />
                    <Text style={styles.CategoryText}>{props.category}</Text>
                </View>
            </Touchable>
            <View style={showRolls ? styles.ShowRolls : styles.HideRolls}>
                <FlatList 
                    data={props.rolls}
                    renderItem={({ item }) =>  (
                        <SavedRollView roll={item} displayRoll={props.displayRoll}/>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
    );
}

const styles = EStyleSheet.create({
    CategoryContainer:{
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center',
    },
    CategoryText:{
        color:'$textColor', 
        fontSize:'22rem'
    },
    IconConstants:{
        width:'48rem',
        color:'$textColor',
        backgroundColor:'transparent'
    },
    ShowRolls:{
        marginLeft:'10rem',
    },
    HideRolls:{
        height:0,
    },
})