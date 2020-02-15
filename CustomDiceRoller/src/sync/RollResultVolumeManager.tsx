import AsyncStorage from "@react-native-community/async-storage";

const RollResultVolumeKey = 'RollResultVolumeKey';

export default class RollResultVolumeManager {

    private static mInstance = null as RollResultVolumeManager;

    readonly RollResultVolumeList = ['Off', 'Quiet', 'Normal', 'Loud'];
    private mRollResultVolume = this.RollResultVolumeList[2];
    private mSettingsUpdater = null;
    private mUpdater = null;

    static getInstance() : RollResultVolumeManager {
        if(RollResultVolumeManager.mInstance === null) {
            RollResultVolumeManager.mInstance = new RollResultVolumeManager();
        }

        return this.mInstance;
    }

    private constructor() {
        this.retrieveRollResultVolume().then((rollResultVolume) => {
            this.mRollResultVolume = rollResultVolume;
        });
    }
    
    get volumeModifier() : number {
        // 6 is an arbitrary number that works.
        if(this.mRollResultVolume == this.RollResultVolumeList[0]) return 0;
        if(this.mRollResultVolume == this.RollResultVolumeList[1]) return .1;
        if(this.mRollResultVolume == this.RollResultVolumeList[2]) return .5;
        if(this.mRollResultVolume == this.RollResultVolumeList[3]) return 1;

        this.setRollResultVolume(this.RollResultVolumeList[2]);
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

    setRollResultVolume(dieSize : string) {
        this.saveRollResultVolume(dieSize).then((value) => {
            this.mRollResultVolume = value;
            this.runUpdaters();
        });
    }

    getRollResultVolumeString() : string {
        return this.mRollResultVolume;
    }

    getShakeVolumeIcon() : string {
        if(this.mRollResultVolume == this.RollResultVolumeList[0]) return 'volume-off';
        if(this.mRollResultVolume == this.RollResultVolumeList[1]) return 'volume-low';
        if(this.mRollResultVolume == this.RollResultVolumeList[2]) return 'volume-medium';
        if(this.mRollResultVolume == this.RollResultVolumeList[3]) return 'volume-high';

        return 'volume-medium';
    }

    private async saveRollResultVolume(rollResultVolume : string) : Promise<string> {
        await AsyncStorage.setItem(RollResultVolumeKey, rollResultVolume.toString());
        return rollResultVolume;
    }

    private async retrieveRollResultVolume() : Promise<string> {
        const rollResultVolume = await AsyncStorage.getItem(RollResultVolumeKey);
        if(rollResultVolume === null) { return this.RollResultVolumeList[2]; }
        return rollResultVolume;
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

export function RollResultVolumeSetting() {

    const [reload, setReload] = useState(false);

    RollResultVolumeManager.getInstance().setSettingsUpdater(() => setReload(!reload));

    const menuRef = useRef(null);

    let iconName = RollResultVolumeManager.getInstance().getShakeVolumeIcon();

    return (
        <Touchable onPress={() => menuRef.current.open()} foreground={Touchable.Ripple('white')}>
            <View style={styles.SettingContainer} >
                <Icon size={styles.IconConstants.width} name={iconName} color={styles.IconConstants.color}/>
                <Menu ref={menuRef}>
                    <MenuTrigger/>
                    <MenuOptions>
                    {RollResultVolumeManager.getInstance().RollResultVolumeList.map((value) => 
                        <MenuOption key={value} style={styles.MenuBackground} onSelect={() => RollResultVolumeManager.getInstance().setRollResultVolume(value)}>
                            <Text style={styles.MenuText}>{value}</Text>
                        </MenuOption>
                    )}
                    </MenuOptions>
                </Menu>
                <View style={styles.TextContainer}>
                    <Text style={styles.TitleText}>Critical Sounds</Text>
                    <Text style={styles.ValueText}>{RollResultVolumeManager.getInstance().getRollResultVolumeString()}</Text>
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