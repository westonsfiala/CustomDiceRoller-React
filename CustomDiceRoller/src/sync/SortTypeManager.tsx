import AsyncStorage from "@react-native-community/async-storage";

const SortTypeKey = 'SortTypeKey';

export default class SortTypeManager {

    private static mInstance = null as SortTypeManager;

    readonly sortTypeList = ['Ascending', 'Natural', 'Descending'];
    private mSortType = 'Natural';
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
            this.sortType = sortType;
        });
    }

    sortAscending() : boolean {
        return this.mSortType == this.sortTypeList[0];
    }

    sortDescending() : boolean {
        return this.mSortType == this.sortTypeList[2];
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

    set sortType(sortType : string) {
        this.saveSortType(sortType).then((value) => {
            this.mSortType = value;
            this.runUpdaters();
        });
    }

    get sortType() : string {
        return this.mSortType;
    }

    private async saveSortType(sortType : string) : Promise<string> {
        await AsyncStorage.setItem(SortTypeKey, sortType);
        return sortType;
    }

    private async retrieveSortType() : Promise<string> {
        const sortType = await AsyncStorage.getItem(SortTypeKey);
        if(sortType === null) { return 'Natural'; }
        return sortType;
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
                        <MenuOption key={index} style={styles.MenuBackground} onSelect={() => SortTypeManager.getInstance().sortType = value}>
                            <Text style={styles.MenuText}>{value}</Text>
                        </MenuOption>
                    )}
                    </MenuOptions>
                </Menu>
                <View style={styles.TextContainer}>
                    <Text style={styles.TitleText}>Sort Type</Text>
                    <Text style={styles.ValueText}>{SortTypeManager.getInstance().sortType}</Text>
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