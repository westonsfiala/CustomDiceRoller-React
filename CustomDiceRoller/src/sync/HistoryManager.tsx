
import { RollDisplayHelper } from '../dice/views/RollDisplayHelper';
import { Roll } from '../dice/Roll';

export default class HistoryManager {

    private static mInstance = null as HistoryManager;

    private mHistory = Array<RollDisplayHelper>();
    private mRestorableHistory = null as Array<RollDisplayHelper>;

    private mDisplayUpdater = null as () => void;
    private mHistoryUpdater = null as () => void;

    static getInstance() : HistoryManager {
        if(HistoryManager.mInstance === null) {
            HistoryManager.mInstance = new HistoryManager();
        }

        return this.mInstance;
    }

    private constructor() {
        // TODO: Restore history from storage
    }

    setDisplayUpdater(updater : () => void) {
        this.mDisplayUpdater = updater;
    }

    setHistoryUpdater(updater : () => void) {
        this.mHistoryUpdater = updater;
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
        this.runUpdaters();
    }

    clearHistory() {
        if(this.mHistory.length !== 0) {
            this.mRestorableHistory = this.mHistory;
            this.setHistory(Array<RollDisplayHelper>());
        }
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
        if(this.mDisplayUpdater !== null) this.mDisplayUpdater();
    }

    runUpdaters() {
        if(this.mHistoryUpdater !== null) this.mHistoryUpdater();
        if(this.mDisplayUpdater !== null) this.mDisplayUpdater();
    }
}