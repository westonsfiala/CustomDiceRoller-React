export default class TabManager {

    private static mInstance = null as TabManager;

    private mTab = 1;
    private mSecondaryTab = 1;
    private mUpdater = null;

    static getInstance() : TabManager {
        if(TabManager.mInstance === null) {
            TabManager.mInstance = new TabManager();
        }

        return this.mInstance;
    }

    private constructor() {}

    setUpdater(updater : () => void) {
        this.mUpdater = updater;
    }

    set tab(value: number) {
        this.mTab = value;
        if(this.mUpdater !== null) this.mUpdater();
    }

    get tab() : number {
        return this.mTab;
    }

    set secondaryTab(value: number) {
        this.mSecondaryTab = value;
    }

    get secondaryTab() : number {
        return this.mSecondaryTab;
    }

    isOnDiceRollTab() : boolean {
        return this.secondaryTab == 0;
    }
}