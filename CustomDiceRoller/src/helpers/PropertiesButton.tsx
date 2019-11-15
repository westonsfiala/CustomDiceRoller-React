
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { RollProperties } from '../dice/RollProperties';
import { 
    getDropHighString, 
    getDropLowString, 
    getKeepHighString, 
    getKeepLowString 
} from './StringHelper';
import { SetValueDialog } from '../dialogs/SetValueDialog';

export function PropertiesButton({properties = new RollProperties({}), updateProperties}) {

    const menuRef = useRef(null);
    const resetMenuRef = useRef(null);
    const [showDropHighModal, setShowDropHighModal] = useState(false);
    const [showDropLowModal, setShowDropLowModal] = useState(false);
    const [showKeepHighModal, setShowKeepHighModal] = useState(false);
    const [showKeepLowModal, setShowKeepLowModal] = useState(false);

    let propertyText = "";

    let numNonDefault = properties.numNonDefaultProperties();

    if(numNonDefault === 1) {
        propertyText = numNonDefault + " Prop"
    }
    else
    {
        propertyText = numNonDefault + " Props"
    }

    let advantageIcon = "checkbox-blank-outline";
    let naturalIcon = "checkbox-blank-outline";
    let disadvantageIcon = "checkbox-blank-outline";

    if(properties.mAdvantageDisadvantage === RollProperties.rollAdvantageValue) {
        advantageIcon = "checkbox-marked-outline";
    }

    if(properties.mAdvantageDisadvantage === RollProperties.rollNaturalValue) {
        naturalIcon = "checkbox-marked-outline";
    }

    if(properties.mAdvantageDisadvantage === RollProperties.rollDisadvantageValue) {
        disadvantageIcon = "checkbox-marked-outline";
    }

    return(
        <View style={styles.Container}>
            <Menu ref={menuRef}>
                <MenuTrigger/>
                <MenuOptions>
                    <MenuOption style={styles.Menu} onSelect={() => updateProperties(properties.clone({advantageDisadvantage: RollProperties.rollAdvantageValue})) } >
                        <View style={styles.MenuLineContainer}>
                            <Icon name={advantageIcon} size={styles.Icons.fontSize} color={styles.Icons.color}></Icon>
                            <Text style={styles.MenuText}>Advantage</Text>
                        </View>
                    </MenuOption>
                    <MenuOption style={styles.Menu} onSelect={() => updateProperties(properties.clone({advantageDisadvantage: RollProperties.rollNaturalValue})) } >
                        <View style={styles.MenuLineContainer}>
                            <Icon name={naturalIcon} size={styles.Icons.fontSize} color={styles.Icons.color}></Icon>
                            <Text style={styles.MenuText}>Natural</Text>
                        </View>
                    </MenuOption>
                    <MenuOption style={styles.Menu} onSelect={() => updateProperties(properties.clone({advantageDisadvantage: RollProperties.rollDisadvantageValue})) } >
                        <View style={styles.MenuLineContainer}>
                            <Icon name={disadvantageIcon} size={styles.Icons.fontSize} color={styles.Icons.color}></Icon>
                            <Text style={styles.MenuText}>Disadvantage</Text>
                        </View>
                    </MenuOption>
                    <MenuOption style={styles.Menu} onSelect={() => setShowDropHighModal(true)} >
                        <Text style={styles.MenuText}>{getDropHighString(properties.mDropHigh)}</Text>
                    </MenuOption>
                    <MenuOption style={styles.Menu} onSelect={() => setShowDropLowModal(true)} >
                        <Text style={styles.MenuText}>{getDropLowString(properties.mDropLow)}</Text>
                    </MenuOption>
                    <MenuOption style={styles.Menu} onSelect={() => setShowKeepHighModal(true)} >
                        <Text style={styles.MenuText}>{getKeepHighString(properties.mKeepHigh)}</Text>
                    </MenuOption>
                    <MenuOption style={styles.Menu} onSelect={() => setShowKeepLowModal(true)} >
                        <Text style={styles.MenuText}>{getKeepLowString(properties.mKeepLow)}</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
            <Menu ref={resetMenuRef}>
                <MenuTrigger/>
                <MenuOptions>
                    <MenuOption style={styles.Menu} onSelect={() => updateProperties(new RollProperties({numDice: properties.mNumDice, modifier: properties.mModifier}))}>
                        <Text style={styles.MenuText}>
                            Reset Properties
                        </Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
            <Touchable 
                style={styles.ButtonBackground}
                foreground={Touchable.Ripple('white')}
                onPress={() => menuRef.current.open()}
                onLongPress={() => resetMenuRef.current.open()}
                delayLongPress={300}
            >
                <Text style={styles.Text}>{propertyText}</Text>
            </Touchable>
            <SetValueDialog
                modalShown={showDropHighModal} 
                titleText={"Drop Highest X"}
                valueEnforcer={(num: number) => {return Math.max(num, 0)}}
                defaultValue={properties.mDropHigh} 
                dismissModal={() => setShowDropHighModal(false)} 
                acceptValue={(newVal: number) => updateProperties(properties.clone({dropHigh:newVal})) }
            />
            <SetValueDialog
                modalShown={showDropLowModal} 
                titleText={"Drop Lowest X"}
                valueEnforcer={(num: number) => {return Math.max(num, 0)}}
                defaultValue={properties.mDropLow} 
                dismissModal={() => setShowDropLowModal(false)} 
                acceptValue={(newVal: number) => updateProperties(properties.clone({dropLow:newVal})) }
            />
            <SetValueDialog
                modalShown={showKeepHighModal} 
                titleText={"Keep Highest X"}
                valueEnforcer={(num: number) => {return Math.max(num, 0)}}
                defaultValue={properties.mKeepHigh} 
                dismissModal={() => setShowKeepHighModal(false)} 
                acceptValue={(newVal: number) => updateProperties(properties.clone({keepHigh:newVal})) }
            />
            <SetValueDialog
                modalShown={showKeepLowModal} 
                titleText={"Keep Lowest X"}
                valueEnforcer={(num: number) => {return Math.max(num, 0)}}
                defaultValue={properties.mKeepLow} 
                dismissModal={() => setShowKeepLowModal(false)} 
                acceptValue={(newVal: number) => updateProperties(properties.clone({keepLow:newVal})) }
            />
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
    Icons:{
        fontSize: '18rem', 
        color: '$textColor'
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
    MenuLineContainer:{
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
    },
    MenuText:{
        fontSize:'18rem', 
        padding:'4rem',
        color:'$textColor',
    },
})