import AsyncStorage from "@react-native-community/async-storage";

const DieSizeKey = 'DieSizeKey';

export default class DieSizeManager {

    private static mInstance = null as DieSizeManager;

    readonly DieSizeList = ['Tiny', 'Small', 'Medium', 'Large', 'Huge'];
    private mDieSizeIndex = 2;
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
            this.mDieSizeIndex = dieSize;
        });
    }
    
    get itemsPerRow() : number {
        // 6 is an arbitrary number that works.
        return 6 - this.mDieSizeIndex
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

    setDieSizeIndex(dieSizeIndex : number) {
        this.saveDieSize(dieSizeIndex).then((value) => {
            this.mDieSizeIndex = value;
            this.runUpdaters();
        });
    }

    getDieSizeString() : string {
        return this.DieSizeList[this.mDieSizeIndex];
    }

    private async saveDieSize(dieSize : number) : Promise<number> {
        await AsyncStorage.setItem(DieSizeKey, dieSize.toString());
        return dieSize;
    }

    private async retrieveDieSize() : Promise<number> {
        const dieSize = await AsyncStorage.getItem(DieSizeKey);
        if(dieSize === null) { return 2; }
        return Number.parseInt(dieSize);
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
                    {DieSizeManager.getInstance().DieSizeList.map((value, index) => 
                        <MenuOption key={index} style={styles.MenuBackground} onSelect={() => DieSizeManager.getInstance().setDieSizeIndex(index)}>
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