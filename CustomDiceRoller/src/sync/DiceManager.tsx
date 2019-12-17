
import {Die, DieLoadError} from '../dice/Die'
import {SimpleDie} from '../dice/SimpleDie'

import AsyncStorage from '@react-native-community/async-storage';
import { createUnknownDie } from '../dice/DieFactory';

const DiceKey = 'DicePoolKey';

const standardDice = [
    new SimpleDie('d2', 2),
    new SimpleDie('d4', 4),
    new SimpleDie('d6', 6),
    new SimpleDie('d8', 8),
    new SimpleDie('d10', 10),
    new SimpleDie('d12', 12),
    new SimpleDie('d20', 20),
    new SimpleDie('d100', 100)
];

export default class DiceManager {

    static mInstance = null as DiceManager;

    mDice = [] as Array<Die>;
    mUpdater = null

    static getInstance() : DiceManager {
        if(DiceManager.mInstance === null) {
            DiceManager.mInstance = new DiceManager();
        }

        return this.mInstance;
    }

    private constructor() {
        this.getDiceStorage().then((dice) => this.setDice(dice))
    }

    setUpdater(updater : () => void) {
        this.mUpdater = updater;
    }

    getDice() : Array<Die> {
        return this.mDice;
    }

    setDice(dice : Array<Die>) {
        dice.sort((dieA, dieB) => dieA.average - dieB.average)
        this.setDiceStorage(dice).then((dice) => {
            this.mDice = dice
            if(this.mUpdater !== null) this.mUpdater();
        });
    }
    
    hasDieByName(possibleDie: Die) : boolean {
        for(let dieIndex = 0; dieIndex < this.mDice.length; ++dieIndex) {
            let currentDie = this.mDice[dieIndex]

            if(currentDie.displayName === possibleDie.displayName) {
                return true;
            }
        }

        return false;
    }

    resetDice() {
        this.setDice(standardDice.concat());
    }

    addDie(newDie: Die, supressUpdate : boolean = false) : boolean {
        let added = false;

        if(!this.hasDieByName(newDie))
        {
            this.mDice.push(newDie)
            added = true;
        }
        else 
        {
            // TODO: tell the user when something goes wrong.
        }

        if(!supressUpdate) this.setDice(this.mDice);

        return added;
    }

    removeDie(clickedDie: Die, supressUpdate : boolean = false) : boolean {
        let removed = false;

        for(let dieIndex = 0; dieIndex < this.mDice.length; ++dieIndex) {
            let currentDie = this.mDice[dieIndex]

            if(currentDie.displayName === clickedDie.displayName) {
                this.mDice.splice(dieIndex, 1)
                removed = true;
            }
        }

        if(!supressUpdate) this.setDice(this.mDice);

        return removed;
    }

    editDie(originalDie: Die, newDie: Die) : boolean {
        let edited = false;

        if(this.removeDie(originalDie, true)) {
            if(this.addDie(newDie, true)) {
                edited = true
            } else {
                this.addDie(originalDie, true);
            }
        }

        this.setDice(this.mDice);

        return edited;
    }

    private async setDiceStorage(dice: Array<Die>) : Promise<Array<Die>> {
        await AsyncStorage.setItem(DiceKey, JSON.stringify(dice));
        return dice;
    }
    
    private async getDiceStorage() : Promise<Array<Die>> {
        const diceArrayString = await AsyncStorage.getItem(DiceKey);
    
        // If we don't have the value, or its empty, set the standard and return it.
        if(diceArrayString === null || diceArrayString.length === 0)
        {
            await this.setDiceStorage(standardDice.concat());
            return standardDice.concat();
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
}