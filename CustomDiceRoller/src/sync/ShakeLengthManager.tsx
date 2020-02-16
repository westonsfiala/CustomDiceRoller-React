import AsyncStorage from "@react-native-community/async-storage";

const ShakeLengthKey = 'ShakeLengthKey';

export default class ShakeLengthManager {

    private static mInstance = null as ShakeLengthManager;

    readonly ShakeLengthList = ['Slow', 'Normal', 'Fast'];
    private mShakeLength = this.ShakeLengthList[1];
    private mSettingsUpdater = null;
    private mUpdater = null;

    static getInstance() : ShakeLengthManager {
        if(ShakeLengthManager.mInstance === null) {
            ShakeLengthManager.mInstance = new ShakeLengthManager();
        }

        return this.mInstance;
    }

    private constructor() {
        this.retrieveShakeLength().then((shakeLength) => {
            this.mShakeLength = shakeLength;
        });
    }
    
    get shakeLength() : number {
        if(this.mShakeLength == this.ShakeLengthList[0]) return 1000;
        if(this.mShakeLength == this.ShakeLengthList[1]) return 500;
        if(this.mShakeLength == this.ShakeLengthList[2]) return 250;

        this.setShakeLength(this.ShakeLengthList[1]);
    }

    setSettingsUpdater(updater : () => void) {
        this.mSettingsUpdater = updater;
    }

    setUpdater(updater : () => void) {
        this.mUpdater = updater;
    }

    runUpdaters() {
        if(this.mUpdater !== null) this.mUpdater();
        if(this.mSettingsUpdater !== null) this.mSettingsUpdater();
    }

    setShakeLength(shakeLength : string) {
        this.saveShakeLength(shakeLength).then((value) => {
            this.mShakeLength = value;
            this.runUpdaters();
        });
    }

    getShakeLengthString() : string {
        return this.mShakeLength;
    }

    getShakeLengthIcon() : string {
        return 'timer';
    }

    private async saveShakeLength(shakeLength : string) : Promise<string> {
        await AsyncStorage.setItem(ShakeLengthKey, shakeLength.toString());
        return shakeLength;
    }

    private async retrieveShakeLength() : Promise<string> {
        const shakeLength = await AsyncStorage.getItem(ShakeLengthKey);
        if(shakeLength === null) { return this.ShakeLengthList[1]; }
        return shakeLength;
    }
}

import React, { useRef, useState } from 'react'

import {
    View, 
    Text,
} from 'react-native';

import Touchable from 'react-native-platform-touchable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EStyleSheet from 'react-native-extended-stylesheet';

import {
    Menu,
    MenuTrigger,
    MenuOptions,
    MenuOption,
} from 'react-native-popup-menu';

export function ShakeLengthSetting() {

    const [reload, setReload] = useState(false);

    ShakeLengthManager.getInstance().setSettingsUpdater(() => setReload(!reload));

    const menuRef = useRef(null);

    let iconName = ShakeLengthManager.getInstance().getShakeLengthIcon();

    return (
        <Touchable onPress={() => menuRef.current.open()} foreground={Touchable.Ripple('white')}>
            <View style={styles.SettingContainer} >
                <Icon size={styles.IconConstants.width} name={iconName} color={styles.IconConstants.color}/>
                <Menu ref={menuRef}>
                    <MenuTrigger/>
                    <MenuOptions>
                    {ShakeLengthManager.getInstance().ShakeLengthList.map((value) => 
                        <MenuOption key={value} style={styles.MenuBackground} onSelect={() => ShakeLengthManager.getInstance().setShakeLength(value)}>
                            <Text style={styles.MenuText}>{value}</Text>
                        </MenuOption>
                    )}
                    </MenuOptions>
                </Menu>
                <View style={styles.TextContainer}>
                    <Text style={styles.TitleText}>Shake Length</Text>
                    <Text style={styles.ValueText}>{ShakeLengthManager.getInstance().getShakeLengthString()}</Text>
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
        fontSize:'$fontSizeLarge',
        color:'$textColor',
    },
    ValueText: {
        fontSize:'$fontSizeNormal',
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
        fontSize:'$fontSizeNormal',
        padding:'4rem',
        color:'$textColor',
    },
})