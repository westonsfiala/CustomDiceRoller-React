
import React, { useState } from 'react'

import {
    View, 
    Text,
    FlatList,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EStyleSheet from 'react-native-extended-stylesheet';
import Touchable from 'react-native-platform-touchable';

import { Roll } from '../dice/Roll';
import { SavedRollView } from './SavedRollView';
import { RollCategoryGroup } from './RollCategoryGroup';

interface SavedCategoryInterface {
    depth : number;
    rollGroup : RollCategoryGroup;
    displayRoll : (roll: Roll) => void;
    children : any;
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
                    <View style={ showRolls ? {transform: [{ rotate: '90deg' }]} : {}}>
                        <Icon 
                            name='arrow-right-thick'
                            size={styles.IconConstants.width}
                            color={styles.IconConstants.color}
                        />
                    </View>
                    <Text style={styles.CategoryText}>{props.rollGroup.category}</Text>
                </View>
            </Touchable>
            <View style={showRolls ? styles.ShowRolls : styles.HideRolls}>
                <FlatList 
                    data={props.rollGroup.rolls}
                    renderItem={({ item }) =>  (
                        <SavedRollView roll={item} displayRoll={props.displayRoll}/>
                        )}
                    keyExtractor={(item, index) => index.toString()}
                />
                {props.children}
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
        marginLeft:'9rem',
        borderLeftColor:'$primaryColorLightened',
        borderLeftWidth:'1rem'
    },
    HideRolls:{
        height:0,
    },
    ExpandedRolls:{
        transform: [{ rotate: '90deg' }],
    },
    CollapsedRolls:{
    },
})