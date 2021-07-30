import AsyncStorage from "@react-native-async-storage/async-storage";
import Color from "color";

const DieTintEnabledKey = 'DieTintEnabledKey';
const DieTintColorKey = 'DieTintColorKey';

export default class DieTintManager {

    private static mInstance = null as DieTintManager;

    private mDieTintEnabled = false;
    private mDieTintColor = Color.rgb(255,0,0,0.5);
    private mSettingsUpdater = null;
    private mSimplePageUpdater = null;
    private mCustomPageUpdater = null;

    static getInstance() : DieTintManager {
        if(DieTintManager.mInstance === null) {
            DieTintManager.mInstance = new DieTintManager();
        }

        return this.mInstance;
    }

    private constructor() {
        this.retrieveDieTintEnabled().then((tintEnabled: boolean) => {
            this.mDieTintEnabled = tintEnabled;
        });
        this.retrieveDieTintColor().then((color: Color) => {
            this.mDieTintColor = color;
        });
    }

    get DieTintEnabled() : boolean {
        return this.mDieTintEnabled;
    }
    
    get DieTintColor() : Color {
        return this.mDieTintColor;
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

    runSettingsUpdater() {
        if(this.mSettingsUpdater !== null) this.mSettingsUpdater();
    }

    setDieTintEnabled(DieTintEnabled : boolean) {
        this.saveDieTintEnabled(DieTintEnabled).then((value: boolean) => {
            this.mDieTintEnabled = value;
            this.runUpdaters();
        });
    }

    private async saveDieTintEnabled(DieTintEnabled : boolean) : Promise<boolean> {
        await AsyncStorage.setItem(DieTintEnabledKey, DieTintEnabled.toString());
        return DieTintEnabled;
    }

    private async retrieveDieTintEnabled() : Promise<boolean> {
        const DieTintEnabled = await AsyncStorage.getItem(DieTintEnabledKey);
        if(DieTintEnabled === null) { return false; }
        return DieTintEnabled == 'true';
    }

    setDieTintAlpha(DieTintAlpha : number, runAllUpdaters: boolean) {
        let newColor = Color.rgb(this.mDieTintColor.red(), this.mDieTintColor.green(), this.mDieTintColor.blue(), DieTintAlpha);
        this.setDieTintColor(newColor, runAllUpdaters);
    }

    setDieTintRed(DieTintRed : number, runAllUpdaters: boolean) {
        let newColor = Color.rgb(DieTintRed, this.mDieTintColor.green(), this.mDieTintColor.blue(), this.mDieTintColor.alpha());
        this.setDieTintColor(newColor, runAllUpdaters);
    }

    setDieTintGreen(DieTintGreen : number, runAllUpdaters: boolean) {
        let newColor = Color.rgb(this.mDieTintColor.red(), DieTintGreen, this.mDieTintColor.blue(), this.mDieTintColor.alpha());
        this.setDieTintColor(newColor, runAllUpdaters);
    }

    setDieTintBlue(DieTintBlue : number, runAllUpdaters: boolean) {
        let newColor = Color.rgb(this.mDieTintColor.red(), this.mDieTintColor.green(), DieTintBlue, this.mDieTintColor.alpha());
        this.setDieTintColor(newColor, runAllUpdaters);
    }

    setDieTintColor(DieTintColor : Color, runAllUpdaters: boolean) {
        this.saveDieTintColor(DieTintColor).then((value: Color) => {
            this.mDieTintColor = value;
            if(runAllUpdaters) {
                this.runUpdaters();
            }
            else {
                this.runSettingsUpdater();
            }
        });
    }

    private async saveDieTintColor(DieTintColor : Color) : Promise<Color> {
        await AsyncStorage.setItem(DieTintColorKey, JSON.stringify(DieTintColor));
        return DieTintColor;
    }

    private async retrieveDieTintColor() : Promise<Color> {
        const DieTintColor = await AsyncStorage.getItem(DieTintColorKey);
        if(DieTintColor === null) { return Color.rgb(255,0,0,0.5); }
        const colorParams = JSON.parse(DieTintColor);
        let newColor = Color.rgb(colorParams.color).alpha(colorParams.valpha)
        return newColor;
    }
}