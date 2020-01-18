import AsyncStorage from "@react-native-community/async-storage";

const DieThemeKey = 'DieThemeKey';

export default class ThemeManager {

    private static mInstance = null as ThemeManager;

    // If you update any of these lists, update DieImageGetter as well.
    readonly BasicDieThemeList = [
        'White', 
        'Fire', 
        'Forest', 
        'Beach', 
        'RGB',
        'Rainbow',
    ];

    readonly MetallicDieThemeList = [
        'Steel', 
        'Gold', 
    ];

    readonly IceCreamDieThemeList = [
        'Creamsicle', 
        'Mint Chocolate', 
        'Rainbow Sherbert', 
        'Superman', 
    ];

    private mDieTheme = this.BasicDieThemeList[0];
    private mSettingsUpdater = null;
    private mSimplePageUpdater = null;
    private mCustomPageUpdater = null;

    static getInstance() : ThemeManager {
        if(ThemeManager.mInstance === null) {
            ThemeManager.mInstance = new ThemeManager();
        }
        return this.mInstance;
    }

    private constructor() {
        this.retrieveDieTheme().then((dieTheme) => {
            this.setDieTheme(dieTheme);
        });
    }

    setSettingsUpdater(updater : () => void) {
        this.mSettingsUpdater = updater;
    }

    setSimplePageUpdater(updater : () => void) {
        this.mSimplePageUpdater = updater;
    }

    setCustomPageUpdater(updater : () => void) {
        this.mCustomPageUpdater = updater;
    }

    runUpdaters() {
        if(this.mSimplePageUpdater !== null) this.mSimplePageUpdater();
        if(this.mCustomPageUpdater !== null) this.mCustomPageUpdater();
        if(this.mSettingsUpdater !== null) this.mSettingsUpdater();
    }

    setDieTheme(dieTheme : string) {
        this.saveDieTheme(dieTheme).then((value) => {
            this.mDieTheme = value;
            this.runUpdaters();
        });
    }

    getDieThemeString() : string {
        return this.mDieTheme;
    }

    private async saveDieTheme(dieTheme : string) : Promise<string> {
        await AsyncStorage.setItem(DieThemeKey, dieTheme.toString());
        return dieTheme;
    }

    private async retrieveDieTheme() : Promise<string> {
        const dieTheme = await AsyncStorage.getItem(DieThemeKey);
        if(dieTheme === null) { return this.BasicDieThemeList[0]; }
        return dieTheme;
    }
}