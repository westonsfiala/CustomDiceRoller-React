
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
    let dieMap = rollJson.mDieMap

    if(rollName === null || rollCategory === null || dieMap === null)
    {
        throw new DieLoadError();
    }

    let newRoll = new Roll(rollName, rollCategory);

    for(let [key, value] of dieMap)
    {
        let newDie = createUnknownDie(JSON.stringify(key))

        let newRollProperties = new RollProperties({});

        newRollProperties.mNumDice = value.mNumDice || newRollProperties.mNumDice;
        newRollProperties.mModifier = value.mModifier || newRollProperties.mModifier;
        newRollProperties.mAdvantageDisadvantage = value.mAdvantageDisadvantage || newRollProperties.mAdvantageDisadvantage;
        newRollProperties.mDoubleHalve = value.mDoubleHalve || newRollProperties.mDoubleHalve;
        newRollProperties.mDropHigh = value.mDropHigh || newRollProperties.mDropHigh;
        newRollProperties.mDropLow = value.mDropLow || newRollProperties.mDropLow;
        newRollProperties.mKeepHigh = value.mKeepHigh || newRollProperties.mKeepHigh;
        newRollProperties.mKeepLow = value.mKeepLow || newRollProperties.mKeepLow;
        newRollProperties.mReRoll = value.mReRoll || newRollProperties.mReRoll;
        newRollProperties.mMinimumRoll = value.mMinimumRoll || newRollProperties.mMinimumRoll;
        newRollProperties.mExplode = value.mExplode || newRollProperties.mExplode;

        newRoll.addDieToRoll(newDie, newRollProperties);
    }

    return newRoll;
}