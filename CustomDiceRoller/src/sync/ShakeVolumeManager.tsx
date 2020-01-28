import AsyncStorage from "@react-native-community/async-storage";

const ShakeVolumeKey = 'ShakeVolumeKey';

export default class ShakeVolumeManager {

    private static mInstance = null as ShakeVolumeManager;

    readonly ShakeVolumeList = ['Off', 'Normal', 'Loud'];
    private mShakeVolume = this.ShakeVolumeList[1];
    private mSettingsUpdater = null;
    private mUpdater = null;

    static getInstance() : ShakeVolumeManager {
        if(ShakeVolumeManager.mInstance === null) {
            ShakeVolumeManager.mInstance = new ShakeVolumeManager();
        }

        return this.mInstance;
    }

    private constructor() {
        this.retrieveShakeVolume().then((shakeVolume) => {
            this.mShakeVolume = shakeVolume;
        });
    }
    
    get volumeModifier() : number {
        // 6 is an arbitrary number that works.
        if(this.mShakeVolume == this.ShakeVolumeList[0]) return 0;
        if(this.mShakeVolume == this.ShakeVolumeList[1]) return .5;
        if(this.mShakeVolume == this.ShakeVolumeList[2]) return 1;

        this.setShakeVolume(this.ShakeVolumeList[1]);
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

    setShakeVolume(dieSize : string) {
        this.saveShakeVolume(dieSize).then((value) => {
            this.mShakeVolume = value;
            this.runUpdaters();
        });
    }

    getShakeVolumeString() : string {
        return this.mShakeVolume;
    }

    getShakeVolumeIcon() : string {
        if(this.mShakeVolume == this.ShakeVolumeList[0]) return 'volume-low';
        if(this.mShakeVolume == this.ShakeVolumeList[1]) return 'volume-medium';
        if(this.mShakeVolume == this.ShakeVolumeList[2]) return 'volume-high';

        return 'volume-medium';
    }

    private async saveShakeVolume(shakeVolume : string) : Promise<string> {
        await AsyncStorage.setItem(ShakeVolumeKey, shakeVolume.toString());
        return shakeVolume;
    }

    private async retrieveShakeVolume() : Promise<string> {
        const shakeVolume = await AsyncStorage.getItem(ShakeVolumeKey);
        if(shakeVolume === null) { return this.ShakeVolumeList[1]; }
        return shakeVolume;
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

export function ShakeVolumeSetting() {

    const [reload, setReload] = useState(false);

    ShakeVolumeManager.getInstance().setSettingsUpdater(() => setReload(!reload));

    const menuRef = useRef(null);

    let iconName = ShakeVolumeManager.getInstance().getShakeVolumeIcon();

    return (
        <Touchable onPress={() => menuRef.current.open()} foreground={Touchable.Ripple('white')}>
            <View style={styles.SettingContainer} >
                <Icon size={styles.IconConstants.width} name={iconName} color={styles.IconConstants.color}/>
                <Menu ref={menuRef}>
                    <MenuTrigger/>
                    <MenuOptions>
                    {ShakeVolumeManager.getInstance().ShakeVolumeList.map((value) => 
                        <MenuOption key={value} style={styles.MenuBackground} onSelect={() => ShakeVolumeManager.getInstance().setShakeVolume(value)}>
                            <Text style={styles.MenuText}>{value}</Text>
                        </MenuOption>
                    )}
                    </MenuOptions>
                </Menu>
                <View style={styles.TextContainer}>
                    <Text style={styles.TitleText}>Shake Sounds</Text>
                    <Text style={styles.ValueText}>{ShakeVolumeManager.getInstance().getShakeVolumeString()}</Text>
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