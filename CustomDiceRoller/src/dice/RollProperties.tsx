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

    clone({
        numDice = null,
        modifier = null,
        advantageDisadvantage = null,
        dropHigh = null,
        dropLow = null,
        keepHigh = null,
        keepLow = null,
        useReRoll = null,
        reRoll = null,
        useMinimumRoll = null,
        minimumRoll = null,
        explode = null
        }) : RollProperties
    {
        return new RollProperties({
            numDice : numDice === null ? this.mNumDice : numDice,
            modifier : modifier === null ? this.mModifier : modifier,
            advantageDisadvantage : advantageDisadvantage === null ? this.mAdvantageDisadvantage : advantageDisadvantage,
            dropHigh : dropHigh === null ? this.mDropHigh : dropHigh,
            dropLow : dropLow === null ? this.mDropLow : dropLow,
            keepHigh : keepHigh === null ? this.mKeepHigh : keepHigh,
            keepLow : keepLow === null ? this.mKeepLow : keepLow,
            useReRoll : useReRoll === null ? this.mUseReRoll : useReRoll,
            reRoll : reRoll === null ? this.mReRoll : reRoll,
            useMinimumRoll : useMinimumRoll === null ? this.mUseMinimumRoll : useMinimumRoll,
            minimumRoll : minimumRoll === null ? this.mMinimumRoll : minimumRoll,
            explode : explode === null ? this.mExplode : explode
        });
    }

    numNonDefaultProperties() : number {
        let numNonDefault = 0;

        if(this.mNumDice !== 1) {numNonDefault++}
        if(this.mModifier !== 0) {numNonDefault++}
        if(this.mAdvantageDisadvantage !== RollProperties.rollNaturalValue) {numNonDefault++}
        if(this.mDropHigh !== 0) {numNonDefault++}
        if(this.mDropLow !== 0) {numNonDefault++}
        if(this.mKeepHigh !== 0) {numNonDefault++}
        if(this.mKeepLow !== 0) {numNonDefault++}
        if(this.mUseReRoll !== false) {numNonDefault++}
        if(this.mUseMinimumRoll !== false) {numNonDefault++}
        if(this.mExplode !== false) {numNonDefault++}

        return numNonDefault;
    }
}