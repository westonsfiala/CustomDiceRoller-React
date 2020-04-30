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
 * mCountAboveEqual - Count the number of rolls that are above a threshold
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
    mRepeatRoll: number;
    mDropHigh: number;
    mDropLow: number;
    mKeepHigh: number;
    mKeepLow: number;
    mReRoll: number;
    mMinimumRoll: number;
    mCountAboveEqual: number;
    mExplode: boolean;

    constructor ({
        numDice = 1,
        modifier = 0,
        advantageDisadvantage = RollProperties.rollNaturalValue,
        doubleHalve = RollProperties.rollNaturalValue,
        repeatRoll = 0,
        dropHigh = 0,
        dropLow = 0,
        keepHigh = 0,
        keepLow = 0,
        reRoll = 0,
        minimumRoll = 0,
        countAboveEqual = 0,
        explode = false
        }) 
        {
        this.mNumDice = numDice;
        this.mModifier = modifier;
        this.mAdvantageDisadvantage = advantageDisadvantage;
        this.mDoubleHalve = doubleHalve;
        this.mRepeatRoll = repeatRoll;
        this.mDropHigh = dropHigh;
        this.mDropLow = dropLow;
        this.mKeepHigh = keepHigh;
        this.mKeepLow = keepLow;
        this.mReRoll = reRoll;
        this.mMinimumRoll = minimumRoll;
        this.mCountAboveEqual = countAboveEqual;
        this.mExplode = explode;
    };

    clone({
        numDice = null,
        modifier = null,
        advantageDisadvantage = null,
        doubleHalve = null,
        repeatRoll = null,
        dropHigh = null,
        dropLow = null,
        keepHigh = null,
        keepLow = null,
        reRoll = null,
        minimumRoll = null,
        countAboveEqual = null,
        explode = null
        }) : RollProperties
    {
        return new RollProperties({
            numDice : numDice === null ? this.mNumDice : numDice,
            modifier : modifier === null ? this.mModifier : modifier,
            advantageDisadvantage : advantageDisadvantage === null ? this.mAdvantageDisadvantage : advantageDisadvantage,
            doubleHalve : doubleHalve === null ? this.mDoubleHalve : doubleHalve,
            repeatRoll : repeatRoll === null ? this.mRepeatRoll : repeatRoll,
            dropHigh : dropHigh === null ? this.mDropHigh : dropHigh,
            dropLow : dropLow === null ? this.mDropLow : dropLow,
            keepHigh : keepHigh === null ? this.mKeepHigh : keepHigh,
            keepLow : keepLow === null ? this.mKeepLow : keepLow,
            reRoll : reRoll === null ? this.mReRoll : reRoll,
            minimumRoll : minimumRoll === null ? this.mMinimumRoll : minimumRoll,
            countAboveEqual : countAboveEqual === null ? this.mCountAboveEqual : countAboveEqual,
            explode : explode === null ? this.mExplode : explode
        });
    }

    numNonDefaultProperties() : number {
        let numNonDefault = 0;

        //if(this.mNumDice !== 1) {numNonDefault++}
        //if(this.mModifier !== 0) {numNonDefault++}
        if(this.mAdvantageDisadvantage !== RollProperties.rollNaturalValue) {numNonDefault++}
        if(this.mDoubleHalve !== RollProperties.rollNaturalValue) {numNonDefault++}
        if(this.mRepeatRoll !== 0) {numNonDefault++}
        if(this.mDropHigh !== 0) {numNonDefault++}
        if(this.mDropLow !== 0) {numNonDefault++}
        if(this.mKeepHigh !== 0) {numNonDefault++}
        if(this.mKeepLow !== 0) {numNonDefault++}
        if(this.mReRoll !== 0) {numNonDefault++}
        if(this.mMinimumRoll !== 0) {numNonDefault++}
        if(this.mCountAboveEqual !== 0) {numNonDefault++}
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

export function hasRepeatRoll(props : RollProperties) : boolean {
    return props.mRepeatRoll !== new RollProperties({}).mRepeatRoll
}

export function hasDropHigh(props: RollProperties) : boolean {
    return props.mDropHigh !== new RollProperties({}).mDropHigh
}

export function hasDropLow(props: RollProperties) : boolean {
    return props.mDropLow !== new RollProperties({}).mDropLow
}

export function hasKeepHigh(props: RollProperties) : boolean {
    return props.mKeepHigh !== new RollProperties({}).mKeepHigh
}

export function hasKeepLow(props: RollProperties) : boolean {
    return props.mKeepLow !== new RollProperties({}).mKeepLow
}

export function hasReRoll(props: RollProperties) : boolean {
    return props.mReRoll !== new RollProperties({}).mReRoll
}

export function hasMinimumRoll(props: RollProperties) : boolean {
    return props.mMinimumRoll !== new RollProperties({}).mMinimumRoll
}

export function hasCountAboveEqual(props: RollProperties) : boolean {
    return props.mCountAboveEqual !== new RollProperties({}).mCountAboveEqual
}

export function hasExplode(props: RollProperties) : boolean {
    return props.mExplode !== new RollProperties({}).mExplode
}