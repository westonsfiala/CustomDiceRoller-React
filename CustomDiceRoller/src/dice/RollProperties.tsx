/**
 * Class used to hold all the properties that a die that is added to a roll could use
 * mDieCount - How many die should be rolled, can be any natural number.
 * mModifier - What value to add to each roll, can be any natural number
 * mAdvantageDisadvantage - If the roll should have advantage or disadvantage,
 * negative = disadvantage; 0 = natural; positive = advantage
 * mDoubleHalve - If the roll total should be doubled or halved (rounded down)
 * negative = halve; 0 = natural; positive = double
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
    
    public static readonly rollDoubleValue = 1
    public static readonly rollHalveValue = -1

    mNumDice: number;
    mModifier: number;
    mAdvantageDisadvantage: number;
    mDoubleHalve: number;
    mDropHigh: number;
    mDropLow: number;
    mKeepHigh: number;
    mKeepLow: number;
    mReRoll: number;
    mMinimumRoll: number;
    mExplode: boolean;

    constructor ({
        numDice = 1,
        modifier = 0,
        advantageDisadvantage = RollProperties.rollNaturalValue,
        doubleHalve = RollProperties.rollNaturalValue,
        dropHigh = 0,
        dropLow = 0,
        keepHigh = 0,
        keepLow = 0,
        reRoll = 0,
        minimumRoll = 0,
        explode = false
        }) 
        {
        this.mNumDice = numDice;
        this.mModifier = modifier;
        this.mAdvantageDisadvantage = advantageDisadvantage;
        this.mDoubleHalve = doubleHalve;
        this.mDropHigh = dropHigh;
        this.mDropLow = dropLow;
        this.mKeepHigh = keepHigh;
        this.mKeepLow = keepLow;
        this.mReRoll = reRoll;
        this.mMinimumRoll = minimumRoll;
        this.mExplode = explode;
    };

    clone({
        numDice = null,
        modifier = null,
        advantageDisadvantage = null,
        doubleHalve = null,
        dropHigh = null,
        dropLow = null,
        keepHigh = null,
        keepLow = null,
        reRoll = null,
        minimumRoll = null,
        explode = null
        }) : RollProperties
    {
        return new RollProperties({
            numDice : numDice === null ? this.mNumDice : numDice,
            modifier : modifier === null ? this.mModifier : modifier,
            advantageDisadvantage : advantageDisadvantage === null ? this.mAdvantageDisadvantage : advantageDisadvantage,
            doubleHalve : doubleHalve === null ? this.mDoubleHalve : doubleHalve,
            dropHigh : dropHigh === null ? this.mDropHigh : dropHigh,
            dropLow : dropLow === null ? this.mDropLow : dropLow,
            keepHigh : keepHigh === null ? this.mKeepHigh : keepHigh,
            keepLow : keepLow === null ? this.mKeepLow : keepLow,
            reRoll : reRoll === null ? this.mReRoll : reRoll,
            minimumRoll : minimumRoll === null ? this.mMinimumRoll : minimumRoll,
            explode : explode === null ? this.mExplode : explode
        });
    }

    numNonDefaultProperties() : number {
        let numNonDefault = 0;

        //if(this.mNumDice !== 1) {numNonDefault++}
        //if(this.mModifier !== 0) {numNonDefault++}
        if(this.mAdvantageDisadvantage !== RollProperties.rollNaturalValue) {numNonDefault++}
        if(this.mDoubleHalve !== RollProperties.rollNaturalValue) {numNonDefault++}
        if(this.mDropHigh !== 0) {numNonDefault++}
        if(this.mDropLow !== 0) {numNonDefault++}
        if(this.mKeepHigh !== 0) {numNonDefault++}
        if(this.mKeepLow !== 0) {numNonDefault++}
        if(this.mReRoll !== 0) {numNonDefault++}
        if(this.mMinimumRoll !== 0) {numNonDefault++}
        if(this.mExplode) {numNonDefault++}

        return numNonDefault;
    }
}

export function isAdvantage(props : RollProperties) : boolean {
    return props.mAdvantageDisadvantage === RollProperties.rollAdvantageValue;
}

export function isDisadvantage(props : RollProperties) : boolean {
    return props.mAdvantageDisadvantage === RollProperties.rollDisadvantageValue;
}

export function isDouble(props : RollProperties) : boolean {
    return props.mDoubleHalve === RollProperties.rollDoubleValue;
}

export function isHalve(props : RollProperties) : boolean {
    return props.mDoubleHalve === RollProperties.rollHalveValue;
}