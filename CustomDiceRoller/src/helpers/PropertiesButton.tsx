
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

import { RollProperties, isAdvantage, isDisadvantage, isDouble, isHalve } from '../dice/RollProperties';
import { 
    getDropHighString, 
    getDropLowString, 
    getKeepHighString, 
    getKeepLowString,
    getReRollString,
    getMinimumString,
    getDropHighTitle,
    getDropLowTitle,
    getKeepHighTitle,
    getKeepLowTitle,
    getReRollTitle,
    getMinimumTitle
} from './StringHelper';
import { SetValueDialog } from '../dialogs/SetValueDialog';

export function PropertiesButton({properties = new RollProperties({}), updateProperties}) {

    const menuRef = useRef(null);
    const resetMenuRef = useRef(null);
    const [showDropHighModal, setShowDropHighModal] = useState(false);
    const [showDropLowModal, setShowDropLowModal] = useState(false);
    const [showKeepHighModal, setShowKeepHighModal] = useState(false);
    const [showKeepLowModal, setShowKeepLowModal] = useState(false);
    const [showReRollModal, setShowReRollModal] = useState(false);
    const [showMinimumModal, setShowMinimumModal] = useState(false);

    let propertyText = "";

    let numNonDefault = properties.numNonDefaultProperties();

    if(numNonDefault === 0)
    {
        propertyText = "No Props"
    }
    else if(numNonDefault === 1) {
        propertyText = numNonDefault + " Prop"
    }
    else
    {
        propertyText = numNonDefault + " Props"
    }

    let advantageIcon = "checkbox-blank-outline";
    let disadvantageIcon = "checkbox-blank-outline";

    if(isAdvantage(properties)) {
        advantageIcon = "checkbox-marked-outline";
    }

    if(isDisadvantage(properties)) {
        disadvantageIcon = "checkbox-marked-outline";
    }
    
    let doubleIcon = "checkbox-blank-outline";
    let halveIcon = "checkbox-blank-outline";

    if(isDouble(properties)) {
        doubleIcon = "checkbox-marked-outline";
    }

    if(isHalve(properties)) {
        halveIcon = "checkbox-marked-outline";
    }

    let explodeIcon = "checkbox-blank-outline";

    if(properties.mExplode) {
        explodeIcon = "checkbox-marked-outline";
    }

    return(
        <View style={styles.Container}>
            <Menu ref={menuRef}>
                <MenuTrigger/>
                <MenuOptions>
                    <MenuOption style={styles.Menu} onSelect={() => updateProperties(properties.clone(
                        {advantageDisadvantage: isAdvantage(properties) ? RollProperties.rollNaturalValue : RollProperties.rollAdvantageValue}
                        )) } >
                        <View style={styles.MenuLineContainer}>
                            <Icon name={advantageIcon} size={styles.Icons.fontSize} color={styles.Icons.color}></Icon>
                            <Text style={styles.MenuText}>Advantage</Text>
                        </View>
                    </MenuOption>
                    <MenuOption style={styles.Menu} onSelect={() => updateProperties(properties.clone(
                        {advantageDisadvantage: isDisadvantage(properties) ? RollProperties.rollNaturalValue : RollProperties.rollDisadvantageValue}
                        )) } >
                        <View style={styles.MenuLineContainer}>
                            <Icon name={disadvantageIcon} size={styles.Icons.fontSize} color={styles.Icons.color}></Icon>
                            <Text style={styles.MenuText}>Disadvantage</Text>
                        </View>
                    </MenuOption>
                    <View style={styles.MenuDivider}/>
                    <MenuOption style={styles.Menu} onSelect={() => updateProperties(properties.clone(
                        {doubleHalve: isDouble(properties) ? RollProperties.rollNaturalValue : RollProperties.rollDoubleValue}
                        )) } >
                        <View style={styles.MenuLineContainer}>
                            <Icon name={doubleIcon} size={styles.Icons.fontSize} color={styles.Icons.color}></Icon>
                            <Text style={styles.MenuText}>Double</Text>
                        </View>
                    </MenuOption>
                    <MenuOption style={styles.Menu} onSelect={() => updateProperties(properties.clone(
                        {doubleHalve: isHalve(properties) ? RollProperties.rollNaturalValue : RollProperties.rollHalveValue}
                        )) } >
                        <View style={styles.MenuLineContainer}>
                            <Icon name={halveIcon} size={styles.Icons.fontSize} color={styles.Icons.color}></Icon>
                            <Text style={styles.MenuText}>Halve</Text>
                        </View>
                    </MenuOption>
                    <View style={styles.MenuDivider}/>
                    <MenuOption style={styles.Menu} onSelect={() => setShowDropHighModal(true)} >
                        <Text style={styles.MenuText}>{getDropHighString(properties.mDropHigh)}</Text>
                    </MenuOption>
                    <MenuOption style={styles.Menu} onSelect={() => setShowDropLowModal(true)} >
                        <Text style={styles.MenuText}>{getDropLowString(properties.mDropLow)}</Text>
                    </MenuOption>
                    <View style={styles.MenuDivider}/>
                    <MenuOption style={styles.Menu} onSelect={() => setShowKeepHighModal(true)} >
                        <Text style={styles.MenuText}>{getKeepHighString(properties.mKeepHigh)}</Text>
                    </MenuOption>
                    <MenuOption style={styles.Menu} onSelect={() => setShowKeepLowModal(true)} >
                        <Text style={styles.MenuText}>{getKeepLowString(properties.mKeepLow)}</Text>
                    </MenuOption>
                    <View style={styles.MenuDivider}/>
                    <MenuOption style={styles.Menu} onSelect={() => setShowReRollModal(true)} >
                        <Text style={styles.MenuText}>{getReRollString(properties.mReRoll)}</Text>
                    </MenuOption>
                    <View style={styles.MenuDivider}/>
                    <MenuOption style={styles.Menu} onSelect={() => setShowMinimumModal(true)} >
                        <Text style={styles.MenuText}>{getMinimumString(properties.mMinimumRoll)}</Text>
                    </MenuOption>
                    <View style={styles.MenuDivider}/>
                    <MenuOption style={styles.Menu} onSelect={() => updateProperties(properties.clone({explode: !properties.mExplode})) } >
                        <View style={styles.MenuLineContainer}>
                            <Icon name={explodeIcon} size={styles.Icons.fontSize} color={styles.Icons.color}></Icon>
                            <Text style={styles.MenuText}>Explode</Text>
                        </View>
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
                titleText={getDropHighTitle()}
                valueEnforcer={(num: number) => {return Math.max(num, 0)}}
                defaultValue={properties.mDropHigh} 
                dismissModal={() => setShowDropHighModal(false)} 
                acceptValue={(newVal: number) => updateProperties(properties.clone({dropHigh:newVal})) }
            />
            <SetValueDialog
                modalShown={showDropLowModal} 
                titleText={getDropLowTitle()}
                valueEnforcer={(num: number) => {return Math.max(num, 0)}}
                defaultValue={properties.mDropLow} 
                dismissModal={() => setShowDropLowModal(false)} 
                acceptValue={(newVal: number) => updateProperties(properties.clone({dropLow:newVal})) }
            />
            <SetValueDialog
                modalShown={showKeepHighModal} 
                titleText={getKeepHighTitle()}
                valueEnforcer={(num: number) => {return Math.max(num, 0)}}
                defaultValue={properties.mKeepHigh} 
                dismissModal={() => setShowKeepHighModal(false)} 
                acceptValue={(newVal: number) => updateProperties(properties.clone({keepHigh:newVal})) }
            />
            <SetValueDialog
                modalShown={showKeepLowModal} 
                titleText={getKeepLowTitle()}
                valueEnforcer={(num: number) => {return Math.max(num, 0)}}
                defaultValue={properties.mKeepLow} 
                dismissModal={() => setShowKeepLowModal(false)} 
                acceptValue={(newVal: number) => updateProperties(properties.clone({keepLow:newVal})) }
            />
            <SetValueDialog
                modalShown={showReRollModal} 
                titleText={getReRollTitle()}
                valueEnforcer={(num: number) => {return Math.max(num, 0)}}
                defaultValue={properties.mReRoll} 
                dismissModal={() => setShowReRollModal(false)} 
                acceptValue={(newVal: number) => updateProperties(properties.clone({reRoll:newVal})) }
            /> 
            <SetValueDialog
                modalShown={showMinimumModal} 
                titleText={getMinimumTitle()}
                valueEnforcer={(num: number) => {return Math.max(num, 0)}}
                defaultValue={properties.mMinimumRoll} 
                dismissModal={() => setShowMinimumModal(false)} 
                acceptValue={(newVal: number) => updateProperties(properties.clone({minimumRoll:newVal})) }
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
    MenuDivider:{
        borderBottomWidth:1,
        borderBottomColor:'$primaryColorDarkened'
    },
    MenuLineContainer:{
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
    },
    MenuText:{
        fontSize:'16rem', 
        padding:'4rem',
        color:'$textColor',
    },
})