import React, { useRef, useState } from 'react'

import {
    View,
    Text,
    FlatList,
    Image,
    ScaledSize,
} from 'react-native'

import {
    Menu,
    MenuTrigger,
    MenuOptions,
    MenuOption,
} from 'react-native-popup-menu';

import Touchable from 'react-native-platform-touchable';
import EStyleSheet from 'react-native-extended-stylesheet';

import { Die } from '../../Common/dice/Die';
import DiceManager from '../../SimpleDicePage/managers/DiceManager';
import { getRequiredImage } from '../../Common/dice/dieImages/DieImageGetter';

interface AddCustomDiceInterface {
    window: ScaledSize;
    addDie: (die: Die) => void;
    resetDice: () => void;
}

export function AddCustomDiceButton(props : AddCustomDiceInterface) {

    const [reload, setReload] = useState(false);

    DiceManager.getInstance().setCustomUpdater(() => setReload(!reload));

    const menuRef = useRef(null);
    const resetMenuRef = useRef(null);

    let dice = DiceManager.getInstance().getDice();

    return(
        <View style={styles.Container}>
            <Menu ref={menuRef}>
                <MenuTrigger/>
                <MenuOptions>
                <FlatList
                    data={dice}
                    renderItem={({ item }) => (
                        <MenuOption style={styles.Menu} onSelect={() => props.addDie(item)}>
                            <Image source={getRequiredImage(item.imageID)} style={styles.MenuImage}/>
                            <Text style={styles.MenuText}>
                                {item.mDieName}
                            </Text>
                        </MenuOption>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
                </MenuOptions>
            </Menu>
            <Menu ref={resetMenuRef}>
                <MenuTrigger/>
                <MenuOptions>
                    <MenuOption style={styles.Menu} onSelect={props.resetDice}>
                        <Text style={styles.MenuText}>
                            Reset Roll
                        </Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
            <Touchable 
                style={styles.ButtonBackground}
                foreground={Touchable.Ripple('white')}
                onPress={() => menuRef.current.open()}
                delayLongPress={300}
                onLongPress={() => resetMenuRef.current.open()}
            >
                <Text style={styles.Text}>Add</Text>
            </Touchable>
        </View>
    )
}

const styles = EStyleSheet.create({
    Container:{
        flex: 1, 
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