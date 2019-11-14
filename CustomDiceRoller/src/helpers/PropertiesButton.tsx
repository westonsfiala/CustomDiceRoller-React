
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

export function PropertiesButton({properties = new RollProperties({}), updateProperties}) {

    const menuRef = useRef(null);

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
                    <MenuOption style={styles.Menu} onSelect={() => {
                        let newProps = properties.clone({advantageDisadvantage: RollProperties.rollAdvantageValue});
                        updateProperties(newProps);
                        }}
                    >
                        <View style={styles.MenuLineContainer}>
                            <Icon name={advantageIcon} size={styles.Icons.fontSize} color={styles.Icons.color}></Icon>
                            <Text style={styles.MenuText}>Advantage</Text>
                        </View>
                    </MenuOption>
                    <MenuOption style={styles.Menu} onSelect={() => {
                        let newProps = properties.clone({advantageDisadvantage: RollProperties.rollNaturalValue});
                        updateProperties(newProps);
                        }}
                    >
                        <View style={styles.MenuLineContainer}>
                            <Icon name={naturalIcon} size={styles.Icons.fontSize} color={styles.Icons.color}></Icon>
                            <Text style={styles.MenuText}>Natural</Text>
                        </View>
                    </MenuOption>
                    <MenuOption style={styles.Menu} onSelect={() => {
                        let newProps = properties.clone({advantageDisadvantage: RollProperties.rollDisadvantageValue});
                        updateProperties(newProps);
                        }}
                    >
                        <View style={styles.MenuLineContainer}>
                            <Icon name={disadvantageIcon} size={styles.Icons.fontSize} color={styles.Icons.color}></Icon>
                            <Text style={styles.MenuText}>Disadvantage</Text>
                        </View>
                    </MenuOption>
                </MenuOptions>
            </Menu>
            <Touchable 
                style={styles.ButtonBackground}
                foreground={Touchable.Ripple('white')}
                onPress={() => menuRef.current.open()}
            >
                <Text style={styles.Text}>{propertyText}</Text>
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