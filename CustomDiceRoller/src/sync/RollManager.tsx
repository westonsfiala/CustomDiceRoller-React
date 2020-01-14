import AsyncStorage from '@react-native-community/async-storage';
import { createRoll } from '../dice/RollFactory';
import { Roll } from '../dice/Roll';

const RollKey = 'RollPoolKey';

const DefaultCategories = [
    'Ability Check',
    'Attack',
    'Critical Hit!',
    'Damage',
    'Saving Throw',
    'Spell',
    'Category/Sub-Category'
]

export default class RollManager {

    private static mInstance = null as RollManager;

    private mRolls = [] as Array<Roll>;
    private mUpdater = null;

    static getInstance() : RollManager {
        if(RollManager.mInstance === null) {
            RollManager.mInstance = new RollManager();
        }

        return this.mInstance;
    }

    private constructor() {
        this.getRollStorage().then((rolls) => this.setRolls(rolls));
    }

    private rollSorter(rollA: Roll, rollB: Roll) {
        return (rollA.categoryName + rollA.mRollName).localeCompare(rollB.categoryName + rollB.mRollName);
    }

    setUpdater(updater : () => void) {
        this.mUpdater = updater;
    }

    getRolls() : Array<Roll> {
        return this.mRolls;
    }

    private getCategorySet() : Set<string> {
        let categories = new Set<string>();

        for(let roll of this.mRolls) {
            categories.add(roll.categoryName);
        }

        return categories;
    }

    getExistingCategories() : Array<string> {
        let returnCategories = Array<string>();
        for(let category of this.getCategorySet()) {
            returnCategories.push(category);
        }

        returnCategories.sort();

        return returnCategories;
    }

    getPossibleCategories() : Array<string> {
        
        let categories = this.getCategorySet()
        for(let category of DefaultCategories) {
            categories.add(category);
        }

        let returnCategories = Array<string>();
        for(let category of categories) {
            returnCategories.push(category);
        }

        returnCategories.sort();

        return returnCategories;
    }

    setRolls(rolls : Array<Roll>) {
        rolls.sort(this.rollSorter)
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

    addRoll(newRoll: Roll, force: boolean = false) {
        return this.addRollInternal(newRoll, force, false);
    }

    private addRollInternal(newRoll: Roll, force: boolean, supressUpdate : boolean) : boolean {
        let added = false;

        if(!this.hasRollByNameCategory(newRoll))
        {
            this.mRolls.push(newRoll)
            added = true;
        }
        else 
        {
            if(force) {
                this.removeRollInternal(newRoll, supressUpdate);
                added = this.addRollInternal(newRoll, true, supressUpdate);
            }
        }

        if(!supressUpdate) this.setRolls(this.mRolls);

        return added;
    }
    
    removeRoll(removedRoll: Roll) : boolean {
        return this.removeRollInternal(removedRoll, false)
    }

    private removeRollInternal(removedRoll: Roll, supressUpdate : boolean) : boolean {
        let removed = false;

        for(let rollIndex = 0; rollIndex < this.mRolls.length; ++rollIndex) {
            let currentRoll = this.mRolls[rollIndex]

            if(currentRoll.displayName === removedRoll.displayName && currentRoll.categoryName === removedRoll.categoryName) {
                this.mRolls.splice(rollIndex, 1)
                removed = true;
            }
        }

        if(!supressUpdate) this.setRolls(this.mRolls);

        return removed;
    }

    editRoll(originalRoll: Roll, newRoll: Roll, force: boolean = false) : boolean {
        let edited = false;

        if(this.removeRollInternal(originalRoll, true)) {
            if(this.addRollInternal(newRoll, force, true)) {
                edited = true
            } else {
                this.addRollInternal(originalRoll, force, true);
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
    
        returnRollArray.sort(this.rollSorter)
    
        return returnRollArray;
    }
}