import AsyncStorage from '@react-native-community/async-storage';
import { createRoll } from '../dice/RollFactory';
import { Roll } from '../dice/Roll';

const RollKey = 'RollPoolKey';

export default class RollManager {

    static mInstance = null as RollManager;

    mRolls = [] as Array<Roll>;
    mUpdater = null

    static getInstance() : RollManager {
        if(RollManager.mInstance === null) {
            RollManager.mInstance = new RollManager();
        }

        return this.mInstance;
    }

    private constructor() {
        this.getRollStorage().then((rolls) => this.setRolls(rolls))
    }

    setUpdater(updater : () => void) {
        this.mUpdater = updater;
    }

    getRolls() : Array<Roll> {
        return this.mRolls;
    }

    setRolls(rolls : Array<Roll>) {
        rolls.sort((rollA, rollB) => {return ('' + rollA.mRollName).localeCompare(rollB.mRollName);})
        this.setRollStorage(rolls).then((rolls) => {
            this.mRolls = rolls;
            if(this.mUpdater !== null) this.mUpdater();
        });
    }
    
    hasRollByNameCategory(possibleRoll: Roll) : boolean {
        for(let rollIndex = 0; rollIndex < this.mRolls.length; ++rollIndex) {
            let currentRoll = this.mRolls[rollIndex]

            if(currentRoll.displayName === possibleRoll.displayName && currentRoll.categoryName === possibleRoll.categoryName) {
                return true;
            }
        }

        return false;
    }

    resetRolls() {
        this.setRolls([]);
    }

    addRoll(newRoll: Roll, supressUpdate : boolean = false) : boolean {
        let added = false;

        if(!this.hasRollByNameCategory(newRoll))
        {
            this.mRolls.push(newRoll)
            added = true;
        }
        else 
        {
            // TODO: tell the user when something goes wrong.
        }

        if(!supressUpdate) this.setRolls(this.mRolls);

        return added;
    }

    removeRoll(removedRoll: Roll, supressUpdate : boolean = false) : boolean {
        let removed = false;

        for(let rollIndex = 0; rollIndex < this.mRolls.length; ++rollIndex) {
            let currentRoll = this.mRolls[rollIndex]

            if(currentRoll.displayName === removedRoll.displayName) {
                this.mRolls.splice(rollIndex, 1)
                removed = true;
            }
        }

        if(!supressUpdate) this.setRolls(this.mRolls);

        return removed;
    }

    editRoll(originalRoll: Roll, newRoll: Roll) : boolean {
        let edited = false;

        if(this.removeRoll(originalRoll, true)) {
            if(this.addRoll(newRoll, true)) {
                edited = true
            } else {
                this.addRoll(originalRoll, true);
            }
        }

        this.setRolls(this.mRolls);

        return edited;
    }

    private async setRollStorage(rolls: Array<Roll>) : Promise<Array<Roll>> {

        let rollsString = JSON.stringify(rolls);

        await AsyncStorage.setItem(RollKey, rollsString);
        return rolls;
    }
    
    private async getRollStorage() : Promise<Array<Roll>> {
        const rollArrayString = await AsyncStorage.getItem(RollKey);
    
        // If we don't have the value, or its empty, set the standard and return it.
        if(rollArrayString === null || rollArrayString.length === 0)
        {
            await this.setRollStorage([]);
            return [];
        }
    
        // Parse into an array and start creating the rolls from it.
        const rollArray = JSON.parse(rollArrayString) as Array<object>;
    
        let returnRollArray = Array<Roll>();
    
        for(let index = 0; index < rollArray.length; ++index) {
            let rollObject = rollArray[index];
            let rollString = JSON.stringify(rollObject);
            try{
                // You have to re-stringify since it treats all of the parsed items as objects.
                let createdRoll = createRoll(rollString)
                returnRollArray.push(createdRoll);
            } catch (error) {
                // TODO: What to do when it goes wrong?
                console.log("error recreating roll");
            }
        }
    
        returnRollArray.sort((rollA, rollB) => {return (rollA.mRollName).localeCompare(rollB.mRollName);})
    
        return returnRollArray;
    }
}