

import React, {useState, useEffect} from 'react'

import {
    View, 
    Text,
    FlatList,
    LayoutAnimation,
    Pressable,
} from 'react-native';

import AboutManager from '../Common/managers/AboutManager';

import EStyleSheet from 'react-native-extended-stylesheet';

const tips = [
    "These tips are scrollable",
    "The dice buttons can be scrolled through when there are too many dice to fit on one screen",
    "Tap on the number of dice or modifier text to manually set the value",
    "When shaking to roll, the roll will timeout after 10 seconds",
    "Long tap on the up/down arrows to jump modifier/number of dice up/down to the next multiple of 100.",
    "Check out the settings for adjusting everything to your liking",
    "Dice themes can be changed in the settings. Find the one that fits you the most!",
    "Advantage - Roll all of the dice twice and take the higher of the two sets",
    "Disadvantage - Roll all of the dice twice and take the lower of the two sets",
    "Double - Doubles the result of the dice",
    "Halve - Halves the result of the dice, rounded down",
    "Drop High - Drop the highest X number of attached dice",
    "Drop Low - Drop the lowest X number of attached dice",
    "Keep High - Keep the highest X number of attached dice, stacks with Drop Low",
    "Keep Low - Keep the lowest X number of attached dice, stacks with Drop High",
    "Re-Roll - Re-Roll any dice that is below the given threshold once",
    "Minimum Roll - If any individual die roll is lower than |X|, it is treated as X",
    "Count Above - If any individual die roll is greater than or equal to |X|, it is treated as 1, else it is 0",
    "Explode - If the maximum die value is rolled add a new dice of the same type to the roll",
    "You can remove dice by long tapping on them and selecting remove die",
    "Dice and saved rolls can be named however you like",
    "Rename dice in a custom roll by tapping on their name",
    "Tap on the grey section of a saved roll to roll it",
    "You can edit a saved roll by clicking the info button, then selecting edit",
    "Saved rolls are still usable even if you remove any, or all, of the dice in the roll",
    "Adding the prefix \"0x\" to a die name will display its value in hex",
    "Die values will be displayed in hex, only if all die that are in that roll are also displayed in hex",
    "Long tap on the dice edit button to reset currently created dice",
    "Inspiration for this app came from RPG simple dice. Check out their awesome app!",
    "Thanks to Rae Strong for coming up with the idea for themed dice and providing the ice cream themes.",
    "Images are provided by:\
    - Delapouite (http://delapouite.com/)\
    - Lorc (http://lorcblog.blogspot.com)\
    Available on https://game-icons.net\
    under the CC-BY 3.0 (http://creativecommons.org/licenses/by/3.0/)",
    ];

interface AboutInterface {
    dismissPage: () => void;
}

export function AboutPage(props : AboutInterface) {

    const [show, setShow] = useState(false);

    // Register a callback that will allow us to show and hide this dialog without having to reload the page it is contained in.
    useEffect(() => {
        AboutManager.getInstance().setAboutShower((show: boolean) => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setShow(show);
        });
        return(() => AboutManager.getInstance().setAboutShower(null))
    })

    console.log('refresh about page');

    const appPkg = require("../../app.json");
    const versionPkg = require('../../package.json');

    if(show)
    {
        return (
            <View style={styles.Container}>
                <Text style={styles.TitleText}>{appPkg.displayName}</Text>
                <Text style={styles.DetailText}>Developed by Weston Fiala</Text>
                <Text style={styles.DetailText}>Version {versionPkg.version}</Text>
                <FlatList
                    data={tips}
                    renderItem={({item}) => 
                        <Text style={styles.TipText}>{item}</Text>
                    }
                    keyExtractor={(item) => item}
                />
                <View style={styles.ButtonContainer}>
                    <View
                        style={styles.ButtonBackground}
                    >
                        <Pressable 
                            android_ripple={{color:'white', borderless:false}}
                            onPress={() => props.dismissPage()}
                            hitSlop={styles.HitSlop}
                        >
                            <Text style={styles.ButtonText}>Back</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        );
    }
    
    return (null);

}

const styles = EStyleSheet.create({
    Container: {
        backgroundColor:'$primaryColor',
        position:'absolute',
        left:'0rem',
        bottom:'0rem',
        right:'0rem',
        top:'0rem',
    },
    TitleText: {
        fontSize:'$fontSizeMassive',
        color:'$textColor',
        textAlign:'center',
    },
    DetailText: {
        fontSize:'$fontSizeNormal',
        color:'$textColor',
        textAlign:'center',
    },
    TipText: {
        fontSize:'$fontSizeNormal',
        color:'$textColor',
        borderRadius:'5rem',
        margin:'5rem',
        paddingLeft:'5rem',
        backgroundColor:'$primaryColorLightened',
    },
    ButtonContainer: {
        flexDirection:'row', 
        alignItems:'stretch',
        alignContent:'stretch',
        justifyContent:'space-around',
        marginTop:'8rem'
    },
    ButtonBackground: {
        flex:1,
        backgroundColor: '$primaryColorLightened',
        borderRadius: '10rem',
        overflow:'hidden',
        margin:'10rem'
    },
    ButtonText: {
        fontSize:'$fontSizeHuge',
        textAlign: 'center', 
        color: '$textColor',
    },
    HitSlop: {
        top:'10rem',
        bottom:'10rem',
        right:'10rem',
        left:'10rem'
    }
})