import { RollProperties } from "../RollProperties";

// Contains up to 4 groups of rolls, high valid, high dropped, low valid, low dropped
// High valid will always be filled out and is the actual values in the results
// High dropped are values that were dropped because of dropping the highest/lowest values
// The corresponding low groups are filled out when advantage or disadvantage are in play.
export class RollResults {
    public mRollResults : Map<string, Array<any>>;
    public mDroppedRolls : Map<string, Array<any>>;
    public mReRolledRolls : Map<string, Array<any>>;

    public mStruckRollResults : Map<string, Array<any>>;
    public mStruckDroppedRolls : Map<string, Array<any>>;
    public mStruckReRolledRolls : Map<string, Array<any>>;

    public mRollProperties : Map<string, RollProperties>;

    constructor() {
        this.mRollResults = new Map<string, Array<any>>();
        this.mDroppedRolls = new Map<string, Array<any>>();
        this.mReRolledRolls = new Map<string, Array<any>>();
    
        this.mStruckRollResults = new Map<string, Array<any>>();
        this.mStruckDroppedRolls = new Map<string, Array<any>>();
        this.mStruckReRolledRolls = new Map<string, Array<any>>();
    
        this.mRollProperties = new Map<string, RollProperties>();
    }

    getKeys() : Set<string> {

        let retSet = new Set<string>()

        for(let rollKey of this.mRollResults.keys()) {
            retSet.add(rollKey)
        }
        for(let rollKey of this.mDroppedRolls.keys()) {
            retSet.add(rollKey)
        }
        for(let rollKey of this.mReRolledRolls.keys()) {
            retSet.add(rollKey)
        }
        for(let rollKey of this.mStruckRollResults.keys()) {
            retSet.add(rollKey)
        }
        for(let rollKey of this.mStruckDroppedRolls.keys()) {
            retSet.add(rollKey)
        }
        for(let rollKey of this.mStruckReRolledRolls.keys()) {
            retSet.add(rollKey)
        }
        for(let rollKey of this.mRollProperties.keys()) {
            retSet.add(rollKey)
        }

        return retSet;
    }

    sortDescending() {
        this.sortMapList(this.mRollResults)
        this.sortMapList(this.mDroppedRolls)
        this.sortMapList(this.mStruckRollResults)
        this.sortMapList(this.mStruckDroppedRolls)

        this.reverseMapList(this.mRollResults)
        this.reverseMapList(this.mDroppedRolls)
        this.reverseMapList(this.mStruckRollResults)
        this.reverseMapList(this.mStruckDroppedRolls)
    }

    sortAscending() {
        this.sortMapList(this.mRollResults)
        this.sortMapList(this.mDroppedRolls)
        this.sortMapList(this.mStruckRollResults)
        this.sortMapList(this.mStruckDroppedRolls)
    }

    private sortMapList(rollMap : Map<string, Array<any>>) {
        for(let rollList of rollMap.values())
        {
            rollList.sort((a,b) => a-b);
        }
    }

    private reverseMapList(rollMap : Map<string, Array<any>>) {
        for(let rollList of rollMap.values())
        {
            rollList.reverse()
        }
    }
}