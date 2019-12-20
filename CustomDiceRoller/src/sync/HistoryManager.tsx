
import { RollDisplayHelper } from '../dice/RollDisplayHelper';
import { Roll } from '../dice/Roll';

export default class HistoryManager {

    static mInstance = null as HistoryManager;

    mHistory = Array<RollDisplayHelper>();
    mRestorableHistory = null as Array<RollDisplayHelper>;

    mUpdater = null as () => void;

    static getInstance() : HistoryManager {
        if(HistoryManager.mInstance === null) {
            HistoryManager.mInstance = new HistoryManager();
        }

        return this.mInstance;
    }

    private constructor() {
        // TODO: Restore history from storage
    }

    setUpdater(updater : () => void) {
        this.mUpdater = updater;
    }

    getHistory() : Array<RollDisplayHelper> {
        return this.mHistory;
    }

    getLastRoll() : RollDisplayHelper {
        if(this.mHistory.length !== 0) {
            return this.mHistory[this.mHistory.length-1]
        }

        return new RollDisplayHelper(new Roll('temp', 'temp'));
    }

    canRestoreHistory() : boolean {
        return this.mRestorableHistory !== null;
    }

    setHistory(history : Array<RollDisplayHelper>) {
        // TODO: save the history to storage
        this.mHistory = history
        this.mUpdater();
    }

    clearHistory() {
        this.mRestorableHistory = this.mHistory;
        this.setHistory(Array<RollDisplayHelper>());
    }

    restoreHistory() {
        if(this.mRestorableHistory !== null) {
            this.setHistory(this.mRestorableHistory);
        }
    }

    addToHistory(newHistory: RollDisplayHelper) {
        if(this.mRestorableHistory !== null) {
            this.mRestorableHistory = null;
        }

        this.mHistory.push(newHistory);
        this.mUpdater();
    }
}