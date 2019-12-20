
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
import { SavedCategoryView } from './SavedCategoryView';

interface RollCategoryGroupInterface {
    baseCategoryName: string;
    rolls : Array<Roll>;
    displayRoll : (roll: Roll) => void;
}

class RollCategoryGroup {
    category: string;
    rolls: Array<Roll>;
}

export function RollCategoryGroupView(props : RollCategoryGroupInterface) {

    const [showRolls, setShowRolls] = useState(false);

    function splitRolls() : Array<RollCategoryGroup> {

        let rollArray = Array<RollCategoryGroup>();

        for(let roll of props.rolls) {
            let rollGroup = rollArray.find((value) => value.category === roll.categoryName);

            if(rollGroup !== undefined) {
                rollGroup.rolls.push(roll);
            } else {
                let newGroup = new RollCategoryGroup();
                newGroup.category = roll.categoryName;
                newGroup.rolls = [roll];
                rollArray.push(newGroup);
            }
        }

        return rollArray;
    }

    return (
        <View>
            <FlatList 
                data={splitRolls()}
                renderItem={({ item }) =>  (
                    <SavedCategoryView category={item.category} rolls={item.rolls} displayRoll={props.displayRoll} />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
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
    },
    HideRolls:{
        height:0,
    },
})