import React, { useMemo } from 'react'

import {
    FlatList, View,
} from 'react-native';

import { Roll } from '../../Common/dice/Roll';

import { SavedCategoryView } from './SavedCategoryView';
import { RollCategoryGroup } from './RollCategoryGroup';

interface RollCategoryGroupInterface {
    baseCategory : string;
    depth: number;
    rolls : Array<Roll>;
    displayRoll : (roll: Roll) => void; 
    editRoll : (roll: Roll) => void; 
}

export function RollCategoryGroupView(props : RollCategoryGroupInterface) {

    const processedRolls = useMemo(() => splitRolls(), [JSON.stringify(props.rolls)]);

    function splitRolls() : Array<RollCategoryGroup> {
        let rollArray = Array<RollCategoryGroup>();

        for(let roll of props.rolls) {
            if(roll.categoryName == undefined) continue;
            let splitString = roll.categoryName.split('/');

            let rollGroup = rollArray.find((value) => value.category === splitString[props.depth]);

            if(splitString.length == props.depth + 1) {
                if(rollGroup !== undefined) {
                    rollGroup.rolls.push(roll);
                } else {
                    let newGroup = new RollCategoryGroup();
                    newGroup.baseCategory = roll.categoryName;
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

                    // We want to partially built category name.
                    // i.e. Category/SubCategory
                    let groupCategory = '';
                    for(let index = 0; index < props.depth + 1; index += 1) {
                        groupCategory += splitString[index] + '/';
                    }
                    groupCategory = groupCategory.substr(0, groupCategory.length-1);

                    newGroup.baseCategory = groupCategory;
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
                    <SavedCategoryView depth={props.depth} rollGroup={item} displayRoll={props.displayRoll} editRoll={props.editRoll}>
                        <RollCategoryGroupView baseCategory={item.category} depth={props.depth+1} rolls={item.subRolls} displayRoll={props.displayRoll} editRoll={props.editRoll}/>
                    </SavedCategoryView>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}