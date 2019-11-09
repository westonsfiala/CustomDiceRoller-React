
import React, { useRef, useState } from 'react'

import {
    View,
    Text
} from 'react-native'

import {
    Menu,
    MenuTrigger,
    MenuOptions,
    MenuOption,
} from 'react-native-popup-menu';

import Touchable from 'react-native-platform-touchable';
import EStyleSheet from 'react-native-extended-stylesheet';
import { CreateSimpleDieDialog } from '../dialogs/CreateSimpleDieDialog';
import { SimpleDie } from '../dice/SimpleDie';

export function AddDiceButton({addDie, resetDice}) {

    const menuRef = useRef(null);
    const resetMenuRef = useRef(null);
    const [simpleModalShown, setSimpleModalShown] = useState(false);
    const [simpleDie, setSimpleDie] = useState(new SimpleDie('temp', 1));

    function handleCreateSimpleDie(die: SimpleDie) {
        setSimpleDie(die);
        addDie(die);
    }

    return(
        <View style={styles.Container}>
            <Touchable 
                style={styles.ButtonBackground}
                foreground={Touchable.Ripple('white')}
                onPress={() => menuRef.current.open()}
                onLongPress={() => resetMenuRef.current.open()}
            >
                <Text style={styles.Text}>Add Die</Text>
            </Touchable>
            <Menu ref={menuRef}>
                <MenuTrigger/>
                <MenuOptions>
                    <MenuOption style={styles.Menu} onSelect={() => setSimpleModalShown(true)}>
                        <Text style={styles.MenuText}>
                            Simple Die
                        </Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
            <Menu ref={resetMenuRef}>
                <MenuTrigger/>
                <MenuOptions>
                    <MenuOption style={styles.Menu} onSelect={resetDice}>
                        <Text style={styles.MenuText}>
                            Reset Dice
                        </Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
            <CreateSimpleDieDialog modalShown={simpleModalShown} die={simpleDie} dismissModal={() => setSimpleModalShown(false)} createDie={handleCreateSimpleDie} />
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
        fontSize: '30rem', 
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
        backgroundColor:'$primaryColor',
    },
    MenuText:{
        fontSize:'18rem', 
        padding:'4rem',
        color:'$textColor',
    },
})