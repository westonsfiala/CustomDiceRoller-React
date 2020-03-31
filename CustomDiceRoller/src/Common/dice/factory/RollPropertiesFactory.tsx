
import { RollProperties } from '../RollProperties';

export function createRollProperties(rollPropertiesString: string) : RollProperties {
    let propertiesJson = JSON.parse(rollPropertiesString) as RollProperties;
    
    let newRollProperties = new RollProperties({});

    if(propertiesJson === null) { return newRollProperties; }

    newRollProperties.mNumDice = propertiesJson.mNumDice || newRollProperties.mNumDice;
    newRollProperties.mModifier = propertiesJson.mModifier || newRollProperties.mModifier;
    newRollProperties.mAdvantageDisadvantage = propertiesJson.mAdvantageDisadvantage || newRollProperties.mAdvantageDisadvantage;
    newRollProperties.mDoubleHalve = propertiesJson.mDoubleHalve || newRollProperties.mDoubleHalve;
    newRollProperties.mRepeatRoll = propertiesJson.mRepeatRoll || newRollProperties.mRepeatRoll;
    newRollProperties.mDropHigh = propertiesJson.mDropHigh || newRollProperties.mDropHigh;
    newRollProperties.mDropLow = propertiesJson.mDropLow || newRollProperties.mDropLow;
    newRollProperties.mKeepHigh = propertiesJson.mKeepHigh || newRollProperties.mKeepHigh;
    newRollProperties.mKeepLow = propertiesJson.mKeepLow || newRollProperties.mKeepLow;
    newRollProperties.mReRoll = propertiesJson.mReRoll || newRollProperties.mReRoll;
    newRollProperties.mMinimumRoll = propertiesJson.mMinimumRoll || newRollProperties.mMinimumRoll;
    newRollProperties.mExplode = propertiesJson.mExplode || newRollProperties.mExplode;

    return newRollProperties;
}