import AsyncStorage from "@react-native-community/async-storage";

const ShakeDieSizeKey = 'ShakeDieSizeKey';

export default class ShakeDieSizeManager {

    private static mInstance = null as ShakeDieSizeManager;

    readonly ShakeDieSizeList = ['Tiny', 'Small', 'Medium', 'Large', 'Huge'];
    private mShakeDieSize = this.ShakeDieSizeList[1];
    private mSettingsUpdater = null;
    private mUpdater = null;

    static getInstance() : ShakeDieSizeManager {
        if(ShakeDieSizeManager.mInstance === null) {
            ShakeDieSizeManager.mInstance = new ShakeDieSizeManager();
        }

        return this.mInstance;
    }

    private constructor() {
        this.retrieveShakeDieSize().then((shakeDieSize) => {
            this.mShakeDieSize = shakeDieSize;
        });
    }
    
    get shakeDieSizeDivider() : number {
        if(this.mShakeDieSize == this.ShakeDieSizeList[0]) return 10;
        if(this.mShakeDieSize == this.ShakeDieSizeList[1]) return 8.5;
        if(this.mShakeDieSize == this.ShakeDieSizeList[2]) return 7;
        if(this.mShakeDieSize == this.ShakeDieSizeList[3]) return 5.5;
        if(this.mShakeDieSize == this.ShakeDieSizeList[4]) return 4;

        this.setShakeDieSize(this.ShakeDieSizeList[2]);
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

    setShakeDieSize(shakeDieSize : string) {
        this.saveShakeDieSize(shakeDieSize).then((value) => {
            this.mShakeDieSize = value;
            this.runUpdaters();
        });
    }

    getShakeDieSizeString() : string {
        return this.mShakeDieSize;
    }

    getShakeDieSizeIcon() : string {
        return 'format-size';
    }

    private async saveShakeDieSize(shakeDieSize : string) : Promise<string> {
        await AsyncStorage.setItem(ShakeDieSizeKey, shakeDieSize.toString());
        return shakeDieSize;
    }

    private async retrieveShakeDieSize() : Promise<string> {
        const shakeDieSize = await AsyncStorage.getItem(ShakeDieSizeKey);
        if(shakeDieSize === null) { return this.ShakeDieSizeList[2]; }
        return shakeDieSize;
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

export function ShakeDieSizeSetting() {

    const [reload, setReload] = useState(false);

    ShakeDieSizeManager.getInstance().setSettingsUpdater(() => setReload(!reload));

    const menuRef = useRef(null);

    let iconName = ShakeDieSizeManager.getInstance().getShakeDieSizeIcon();

    return (
        <Touchable onPress={() => menuRef.current.open()} foreground={Touchable.Ripple('white')}>
            <View style={styles.SettingContainer} >
                <Icon size={styles.IconConstants.width} name={iconName} color={styles.IconConstants.color}/>
                <Menu ref={menuRef}>
                    <MenuTrigger/>
                    <MenuOptions>
                    {ShakeDieSizeManager.getInstance().ShakeDieSizeList.map((value) => 
                        <MenuOption key={value} style={styles.MenuBackground} onSelect={() => ShakeDieSizeManager.getInstance().setShakeDieSize(value)}>
                            <Text style={styles.MenuText}>{value}</Text>
                        </MenuOption>
                    )}
                    </MenuOptions>
                </Menu>
                <View style={styles.TextContainer}>
                    <Text style={styles.TitleText}>Shake Die Size</Text>
                    <Text style={styles.ValueText}>{ShakeDieSizeManager.getInstance().getShakeDieSizeString()}</Text>
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