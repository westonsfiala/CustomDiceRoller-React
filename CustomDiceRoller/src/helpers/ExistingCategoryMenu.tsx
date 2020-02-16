
import React, { useRef } from 'react';

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
    MenuProvider,
} from 'react-native-popup-menu';

import Touchable from 'react-native-platform-touchable';
import EStyleSheet from 'react-native-extended-stylesheet';

interface ExistingCategoryInterface {
    categories : Array<string>;
    setCategory : (category: string) => void;
}

export function ExistingCategoryMenu(props : ExistingCategoryInterface) {

    const menuRef = useRef(null);

    // If you don't give a height to the menu, the scroll feature doesn't work. 
    // There is a small gap between each item, so the 1.2 is for making it fit a bit better
    let displayItems = Math.min(6, props.categories.length)
    let menuHeight = displayItems * styles.MenuImage.height * 1.2;

    return(
        <View style={styles.Container}>
            <Menu ref={menuRef}>
                <MenuTrigger/>
                <MenuOptions>
                <FlatList
                    data={props.categories}
                    renderItem={({ item }) => (
                        <MenuOption style={styles.Menu} onSelect={() => props.setCategory(item)}>
                            <Text style={styles.MenuText}>
                                {item}
                            </Text>
                        </MenuOption>
                    )}
                    style={{height:menuHeight}}
                    keyExtractor={(item, index) => index.toString()}
                />
                </MenuOptions>
            </Menu>
            <Touchable 
                style={styles.ButtonBackground}
                foreground={Touchable.Ripple('white')}
                onPress={() => menuRef.current.open()}
            >
                <Text style={styles.Text}>Set Category</Text>
            </Touchable>
        </View>
    )
}

const styles = EStyleSheet.create({
    Container:{
        flex:1,
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: '5rem',
    },
    Text:{
        fontSize:'$fontSizeHuge',
        textAlign: 'center', 
        color: '$textColor',
    },
    ButtonBackground:{
        flex:1,
        backgroundColor: '$primaryColorLightened',
        borderRadius: '10rem',
        overflow:'hidden'
    },
    Menu:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'$primaryColor',
    },
    MenuText:{
        fontSize:'$fontSizeLarge',
        padding:'4rem',
        color:'$textColor',
    },
    MenuImage:{
        width:'40rem',
        height:'40rem'
    }
})
                