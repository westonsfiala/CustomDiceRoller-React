// Contains up to 4 groups of rolls, high valid, high dropped, low valid, low dropped
// High valid will always be filled out and is the actual values in the results
// High dropped are values that were dropped because of dropping the highest/lowest values
// The corresponding low groups are filled out when advantage or disadvantage are in play.
export class RollResults {
    public mRollResults : Map<string, Array<number>>;
    public mDroppedRolls : Map<string, Array<number>>;
    public mReRolledRolls : Map<string, Array<number>>;

    public mStruckRollResults : Map<string, Array<number>>;
    public mStruckDroppedRolls : Map<string, Array<number>>;
    public mStruckReRolledRolls : Map<string, Array<number>>;

    public mRollModifiers : Map<string, number>;

    public mRollMaximumValue : boolean;
    public mRollMinimumValue : boolean;

    constructor() {
        this.mRollResults = new Map<string, Array<number>>();
        this.mDroppedRolls = new Map<string, Array<number>>();
        this.mReRolledRolls = new Map<string, Array<number>>();
    
        this.mStruckRollResults = new Map<string, Array<number>>();
        this.mStruckDroppedRolls = new Map<string, Array<number>>();
        this.mStruckReRolledRolls = new Map<string, Array<number>>();
    
        this.mRollModifiers = new Map<string, number>();
    
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

    private sortMapList(rollMap : Map<string, Array<number>>) {
        for(let rollList of rollMap.values())
        {
            rollList.sort()
        }
    }

    private reverseMapList(rollMap : Map<string, Array<number>>) {
        for(let rollList of rollMap.values())
        {
            rollList.reverse()
        }
    }
}