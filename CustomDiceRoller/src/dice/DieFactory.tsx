
import { Die, DieLoadError } from './Die'
import { SimpleDie } from './SimpleDie'

export function createUnknownDie(dieString: string) : Die {

    let dieJson = JSON.parse(dieString);

    if(dieJson.mDieType === SimpleDie.simpleDieIdentifier) {
        return createSimpleDie(dieJson)
    }

    // If we do not match the types that we support, give up!
    throw new DieLoadError();
}

function createSimpleDie(dieJson: Die) : SimpleDie 
{
    let dieName = dieJson.mDieName;
    let dieNumber = dieJson.mDie;

    if(dieName === null || dieNumber === null) {
        throw new DieLoadError();
    }

    return new SimpleDie(dieName, dieNumber)
}