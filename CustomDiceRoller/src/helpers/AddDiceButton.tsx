
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
import { CreateMinMaxDieDialog } from '../dialogs/CreateMinMaxDieDialog';
import { SimpleDie } from '../dice/SimpleDie';
import { Die } from '../dice/Die';
import { MinMaxDie } from '../dice/MinMaxDie';
import { ImbalancedDie } from '../dice/ImbalancedDie';
import { CreateImbalancedDieDialog } from '../dialogs/CreateImbalancedDieDialog';

interface AddDiceInterface {
    addDie: (die: Die) => void;
    resetDice: () => void;
}

export function AddDiceButton(props: AddDiceInterface) {

    const menuRef = useRef(null);
    const resetMenuRef = useRef(null);

    const [simpleModalShown, setSimpleModalShown] = useState(false);
    const [minMaxModalShown, setMinMaxModalShown] = useState(false);
    const [imbalancedModalShown, setImbalancedModalShown] = useState(false);

    const [simpleDie, setSimpleDie] = useState(new SimpleDie('', 1));
    const [minMaxDie, setMinMaxDie] = useState(new MinMaxDie('', 1, 1));
    const [imbalancedDie, setImbalancedDie] = useState(new ImbalancedDie('', [1,1,2,3,5]));

    function handleCreateSimpleDie(die: SimpleDie) {
        setSimpleDie(die);
        props.addDie(die);
    }

    function handleCreateMinMaxDie(die: MinMaxDie) {
        setMinMaxDie(die);
        props.addDie(die);
    }

    function handleCreateImbalancedDie(die: ImbalancedDie) {
        setImbalancedDie(die);
        props.addDie(die);
    }

    return(
        <View style={styles.Container}>
            <Menu ref={menuRef}>
                <MenuTrigger/>
                <MenuOptions>
                    <MenuOption style={styles.Menu} onSelect={() => setSimpleModalShown(true)}>
                        <Text style={styles.MenuText}>Simple Die</Text>
                    </MenuOption>
                    <MenuOption style={styles.Menu} onSelect={() => setMinMaxModalShown(true)}>
                        <Text style={styles.MenuText}>Min-Max Die</Text>
                    </MenuOption>
                    <MenuOption style={styles.Menu} onSelect={() => setImbalancedModalShown(true)}>
                        <Text style={styles.MenuText}>Imbalanced Die</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
            <Menu ref={resetMenuRef}>
                <MenuTrigger/>
                <MenuOptions>
                    <MenuOption style={styles.Menu} onSelect={() => props.resetDice()}>
                        <Text style={styles.MenuText}>
                            Reset Dice
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
                <Text style={styles.Text}>Add Die</Text>
            </Touchable>
            
            <CreateSimpleDieDialog modalShown={simpleModalShown} die={simpleDie} dismissModal={() => setSimpleModalShown(false)} createDie={handleCreateSimpleDie} />
            <CreateMinMaxDieDialog modalShown={minMaxModalShown} die={minMaxDie} dismissModal={() => setMinMaxModalShown(false)} createDie={handleCreateMinMaxDie} />
            <CreateImbalancedDieDialog modalShown={imbalancedModalShown} die={imbalancedDie} dismissModal={() => setImbalancedModalShown(false)} createDie={handleCreateImbalancedDie} />
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