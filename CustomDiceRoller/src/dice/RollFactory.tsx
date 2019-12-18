
import { DieLoadError } from './Die'
import { Roll } from './Roll';
import { RollProperties } from './RollProperties';
import { createUnknownDie } from './DieFactory';

export function cloneRoll(roll: Roll, newRollName: string, newRollCategory: string) : Roll
{
    let newRoll = createRoll(JSON.stringify(roll))

    newRoll.mRollName = newRollName;
    newRoll.mRollCategory = newRollCategory;

    return newRoll;
}

export function createRoll(rollString: string) : Roll {
    let rollJson = JSON.parse(rollString) as Roll;

    let rollName = rollJson.mRollName
    let rollCategory = rollJson.mRollCategory
    let diePropArray = rollJson.mDiePropArray

    if(rollName === null || rollCategory === null || diePropArray === null)
    {
        throw new DieLoadError();
    }

    let newRoll = new Roll(rollName, rollCategory);

    for(let pair of diePropArray)
    {
        let dieObject = pair.mDie;
        let propObject = pair.mProperties;

        let newDie = createUnknownDie(JSON.stringify(dieObject))

        let newRollProperties = new RollProperties({});

        newRollProperties.mNumDice = propObject.mNumDice || newRollProperties.mNumDice;
        newRollProperties.mModifier = propObject.mModifier || newRollProperties.mModifier;
        newRollProperties.mAdvantageDisadvantage = propObject.mAdvantageDisadvantage || newRollProperties.mAdvantageDisadvantage;
        newRollProperties.mDoubleHalve = propObject.mDoubleHalve || newRollProperties.mDoubleHalve;
        newRollProperties.mDropHigh = propObject.mDropHigh || newRollProperties.mDropHigh;
        newRollProperties.mDropLow = propObject.mDropLow || newRollProperties.mDropLow;
        newRollProperties.mKeepHigh = propObject.mKeepHigh || newRollProperties.mKeepHigh;
        newRollProperties.mKeepLow = propObject.mKeepLow || newRollProperties.mKeepLow;
        newRollProperties.mReRoll = propObject.mReRoll || newRollProperties.mReRoll;
        newRollProperties.mMinimumRoll = propObject.mMinimumRoll || newRollProperties.mMinimumRoll;
        newRollProperties.mExplode = propObject.mExplode || newRollProperties.mExplode;

        newRoll = newRoll.addDieToRoll(newDie, newRollProperties);
    }

    return newRoll;
}