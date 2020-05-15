
import { Die, DieLoadError } from '../Die'
import { SimpleDie } from '../SimpleDie'
import { MinMaxDie } from '../MinMaxDie'
import { ImbalancedDie } from '../ImbalancedDie';
import { WordDie } from '../WordDie';

export function createUnknownDie(dieString: string) : Die {

    let dieJson = JSON.parse(dieString);

    if(dieJson.mDieType === SimpleDie.simpleDieIdentifier) {
        return createSimpleDie(dieJson)
    } else if(dieJson.mDieType === MinMaxDie.minMaxDieIdentifier) {
        return createMinMaxDie(dieJson)
    } else if(dieJson.mDieType === ImbalancedDie.imbalancedIdentifier) {
        return createImbalancedDie(dieJson)
    } else if(dieJson.mDieType === WordDie.wordIdentifier) {
        return createWordDie(dieJson)
    } 

    // If we do not match the types that we support, give up!
    throw new DieLoadError();
}

export function cloneDie(die: Die, newName: string) : Die {
    let newDie = createUnknownDie(JSON.stringify(die))
    newDie.mDieName = newName;
    return newDie;
}

function createSimpleDie(dieJson: SimpleDie) : SimpleDie 
{
    let dieName = dieJson.mDieName;
    let dieNumber = dieJson.mDie;

    if(dieName === null || dieNumber === null) {
        throw new DieLoadError();
    }

    return new SimpleDie(dieName, dieNumber)
}

function createMinMaxDie(dieJson: MinMaxDie) : MinMaxDie 
{
    let dieName = dieJson.mDieName;
    let dieMin = dieJson.mMinimum;
    let dieMax = dieJson.mMaximum;

    if(dieName === null || dieMin === null || dieMax === null) {
        throw new DieLoadError();
    }

    return new MinMaxDie(dieName, dieMin, dieMax);
}

function createImbalancedDie(dieJson: ImbalancedDie) : ImbalancedDie 
{
    let dieName = dieJson.mDieName;
    let faceArray = dieJson.mFaces;

    if(dieName === null || faceArray === null) {
        throw new DieLoadError();
    }

    return new ImbalancedDie(dieName, faceArray);
}

function createWordDie(dieJson: WordDie) : WordDie 
{
    let dieName = dieJson.mDieName;
    let faceArray = dieJson.mFaces;

    if(dieName === null || faceArray === null) {
        throw new DieLoadError();
    }

    return new WordDie(dieName, faceArray);
}