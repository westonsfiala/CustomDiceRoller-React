
import { DieLoadError } from './Die'
import { Roll } from './Roll';
import { RollProperties } from './RollProperties';
import { createUnknownDie } from './DieFactory';
import { createRollProperties } from './RollPropertiesFactory';

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
        let newRollProperties = createRollProperties(JSON.stringify(propObject));

        newRoll = newRoll.addDieToRoll(newDie, newRollProperties);
    }

    return newRoll;
}