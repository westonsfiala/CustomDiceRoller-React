
import {Die, DieLoadError} from '../dice/Die'
import {SimpleDie} from '../dice/SimpleDie'

import { useAsyncStorage } from '@react-native-community/async-storage';
import { createUnknownDie } from '../dice/DieFactory';

export const standardDice = [
    new SimpleDie('d2', 2),
    new SimpleDie('d4', 4),
    new SimpleDie('d6', 6),
    new SimpleDie('d8', 8),
    new SimpleDie('d10', 10),
    new SimpleDie('d12', 12),
    new SimpleDie('d20', 20),
    new SimpleDie('d100', 100)
];

export async function setAvailableDice(dice: Array<Die>) {
    const { setItem } = useAsyncStorage('DicePoolKey');

    await setItem(JSON.stringify(dice));
}

export async function getAvailableDice() {
    const { getItem } = useAsyncStorage('DicePoolKey');

    const diceArrayString = await getItem();

    // If we don't have the value, or its empty, set the standard and return it.
    if(diceArrayString === null || diceArrayString.length === 0)
    {
        setAvailableDice(standardDice);
        return standardDice;
    }

    // Parse into an array and start creating the dice from it.
    const diceArray = JSON.parse(diceArrayString) as Array<object>;

    let returnDieArray = Array<Die>();

    for(let index = 0; index < diceArray.length; ++index) {
        let dieString = diceArray[index];
        try{
            // You have to re-stringify since it treats all of the parsed items as objects.
            let createdDie = createUnknownDie(JSON.stringify(dieString))
            returnDieArray.push(createdDie);
        } catch (error) {
            // TODO: What to do when it goes wrong?
        }
    }

    returnDieArray.sort((dieA, dieB) => dieA.average - dieB.average)

    return returnDieArray;
}