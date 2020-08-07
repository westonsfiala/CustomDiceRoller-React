import AsyncStorage from "@react-native-community/async-storage";

const RollContainerSizeKey = 'RollContainerSizeKey';

enum RollContainerSizeEnum {
    Fullscreen,
    DialogBox,
    Minimal
};

export default class RollContainerSizeManager {

    private static mInstance = null as RollContainerSizeManager;

    readonly RollContainerSize = ['Fullscreen', 'Dialog Box', 'Minimal'];

    private mRollContainerSize = this.RollContainerSize[1];
    private mSettingsUpdater = null;
    private mUpdater = null;

    static getInstance() : RollContainerSizeManager {
        if(RollContainerSizeManager.mInstance === null) {
            RollContainerSizeManager.mInstance = new RollContainerSizeManager();
        }

        return this.mInstance;
    }

    private constructor() {
        this.retrieveRollContainerSize().then((rollContainerSize) => {
            this.mRollContainerSize = rollContainerSize;
        });
    }
    
    get rollContainerSize() : RollContainerSizeEnum {
        if(this.isFullscreen) return RollContainerSizeEnum.Fullscreen;
        if(this.isDialogBox) return RollContainerSizeEnum.DialogBox;
        if(this.isMinimal) return RollContainerSizeEnum.Minimal;

        this.setRollContainerSize(this.RollContainerSize[0]);

        return this.rollContainerSize
    }

    get isFullscreen() : boolean {
        return this.mRollContainerSize == this.RollContainerSize[0];
    }

    get isDialogBox() : boolean {
        return this.mRollContainerSize == this.RollContainerSize[1];
    }

    get isMinimal() : boolean {
        return this.mRollContainerSize == this.RollContainerSize[2];
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

    setRollContainerSize(RollContainerSize : string) {
        this.saveRollContainerSize(RollContainerSize).then((value) => {
            this.mRollContainerSize = value;
            this.runUpdaters();
        });
    }

    getRollContainerSizeString() : string {
        return this.mRollContainerSize;
    }

    getRollContainerSizeIcon() : string {
        return 'arrow-top-right-bottom-left';
    }

    private async saveRollContainerSize(RollContainerSize : string) : Promise<string> {
        await AsyncStorage.setItem(RollContainerSizeKey, RollContainerSize.toString());
        return RollContainerSize;
    }

    private async retrieveRollContainerSize() : Promise<string> {
        const RollContainerSize = await AsyncStorage.getItem(RollContainerSizeKey);
        if(RollContainerSize === null) { return this.RollContainerSize[0]; }
        return RollContainerSize;
    }
}

import React, { useRef, useState } from 'react'

import {
    View, 
    Text,
    LayoutAnimation,
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
import { AnimationsEnabledSetting } from "./AnimationsEnabledManager";

export function RollContainerSizeSetting() {

    const [reload, setReload] = useState(false);

    RollContainerSizeManager.getInstance().setSettingsUpdater(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setReload(!reload)
    });

    const menuRef = useRef(null);

    let iconName = RollContainerSizeManager.getInstance().getRollContainerSizeIcon();

    let isMinimalDisplay = RollContainerSizeManager.getInstance().isMinimal;

    return (
        <View>
            <Touchable onPress={() => menuRef.current.open()} foreground={Touchable.Ripple('white')}>
                <View style={styles.SettingContainer} >
                    <Icon size={styles.IconConstants.width} name={iconName} color={styles.IconConstants.color}/>
                    <Menu ref={menuRef}>
                        <MenuTrigger/>
                        <MenuOptions>
                        {RollContainerSizeManager.getInstance().RollContainerSize.map((value) => 
                            <MenuOption key={value} style={styles.MenuBackground} onSelect={() => RollContainerSizeManager.getInstance().setRollContainerSize(value)}>
                                <Text style={styles.MenuText}>{value}</Text>
                            </MenuOption>
                        )}
                        </MenuOptions>
                    </Menu>
                    <View style={styles.TextContainer}>
                        <Text style={styles.TitleText}>Roll Container Size</Text>
                        <Text style={styles.ValueText}>{RollContainerSizeManager.getInstance().getRollContainerSizeString()}</Text>
                    </View>
                </View>
            </Touchable>
            <View style={[ styles.ButtonContainer, {height: isMinimalDisplay ? 0 : null}]}>
                <AnimationsEnabledSetting/>
            </View>
        </View>
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
    ButtonContainer:{
        flexDirection:'column',
        overflow:'hidden',
    },
})