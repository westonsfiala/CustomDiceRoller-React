
import React from 'react'

import {
    FlatList,
} from 'react-native';

import {Roll} from '../dice/Roll';
import { SavedCategoryView } from './SavedCategoryView';

interface RollCategoryGroupInterface {
    baseCategoryName: string;
    rolls : Array<Roll>;
    displayRoll : (roll: Roll) => void;
}

export function RollCategoryGroupView(props : RollCategoryGroupInterface) {

    class RollCategoryGroup {
        category: string;
        rolls: Array<Roll>;
    }

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
        <FlatList 
            data={splitRolls()}
            renderItem={({ item }) =>  (
                <SavedCategoryView category={item.category} rolls={item.rolls} displayRoll={props.displayRoll} />
            )}
            keyExtractor={(item, index) => index.toString()}
        />
    );
}