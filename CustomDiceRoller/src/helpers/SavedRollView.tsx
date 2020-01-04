
import React, { useRef, useState } from 'react'

import {
    View, 
    Text,
    FlatList,
} from 'react-native';

import {
    Menu,
    MenuTrigger,
    MenuOptions,
    MenuOption,
} from 'react-native-popup-menu';

import EStyleSheet from 'react-native-extended-stylesheet';
import Touchable from 'react-native-platform-touchable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Roll } from '../dice/Roll';
import RollManager from '../sync/RollManager';
import { ConfirmRemoveDialog } from '../dialogs/ConfirmRemoveDialog';
import { ChangeCategoryDialog } from '../dialogs/ChangeCategoryDialog';
import { ConfirmOverrideDialog } from '../dialogs/ConfirmOverrideDialog';

interface SavedRollInterface {
    roll: Roll;
    displayRoll: () => void;
    editRoll: () => void;
}

export function SavedRollView(props : SavedRollInterface) {

    const infoMenuRef = useRef(null);
    const categoryMenuRef = useRef(null);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [showChangeCategoryModal, setShowChangeCategoryModal] = useState(false);
    const overrideCategoryRef = useRef('');
    const [overrideRollModalShown, setOverrideRollModalShown] = useState(false);

    let categories = RollManager.getInstance().getPossibleCategories();
    // If you don't give a height to the menu, the scroll feature doesn't work. 
    let displayItems = Math.min(10, categories.length)
    let menuHeight = displayItems * styles.MenuImage.height;

    function handleChangeCategory(category: string, force: boolean = false) {
        let newRoll = props.roll.setNameCategory(props.roll.mRollName, category);
        if(!RollManager.getInstance().editRoll(props.roll, newRoll, force))
        {
            overrideCategoryRef.current = category;
            setOverrideRollModalShown(true);
        }
    }
   
    return (
        <View style={styles.ButtonContainer}>
            <Touchable 
                style={styles.ButtonBackground}
                foreground={Touchable.Ripple('white')}
                onPress={() => props.displayRoll()}
                delayLongPress={300}
                onLongPress={() => infoMenuRef.current.open()}
            >
                <View style={{flexDirection:'row'}}>
                    <View style={styles.TextBackground}>
                        <Text style={styles.RollName}>{props.roll.mRollName}</Text>
                        <Text style={styles.RollDetails}>{props.roll.getDetailedRollName()}</Text>
                    </View>
                    <View>
                        <Touchable 
                            style={styles.ButtonBackground}
                            foreground={Touchable.Ripple('white')}
                            onPress={() => infoMenuRef.current.open()}
                            delayLongPress={300}
                            onLongPress={() => infoMenuRef.current.open()}
                        >
                            <Icon 
                                name='information-outline'
                                size={styles.IconConstants.width}
                                color={styles.IconConstants.color}
                            />
                        </Touchable>
                    </View>
                </View>
            </Touchable>
            <Menu ref={infoMenuRef}>
                <MenuTrigger/>
                <MenuOptions>
                    <MenuOption style={styles.Menu} onSelect={() => props.editRoll()}>
                        <Text style={styles.MenuText}>Edit</Text>
                    </MenuOption>
                    <MenuOption style={styles.Menu} onSelect={() => setShowChangeCategoryModal(true)}>
                        <Text style={styles.MenuText}>Change Category</Text>
                    </MenuOption>
                    <MenuOption style={styles.Menu} onSelect={() => setShowRemoveModal(true)}>
                        <Text style={styles.MenuText}>Remove</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
            <Menu ref={categoryMenuRef}>
                <MenuTrigger/>
                <MenuOptions>
                <FlatList
                    data={categories}
                    renderItem={({ item }) => (
                        <MenuOption style={styles.Menu} onSelect={() => null}>
                            <Text style={styles.MenuText}>{item}</Text>
                        </MenuOption>
                    )}
                    style={{height:menuHeight}}
                    keyExtractor={(item, index) => index.toString()}
                />
                </MenuOptions>
            </Menu>
            <ConfirmRemoveDialog 
                modalShown={showRemoveModal} 
                removeName={props.roll.mRollName} 
                dismissModal={() => setShowRemoveModal(false)} 
                remove={() => RollManager.getInstance().removeRoll(props.roll)}
            />
            <ChangeCategoryDialog 
                modalShown={showChangeCategoryModal}
                dismissModal={() => setShowChangeCategoryModal(false)}
                chooseCategory={handleChangeCategory}
            />
            <ConfirmOverrideDialog 
                modalShown={overrideRollModalShown} 
                dismissModal={() => setOverrideRollModalShown(false)} 
                itemName={props.roll.displayName} 
                override={() => handleChangeCategory(overrideCategoryRef.current, true)} 
            />
        </View>
    );
}

const styles = EStyleSheet.create({
    TextBackground:{
        flex:1,
        marginLeft:10,
        marginBottom:5
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
    Menu:{
        backgroundColor:'$primaryColor',
    },
    MenuText:{
        fontSize:'18rem', 
        padding:'4rem',
        color:'$textColor',
    },
    MenuImage:{
        height:'40rem'
    },
})