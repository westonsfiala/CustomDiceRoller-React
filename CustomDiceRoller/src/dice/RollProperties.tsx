/**
 * Class used to hold all the properties that a die that is added to a roll could use
 * mDieCount - How many die should be rolled, can be any natural number.
 * mModifier - What value to add to each roll, can be any natural number
 * mAdvantageDisadvantage - If the roll should have advantage or disadvantage,
 * negative = disadvantage; 0 = natural; positive = advantage
 * mDropHigh - How many die should be dropped from the highest values of the roll
 * mDropLow - How many die should be dropped from the lowest values of the roll
 * mReRollUnder - If the roll us under this value, it will be rerolled once
 * mMinimumRoll - If the roll us under this value, treat it as this value
 * mExplode - If not zero, when the maximum value of a die is rolled, roll an extra die. Repeating.
 */
export class RollProperties {

    public static readonly rollNaturalValue = 0
    public static readonly rollAdvantageValue = 1
    public static readonly rollDisadvantageValue = -1

    mNumDice: number;
    mModifier: number;
    mAdvantageDisadvantage: number;
    mDropHigh: number;
    mDropLow: number;
    mKeepHigh: number;
    mKeepLow: number;
    mUseReRoll: boolean;
    mReRoll: number;
    mUseMinimumRoll: boolean;
    mMinimumRoll: number;
    mExplode: boolean;


    constructor ({
        numDice = 1,
        modifier = 0,
        advantageDisadvantage = RollProperties.rollNaturalValue,
        dropHigh = 0,
        dropLow = 0,
        keepHigh = 0,
        keepLow = 0,
        useReRoll = false,
        reRoll = 0,
        useMinimumRoll = false,
        minimumRoll = 0,
        explode = false
        }) 
        {
        this.mNumDice = numDice;
        this.mModifier = modifier;
        this.mAdvantageDisadvantage = advantageDisadvantage;
        this.mDropHigh = dropHigh;
        this.mDropLow = dropLow;
        this.mKeepHigh = keepHigh;
        this.mKeepLow = keepLow;
        this.mUseReRoll = useReRoll;
        this.mReRoll = reRoll;
        this.mUseMinimumRoll = useMinimumRoll;
        this.mMinimumRoll = minimumRoll;
        this.mExplode = explode;
    };

    clone() : RollProperties
    {
        return new RollProperties({
            numDice : this.mNumDice,
            modifier : this.mModifier,
            advantageDisadvantage : this.mAdvantageDisadvantage,
            dropHigh : this.mDropHigh,
            dropLow : this.mDropLow,
            keepHigh : this.mKeepHigh,
            keepLow : this.mKeepLow,
            useReRoll : this.mUseReRoll,
            reRoll : this.mReRoll,
            useMinimumRoll : this.mUseMinimumRoll,
            minimumRoll : this.mMinimumRoll,
            explode : this.mExplode
        });
    }
}