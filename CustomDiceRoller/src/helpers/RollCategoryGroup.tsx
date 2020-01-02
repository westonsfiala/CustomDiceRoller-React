
import React, { useMemo } from 'react'

import {
    FlatList, View,
} from 'react-native';

import {Roll} from '../dice/Roll';
import { SavedCategoryView } from './SavedCategoryView';

export class RollCategoryGroup {
    category: string;
    rolls: Array<Roll>;
    subRolls: Array<Roll>;
}

interface RollCategoryGroupInterface {
    baseCategory : string;
    depth: number;
    rolls : Array<Roll>;
    displayRoll : (roll: Roll) => void;
}

export function RollCategoryGroupView(props : RollCategoryGroupInterface) {

    const processedRolls = useMemo(() => splitRolls(), [props.rolls.toString()]);

    function splitRolls() : Array<RollCategoryGroup> {

        let rollArray = Array<RollCategoryGroup>();

        for(let roll of props.rolls) {

            let splitString = roll.categoryName.split('/');

            let rollGroup = rollArray.find((value) => value.category === splitString[props.depth]);

            if(splitString.length == props.depth + 1) {
                if(rollGroup !== undefined) {
                    rollGroup.rolls.push(roll);
                } else {
                    let newGroup = new RollCategoryGroup();
                    newGroup.category = splitString[props.depth];
                    newGroup.rolls = [roll];
                    newGroup.subRolls = [];
                    rollArray.push(newGroup);
                }
            } else {
                if(rollGroup !== undefined) {
                    rollGroup.subRolls.push(roll);
                } else {
                    let newGroup = new RollCategoryGroup();
                    newGroup.category = splitString[props.depth];
                    newGroup.rolls = [];
                    newGroup.subRolls = [roll]
                    rollArray.push(newGroup);
                }
            }
        }

        return rollArray;
    }

    if(processedRolls.length === 0) {
        return null;
    }

    return (
        <View>
            <FlatList 
                listKey={props.baseCategory + props.depth.toString()}
                data={processedRolls}
                renderItem={({ item }) =>  (
                    <SavedCategoryView depth={props.depth} rollGroup={item} displayRoll={props.displayRoll} />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}