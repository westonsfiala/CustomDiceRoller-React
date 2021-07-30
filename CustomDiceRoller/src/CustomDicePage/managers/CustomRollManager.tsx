import AsyncStorage from '@react-native-async-storage/async-storage';

import { Die } from '../../Common/dice/Die';
import { cloneDie } from '../../Common/dice/factory/DieFactory';
import { Roll } from '../../Common/dice/Roll';
import { createRoll } from '../../Common/dice/factory/RollFactory';
import { RollProperties } from '../../Common/dice/RollProperties';

const CustomRollKey = 'CustomRollPoolKey';

export default class CustomRollManager {

    private static mInstance = null as CustomRollManager;

    private mRoll = new Roll("Custom Roll", "Temp");
    private mUpdater = null

    static getInstance() : CustomRollManager {
        if(CustomRollManager.mInstance === null) {
            CustomRollManager.mInstance = new CustomRollManager();
        }

        return this.mInstance;
    }

    private constructor() {
        this.getRollStorage().then((roll) => this.setRoll(roll.setNameCategory("Custom Roll", "Temp")));
    }

    setUpdater(updater : () => void) {
        this.mUpdater = updater;
    }

    getRoll() : Roll {
        return this.mRoll;
    }

    setRoll(roll : Roll) {
        this.setRollStorage(roll).then((roll) => {
            this.mRoll = roll;
            if(this.mUpdater !== null) this.mUpdater();
        });
    }

    resetRoll() {
        this.setRoll(new Roll(this.mRoll.displayName, this.mRoll.categoryName));
    }
    
    addDieToRoll(die: Die) {
        let index = 1;
        let originalName = die.displayName;

        while(this.mRoll.containsDie(die))
        {
            die = cloneDie(die, originalName + "(" + index + ")");
            index += 1;
        }

        let newRoll = this.mRoll.addDieToRoll(die, new RollProperties({}))
        this.setRoll(newRoll);
    }

    updateDie(oldDie: Die, newDie: Die) {
        let newRoll = this.mRoll.overrideDieInRoll(oldDie, newDie);
        this.setRoll(newRoll);
    }

    private async setRollStorage(roll: Roll) : Promise<Roll> {

        let rollString = JSON.stringify(roll);

        await AsyncStorage.setItem(CustomRollKey, rollString);
        return roll;
    }
    
    private async getRollStorage() : Promise<Roll> {
        const rollString = await AsyncStorage.getItem(CustomRollKey);
    
        // If we don't have the value, or its empty, set the standard and return it.
        if(rollString === null || rollString.length === 0)
        {
            let newRoll = new Roll("Custom Roll", "Temp");
            await this.setRollStorage(newRoll);
            return newRoll;
        }

        let createdRoll = new Roll("Custom Roll", "Temp");

        try {
            // You have to re-stringify since it treats all of the parsed items as objects.
            createdRoll = createRoll(rollString)
        } catch (error) {
            // TODO: What to do when it goes wrong?
            console.log("error recreating custom roll");
        }
    
        return createdRoll;
    }
}