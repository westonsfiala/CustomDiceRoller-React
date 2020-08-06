export default class AboutManager {

    private static mInstance = null as AboutManager;

    private mAboutShower = null as (show: boolean) => void;

    static getInstance() : AboutManager {
        if(AboutManager.mInstance === null) {
            AboutManager.mInstance = new AboutManager();
        }

        return this.mInstance;
    }

    private constructor() { }

    setAboutShower(updater : (show: boolean) => void) {
        this.mAboutShower = updater;
    }

    showAboutDialog() {
        if(this.mAboutShower !== null) this.mAboutShower(true);
    }

    hideAboutDialog() {
        if(this.mAboutShower !== null) this.mAboutShower(false);
    }
}