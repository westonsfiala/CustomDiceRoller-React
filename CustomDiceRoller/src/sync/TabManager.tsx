
export default class TabManager {

    static mInstance = null as TabManager;

    mTab = 1;
    mUpdater = null;

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
}