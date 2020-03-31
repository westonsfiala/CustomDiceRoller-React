import { RollDisplayHelper } from "../dice/views/RollDisplayHelper";
import HistoryManager from "./HistoryManager";
import SoundManager from "../hardware/SoundManager";
import { SimpleDie } from "../dice/SimpleDie";

export default class RollResultsManager {

    private static mInstance = null as RollResultsManager;

    private lastHistoryItem = null as RollDisplayHelper;

    static getInstance() : RollResultsManager {
        if(RollResultsManager.mInstance === null) {
            RollResultsManager.mInstance = new RollResultsManager();
        }

        return this.mInstance;
    }

    private constructor() {
        this.lastHistoryItem = HistoryManager.getInstance().getLastRoll();
    }
    
    playCritSounds() {
        let newHistoryItem = HistoryManager.getInstance().getLastRoll();
        if(this.lastHistoryItem != HistoryManager.getInstance().getLastRoll())
        {
            this.lastHistoryItem = newHistoryItem;
            // Check for rolling critical success or critical failures
            // TODO: generalize this
            if(this.lastHistoryItem.storedResults.mRollResults.size == 1) {
                let d20SaveString = JSON.stringify(new SimpleDie("d20", 20));
                if(this.lastHistoryItem.storedResults.mRollResults.has(d20SaveString)) {
                    let results = this.lastHistoryItem.storedResults.mRollResults.get(d20SaveString);
                    if(results.length == 1) {
                        if(results[0] == 20) {
                            SoundManager.getInstance().playAirHorn();
                        } else if(results[0] == 1) {
                            SoundManager.getInstance().playWilhelm();
                        }
                    }
                }
            }
        }
    }
}