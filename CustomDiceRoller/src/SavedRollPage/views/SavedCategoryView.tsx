
import React, { useState } from 'react'

import {
    View, 
    Text,
    FlatList,
    Animated,
    LayoutAnimation,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EStyleSheet from 'react-native-extended-stylesheet';
import Touchable from 'react-native-platform-touchable';

import { Roll } from '../../Common/dice/Roll';

import ExpandedCategoryManager from '../managers/ExpandedCategoryManager';

import { SavedRollView } from './SavedRollView';
import { RollCategoryGroup } from './RollCategoryGroup';

interface SavedCategoryInterface {
    depth : number;
    rollGroup : RollCategoryGroup;
    displayRoll : (roll: Roll) => void;
    editRoll : (roll: Roll) => void;
    children : any;
}

export function SavedCategoryView(props : SavedCategoryInterface) {

    const [reload, setReload] = useState(false);
    const [animatedRotation] = useState(new Animated.Value(0));
    
    let showRolls = ExpandedCategoryManager.getInstance().isExpanded(props.rollGroup.baseCategory);

    if(showRolls) {
        Animated.timing(animatedRotation, {
            toValue: 1,
            useNativeDriver:true,
        }).start();
    } else {
        Animated.timing(animatedRotation, {
            toValue: 0,
            useNativeDriver:true,
        }).start()
    }

    ExpandedCategoryManager.getInstance().setUpdater(props.rollGroup.baseCategory, () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setReload(!reload);
    });

    const RotateData = animatedRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg'],
    });

    return (
        <View>
            <Touchable 
                foreground={Touchable.Ripple('white')}
                onPress={() => ExpandedCategoryManager.getInstance().expandContract(props.rollGroup.baseCategory)}
            >
                <View style={styles.CategoryContainer}>
                    <Animated.View 
                        style={{transform: [{ rotate: RotateData }]}}
                    >
                        <Icon 
                            name='arrow-right-thick'
                            size={styles.IconConstants.width}
                            color={styles.IconConstants.color}
                        />
                    </Animated.View>
                    <Text style={styles.CategoryText}>{props.rollGroup.category}</Text>
                </View>
            </Touchable>
            <View style={[styles.ShowRolls, {height: showRolls ? null : 0, overflow: 'hidden'}]}>
                <FlatList 
                    data={props.rollGroup.rolls}
                    renderItem={({ item }) =>  (
                        <SavedRollView roll={item} displayRoll={() => props.displayRoll(item)} editRoll={() => props.editRoll(item)} />
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
        fontSize:'$fontSizeLarge',
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