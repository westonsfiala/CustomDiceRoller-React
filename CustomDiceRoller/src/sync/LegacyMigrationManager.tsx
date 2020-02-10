import AsyncStorage from "@react-native-community/async-storage";

import {Clipboard} from 'react-native'
import { Roll } from "../dice/Roll";
import RollManager from "./RollManager";
import { RollProperties } from "../dice/RollProperties";
import { DieLoadError, Die } from "../dice/Die";
import { ImbalancedDie } from "../dice/ImbalancedDie";
import { MinMaxDie } from "../dice/MinMaxDie";
import { SimpleDie } from "../dice/SimpleDie";

const HasMigratedKey = 'LegacyMigrationKey';

const saveSplitStrings = [
    "__DIE_SPLIT__",
    "__ROLL_SPLIT__",
    "__PROP_SPLIT__",
    "__FACE_SPLIT__",
    "__CATEGORY_SPLIT__"];

const dieSplitStringIndex = 0
const rollSplitStringIndex = 1
const rollPropertiesSplitStringIndex = 2
const imbalancedDieSplitStringIndex = 3
const rollCategorySplitStringIndex = 4

const simpleDieStringStart = "Simple"
const minMaxDieStringStart = "MinMax"
const imbalancedDieStringStart = "Imbalanced"

export default class LegacyMigrationManager {

    private static mInstance = null as LegacyMigrationManager;

    private mLastMigrationErrors = Array<string>();
    private mLastMigratedRolls = Array<Roll>();

    static getInstance() : LegacyMigrationManager {
        if(LegacyMigrationManager.mInstance === null) {
            LegacyMigrationManager.mInstance = new LegacyMigrationManager();
        }

        return this.mInstance;
    }

    private constructor() {
        this.retrieveHasMigrated().then((hasMigrated) => {
            if(!hasMigrated) {this.migrate()}
        });
    }
    
    private createUnknownDie(saveString: String) : Die
    {
        if(saveString.startsWith(simpleDieStringStart)) return this.createSimpleDie(saveString);
        if(saveString.startsWith(minMaxDieStringStart)) return this.createMinMaxDie(saveString);
        if(saveString.startsWith(imbalancedDieStringStart)) return this.createImbalancedDie(saveString);

        throw new DieLoadError();
    }

    private createSimpleDie(saveString: String) : SimpleDie
    {
        try {
            let simpleStrings = saveString.split(saveSplitStrings[dieSplitStringIndex]);

            if(simpleStrings.length !== 3) throw new DieLoadError;

            let dieName = simpleStrings[1];
            let dieNumber = Number.parseInt(simpleStrings[2]);

            return new SimpleDie(dieName, dieNumber);
        }
        catch (error)
        {
            this.mLastMigrationErrors.push("Unable to parse simple die.");
            throw new DieLoadError();
        }
    }

    private createMinMaxDie(saveString: String) : MinMaxDie
    {
        try {
            let minMaxStrings = saveString.split(saveSplitStrings[dieSplitStringIndex]);
            
            if(minMaxStrings.length != 4) throw new DieLoadError();

            let name = minMaxStrings[1];
            let min = Number.parseInt(minMaxStrings[2]);
            let max = Number.parseInt(minMaxStrings[3]);

            return new MinMaxDie(name, min, max);
        }
        catch (error)
        {
            this.mLastMigrationErrors.push("Unable to parse min/max die.");
            throw new DieLoadError();
        }
    }

    private createImbalancedDie(saveString: String) : ImbalancedDie
    {
        try {
            let imbalancedStrings = saveString.split(saveSplitStrings[dieSplitStringIndex]);
            
            if(imbalancedStrings.length != 3) throw new DieLoadError();

            let name = imbalancedStrings[1];

            let faceStrings = imbalancedStrings[2].split(saveSplitStrings[imbalancedDieSplitStringIndex]);
            
            let faceList = Array<number>();

            for(let face of faceStrings) {
                faceList.push(Number.parseInt(face));
            }

            return new ImbalancedDie(name, faceList)
        }
        catch (error)
        {
            this.mLastMigrationErrors.push("Unable to parse imbalanced die.");
            throw new DieLoadError()
        }
    }

    private parseLegacyRolls(rollsString: string) : Array<Roll> {
        let migratedRolls = Array<Roll>();
        let rollStrings = Array<string>();

        try{
            // Strip away the "[" & "]"
            let strippedRollString = rollsString.substr(1,rollsString.length-1);
    
            rollStrings = strippedRollString.split(',');
        } catch ( error ) {
            return migratedRolls;
        }
        

        for(let saveString of rollStrings) {
            try {
                let splitSaveString = saveString.split(saveSplitStrings[rollSplitStringIndex]);
    
                // Aggregate;Name;Category;Die;DieProperties(repeat)
                let nameCategorySplit = splitSaveString[1].split(saveSplitStrings[rollCategorySplitStringIndex]);
                let rollName = nameCategorySplit[0];
                let rollCategory = nameCategorySplit[1];
    
                let aggregateRoll = new Roll(rollName, rollCategory);
    
                for(let index = 2; index < splitSaveString.length; index += 2) {
                    let savedInnerDie = this.createUnknownDie(splitSaveString[index])
                    let savedDieProperties = splitSaveString[index + 1].split(saveSplitStrings[rollPropertiesSplitStringIndex])
    
                    let properties = new RollProperties({
                            numDice: Number.parseInt(savedDieProperties[0]), // count
                            modifier: Number.parseInt(savedDieProperties[1]), // modifier
                            advantageDisadvantage: Number.parseInt(savedDieProperties[2]), // advantage/disadvantage
                            dropHigh: Number.parseInt(savedDieProperties[3]), // drop high
                            dropLow: Number.parseInt(savedDieProperties[4]), // drop low
                            keepHigh: Number.parseInt(savedDieProperties[5]), // keep high
                            keepLow: Number.parseInt(savedDieProperties[6]), // keep low
                            reRoll: Number.parseInt(savedDieProperties[8]), // reroll
                            minimumRoll: Number.parseInt(savedDieProperties[10]), // minimum roll
                            explode: savedDieProperties[11] == 'true'  // explode
                    });
                    
                    aggregateRoll = aggregateRoll.addDieToRoll(savedInnerDie, properties);
                }

                migratedRolls.push(aggregateRoll);

            }
            catch (error) {
                this.mLastMigrationErrors.push("Unable to parse rolls.");
            }

        }

        return migratedRolls
    }

    async migrate() : Promise<boolean> {
        this.saveHasMigrated(true);

        let clipString = await Clipboard.getString()
        this.mLastMigrationErrors = Array<string>();
        this.mLastMigratedRolls = Array<Roll>();

        if(clipString == undefined) return false;
        
        try{
            this.mLastMigratedRolls = this.parseLegacyRolls(clipString)
            RollManager.getInstance().addMigratedRolls(this.mLastMigratedRolls)
        } catch (error) {
            this.mLastMigrationErrors.push("Unable to parse rolls. Ensure the copy/paste clipboard has correct information.");
            return false;
        }

        return true;
    }

    getMigratedRolls() : Array<Roll>
    {
        return this.mLastMigratedRolls
    }

    getMigrationErrors() : Array<string>
    {
        return this.mLastMigrationErrors;
    }

    private async saveHasMigrated(hasMigrated : boolean) : Promise<boolean> {
        await AsyncStorage.setItem(HasMigratedKey, hasMigrated.toString());
        return hasMigrated;
    }

    private async retrieveHasMigrated() : Promise<boolean> {
        const hasMigrated = await AsyncStorage.getItem(HasMigratedKey);
        if(hasMigrated === null) { return false; }
        return hasMigrated == 'true';
    }
}