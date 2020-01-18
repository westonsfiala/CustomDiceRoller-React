import AsyncStorage from "@react-native-community/async-storage";

const ShakeSensitivityKey = 'ShakeSensitivityKey';

export default class ShakeSensitivityManager {

    private static mInstance = null as ShakeSensitivityManager;

    readonly shakeOptionsList = ['Low', 'Medium', 'High'];
    private mShakeSensitivity = this.shakeOptionsList[1];

    private mSettingsUpdater = null;

    static getInstance() : ShakeSensitivityManager {
        if(ShakeSensitivityManager.mInstance === null) {
            ShakeSensitivityManager.mInstance = new ShakeSensitivityManager();
        }
        return this.mInstance;
    }

    private constructor() {
        this.retrieveShakeSensitivity().then((shakeSensitivity) => {
            this.setShakeSensitivity(shakeSensitivity);
        });
    }

    setSettingsUpdater(updater : () => void) {
        this.mSettingsUpdater = updater;
    }

    runUpdaters() {
        if(this.mSettingsUpdater !== null) this.mSettingsUpdater();
    }

    setShakeSensitivity(shakeSensitivity : string) {
        this.saveShakeSensitivity(shakeSensitivity).then((value) => {
            this.mShakeSensitivity = value;
            this.runUpdaters();
        });
    }

    getShakeSensitivityString() : string {
        return this.mShakeSensitivity;
    }

    getShakeSensitivityValue() : number {

        if(this.mShakeSensitivity == this.shakeOptionsList[0]) { return 50; }
        if(this.mShakeSensitivity == this.shakeOptionsList[1]) { return 100; }
        if(this.mShakeSensitivity == this.shakeOptionsList[2]) { return 150; }

        this.setShakeSensitivity(this.shakeOptionsList[1]);
        return 100;
    }

    private async saveShakeSensitivity(shakeSensitivity : string) : Promise<string> {
        await AsyncStorage.setItem(ShakeSensitivityKey, shakeSensitivity.toString());
        return shakeSensitivity;
    }

    private async retrieveShakeSensitivity() : Promise<string> {
        const shakeSensitivityString = await AsyncStorage.getItem(ShakeSensitivityKey);
        if(shakeSensitivityString === null) { return this.shakeOptionsList[1]; }
        return shakeSensitivityString;
    }
}

import React, { useState, useRef } from 'react'

import {
    View, 
    Text,
} from 'react-native';

import {
    Menu,
    MenuTrigger,
    MenuOptions,
    MenuOption,
} from 'react-native-popup-menu';

import Touchable from 'react-native-platform-touchable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EStyleSheet from 'react-native-extended-stylesheet';

export function ShakeSensitivitySetting() {

    const [reload, setReload] = useState(false);

    ShakeSensitivityManager.getInstance().setSettingsUpdater(() => setReload(!reload));

    const menuRef = useRef(null);

    return (
        <Touchable style={{flex:1}} onPress={() => menuRef.current.open()} foreground={Touchable.Ripple('white')}>
            <View style={styles.SettingContainer} >
                <Icon size={styles.IconConstants.width} name='rotate-orbit' color={styles.IconConstants.color}/>
                <Menu ref={menuRef}>
                    <MenuTrigger/>
                    <MenuOptions>
                    {ShakeSensitivityManager.getInstance().shakeOptionsList.map((value) => 
                        <MenuOption key={value} style={styles.MenuBackground} onSelect={() => ShakeSensitivityManager.getInstance().setShakeSensitivity(value)}>
                            <Text style={styles.MenuText}>{value}</Text>
                        </MenuOption>
                    )}
                    </MenuOptions>
                </Menu>
                <View style={styles.TextContainer}>
                    <Text style={styles.TitleText}>Shake Sensitivity</Text>
                    <Text style={styles.ValueText}>{ShakeSensitivityManager.getInstance().getShakeSensitivityString()}</Text>
                </View>
            </View>
        </Touchable>
    );
}

const styles = EStyleSheet.create({
    SettingContainer: {
        flexDirection:'row',
        alignContent:'center',
        flex:1
    },
    TextContainer: {
        justifyContent:'center',
        marginLeft:'10rem'
    },
    TitleText: {
        fontSize:'20rem',
        color:'$textColor',
    },
    ValueText: {
        fontSize:'15rem',
        color:'$textColorDarkened',
    },
    IconConstants: {
        width:'60rem',
        color:'$textColor'
    },
    MenuBackground:{
        backgroundColor:'$primaryColor',
    },
    MenuText:{
        fontSize:'18rem', 
        padding:'4rem',
        color:'$textColor',
    },
})