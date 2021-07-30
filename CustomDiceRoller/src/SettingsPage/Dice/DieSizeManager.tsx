import AsyncStorage from "@react-native-async-storage/async-storage";

const DieSizeKey = 'DieSizeKey';

export default class DieSizeManager {

    private static mInstance = null as DieSizeManager;

    readonly DieSizeList = ['Tiny', 'Small', 'Medium', 'Large', 'Huge'];
    private mDieSize = this.DieSizeList[2];
    private mSettingsUpdater = null;
    private mUpdater = null;

    static getInstance() : DieSizeManager {
        if(DieSizeManager.mInstance === null) {
            DieSizeManager.mInstance = new DieSizeManager();
        }

        return this.mInstance;
    }

    private constructor() {
        this.retrieveDieSize().then((dieSize) => {
            this.mDieSize = dieSize;
        });
    }
    
    get itemsPerRow() : number {
        // 6 is an arbitrary number that works.
        if(this.mDieSize == this.DieSizeList[0]) return 6;
        if(this.mDieSize == this.DieSizeList[1]) return 5;
        if(this.mDieSize == this.DieSizeList[2]) return 4;
        if(this.mDieSize == this.DieSizeList[3]) return 3;
        if(this.mDieSize == this.DieSizeList[4]) return 2;

        this.setDieSize(this.DieSizeList[2]);
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

    setDieSize(dieSize : string) {
        this.saveDieSize(dieSize).then((value) => {
            this.mDieSize = value;
            this.runUpdaters();
        });
    }

    getDieSizeString() : string {
        return this.mDieSize;
    }

    private async saveDieSize(dieSize : string) : Promise<string> {
        await AsyncStorage.setItem(DieSizeKey, dieSize.toString());
        return dieSize;
    }

    private async retrieveDieSize() : Promise<string> {
        const dieSize = await AsyncStorage.getItem(DieSizeKey);
        if(dieSize === null) { return this.DieSizeList[2]; }
        return dieSize;
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

export function DieSizeSetting() {

    const [reload, setReload] = useState(false);

    DieSizeManager.getInstance().setSettingsUpdater(() => setReload(!reload));

    const menuRef = useRef(null);

    return (
        <Touchable onPress={() => menuRef.current.open()} foreground={Touchable.Ripple('white')}>
            <View style={styles.SettingContainer} >
                <Icon size={styles.IconConstants.width} name='resize' color={styles.IconConstants.color}/>
                <Menu ref={menuRef}>
                    <MenuTrigger/>
                    <MenuOptions>
                    {DieSizeManager.getInstance().DieSizeList.map((value) => 
                        <MenuOption key={value} style={styles.MenuBackground} onSelect={() => DieSizeManager.getInstance().setDieSize(value)}>
                            <Text style={styles.MenuText}>{value}</Text>
                        </MenuOption>
                    )}
                    </MenuOptions>
                </Menu>
                <View style={styles.TextContainer}>
                    <Text style={styles.TitleText}>Die Size</Text>
                    <Text style={styles.ValueText}>{DieSizeManager.getInstance().getDieSizeString()}</Text>
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