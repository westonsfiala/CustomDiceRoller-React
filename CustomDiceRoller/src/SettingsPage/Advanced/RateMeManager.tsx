import AsyncStorage from "@react-native-async-storage/async-storage";

const FirstOpenedAppKey = 'FirstOpenedAppKey';
const HasRatedKey = 'HasRatedKey';

export default class RateMeManager {

    private static mInstance = null as RateMeManager;

    static getInstance() : RateMeManager {
        if(RateMeManager.mInstance === null) {
            RateMeManager.mInstance = new RateMeManager();
        }

        return this.mInstance;
    }

    async shouldPopUpRateDialog() : Promise<boolean> {

        let shouldDisplayDialog = false;
        let hasRated = await this.retrieveHasRated();
        
        if(!hasRated) {
            let firstOpenDate = await this.retrieveFirstOpenAppDate();
            let currentDate = Date.now();

            let dateDiff = currentDate - firstOpenDate;

            // Time is in milliseconds. We want to wait 2 days after first open to try and pop up the dialog.
            if(dateDiff > 86400000*2)
            {
                shouldDisplayDialog = true;
                this.saveHasRated(true);
            }
        }

        return shouldDisplayDialog;
    }

    private async saveFirstOpenAppDate(firstOpenDate : number) : Promise<number> {
        await AsyncStorage.setItem(FirstOpenedAppKey, firstOpenDate.toString());
        return firstOpenDate;
    }

    private async retrieveFirstOpenAppDate() : Promise<number> {
        let firstOpenedDateString = await AsyncStorage.getItem(FirstOpenedAppKey);
        if(firstOpenedDateString === null) { 
            let currentDate = Date.now();
            firstOpenedDateString = currentDate.toString();
            await this.saveFirstOpenAppDate(currentDate)
        }
        return Number.parseInt(firstOpenedDateString);
    }

    private async saveHasRated(hasRated : boolean) : Promise<boolean> {
        await AsyncStorage.setItem(HasRatedKey, hasRated.toString());
        return hasRated;
    }

    private async retrieveHasRated() : Promise<boolean> {
        let hasRatedString = await AsyncStorage.getItem(HasRatedKey);
        if(hasRatedString === null) { return false; }
        return hasRatedString == 'true';
    }
}