// Contains up to 4 groups of rolls, high valid, high dropped, low valid, low dropped
// High valid will always be filled out and is the actual values in the results
// High dropped are values that were dropped because of dropping the highest/lowest values
// The corresponding low groups are filled out when advantage or disadvantage are in play.
export class RollResults {
    public mRollResults : Map<String, Array<number>>;
    public mDroppedRolls : Map<String, Array<number>>;
    public mReRolledRolls : Map<String, Array<number>>;

    public mStruckRollResults : Map<String, Array<number>>;
    public mStruckDroppedRolls : Map<String, Array<number>>;
    public mStruckReRolledRolls : Map<String, Array<number>>;

    public mRollModifiers : Map<String, number>;

    public mRollMaximumValue : boolean;
    public mRollMinimumValue : boolean;

    constructor() {
        this.mRollResults = new Map<String, Array<number>>();
        this.mDroppedRolls = new Map<String, Array<number>>();
        this.mReRolledRolls = new Map<String, Array<number>>();
    
        this.mStruckRollResults = new Map<String, Array<number>>();
        this.mStruckDroppedRolls = new Map<String, Array<number>>();
        this.mStruckReRolledRolls = new Map<String, Array<number>>();
    
        this.mRollModifiers = new Map<String, number>();
    
        this.mRollMaximumValue = false;
        this.mRollMinimumValue = false;
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

    private sortMapList(rollMap : Map<String, Array<Number>>) {
        for(let rollList of rollMap.values())
        {
            rollList.sort()
        }
    }

    private reverseMapList(rollMap : Map<String, Array<Number>>) {
        for(let rollList of rollMap.values())
        {
            rollList.reverse()
        }
    }
}