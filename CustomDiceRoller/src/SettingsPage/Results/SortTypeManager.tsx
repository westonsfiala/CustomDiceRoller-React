import AsyncStorage from "@react-native-community/async-storage";

const SortTypeKey = 'SortTypeKey';

export default class SortTypeManager {

    private static mInstance = null as SortTypeManager;

    readonly sortTypeList = ['Ascending', 'Natural', 'Descending'];
    private mSortTypeIndex = 1;
    private mSettingsUpdater = null;
    private mUpdater = null;

    static getInstance() : SortTypeManager {
        if(SortTypeManager.mInstance === null) {
            SortTypeManager.mInstance = new SortTypeManager();
        }

        return this.mInstance;
    }

    private constructor() {
        this.retrieveSortType().then((sortType) => {
            this.mSortTypeIndex = sortType;
        });
    }

    sortAscending() : boolean {
        return this.mSortTypeIndex === 0;
    }

    sortDescending() : boolean {
        return this.mSortTypeIndex === 2;
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

    setSortTypeIndex(sortTypeIndex : number) {
        let safeIndex = sortTypeIndex;
        if(safeIndex < 0) safeIndex = 0;
        if(safeIndex > 2) safeIndex = 2;
        this.saveSortType(safeIndex).then((value) => {
            this.mSortTypeIndex = value;
            this.runUpdaters();
        });
    }

    getSortTypeString() : string {
        return this.sortTypeList[this.mSortTypeIndex];
    }

    private async saveSortType(sortTypeIndex : number) : Promise<number> {
        await AsyncStorage.setItem(SortTypeKey, sortTypeIndex.toString());
        return sortTypeIndex;
    }

    private async retrieveSortType() : Promise<number> {
        const sortTypeIndexString = await AsyncStorage.getItem(SortTypeKey);
        if(sortTypeIndexString === null) { return 1; }

        try {
            return Number.parseInt(sortTypeIndexString);
        } catch {
            return 1;
        }
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

export function SortSetting() {

    const [reload, setReload] = useState(false);

    SortTypeManager.getInstance().setSettingsUpdater(() => setReload(!reload));

    const menuRef = useRef(null);

    return (
        <Touchable onPress={() => menuRef.current.open()} foreground={Touchable.Ripple('white')}>
            <View style={styles.SettingContainer} >
                <Icon size={styles.IconConstants.width} name='sort' color={styles.IconConstants.color}/>
                <Menu ref={menuRef}>
                    <MenuTrigger/>
                    <MenuOptions>
                    {SortTypeManager.getInstance().sortTypeList.map((value, index) => 
                        <MenuOption key={index} style={styles.MenuBackground} onSelect={() => SortTypeManager.getInstance().setSortTypeIndex(index)}>
                            <Text style={styles.MenuText}>{value}</Text>
                        </MenuOption>
                    )}
                    </MenuOptions>
                </Menu>
                <View style={styles.TextContainer}>
                    <Text style={styles.TitleText}>Sort Type</Text>
                    <Text style={styles.ValueText}>{SortTypeManager.getInstance().getSortTypeString()}</Text>
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