import AsyncStorage from "@react-native-community/async-storage";

const DiePerRowKey = 'DiePerRowKey';

export default class SettingsManager {

    private static mInstance = null as SettingsManager;

    readonly itemsPerRowList = [2,3,4,5,6,7,8];
    private mItemsPerRow = 4;
    private mUpdater = null;

    static getInstance() : SettingsManager {
        if(SettingsManager.mInstance === null) {
            SettingsManager.mInstance = new SettingsManager();
        }

        return this.mInstance;
    }

    private constructor() {
        this.retrieveItemsPerRow().then((itemsPerRow) => {
            this.mItemsPerRow = itemsPerRow
            if(this.mUpdater !== null) this.mUpdater();
        });
    }

    setUpdater(updater : () => void) {
        this.mUpdater = updater;
    }

    set itemsPerRow(itemsPerRow : number) {
        this.saveItemsPerRow(itemsPerRow).then((itemsPerRow) => {
            this.mItemsPerRow = itemsPerRow
            if(this.mUpdater !== null) this.mUpdater();
        });
    }

    get itemsPerRow() : number {
        return this.mItemsPerRow;
    }

    private async saveItemsPerRow(itemsPerRow : number) : Promise<number> {
        await AsyncStorage.setItem(DiePerRowKey, itemsPerRow.toString());
        return itemsPerRow;
    }

    private async retrieveItemsPerRow() : Promise<number> {
        const itemsPerRow = await AsyncStorage.getItem(DiePerRowKey);
    
        if(itemsPerRow === null) { return 4; }
    
        return Number.parseInt(itemsPerRow);
    }
}