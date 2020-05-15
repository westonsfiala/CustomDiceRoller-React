

import { RollResults } from "./RollResults";

import { Roll } from "../Roll"
import { RollProperties, isDouble, isHalve, hasRepeatRoll, hasCountAboveEqual } from "../RollProperties";

import {createUnknownDie} from "../factory/DieFactory"

import {getModifierString, decimalToString} from "../../utility/StringHelper"

import { ColoredDieResults } from "../../views/ColoredDieResults";

import SortTypeManager from "../../../SettingsPage/Results/SortTypeManager";
import ExpectedResultManager from "../../../SettingsPage/Results/ExpectedResultManager";
import { Die } from "../Die";
import { NumberDie } from "../NumberDie";

// Class that performs a roll when constructed and turns that roll into displayable chunks of information.
export class RollDisplayHelper {

    public readonly timeString : string;
    public readonly dateString : string;
    public readonly storedRoll : Roll;
    public readonly storedResults : RollResults;
    public readonly rollNameText : string;
    public readonly rollSum : ColoredDieResults;
    public readonly rollResultsArray : Array<ColoredDieResults>;
    public readonly key : string;

    constructor(roll: Roll) {
        
        let currentDateTime = new Date();
        this.timeString = currentDateTime.toLocaleTimeString();
        this.dateString = currentDateTime.toLocaleDateString();
        this.storedRoll = roll;
        this.rollNameText = '';
        this.rollSum = new ColoredDieResults('','',0,0,[],[],'');
        this.rollResultsArray = Array<ColoredDieResults>();
        this.key = Date.now().toString();

        // Lambda method for use in the reduce method to sum all the values.
        const summer = (accumulator: number, current: number) => accumulator + current;

        this.storedResults = roll.roll();

        this.rollNameText = roll.getDetailedRollName();
        
        let sumResults = Array<number>();
        let nonNumberResults = Array<any>();
        let showSplitSums = false;

        // Go through all of the dice in the roll and start making the roll detail lines
        for(let dieJson of this.storedResults.getKeys()) {

            let die = createUnknownDie(dieJson);

            if(SortTypeManager.getInstance().sortAscending()) {
                this.storedResults.sortAscending();
            } else if(SortTypeManager.getInstance().sortDescending()) {
                this.storedResults.sortDescending();
            }

            let rollResults = this.storedResults.mRollResults.get(dieJson);
            let rollResultsDropped = this.storedResults.mDroppedRolls.get(dieJson);
            let rollResultsReRolled = this.storedResults.mReRolledRolls.get(dieJson);
            let rollResultsStruck = this.storedResults.mStruckRollResults.get(dieJson);
            let rollResultsStruckDropped = this.storedResults.mStruckDroppedRolls.get(dieJson);
            let rollResultsStruckReRolled = this.storedResults.mStruckReRolledRolls.get(dieJson);
            let rollProperties = this.storedResults.mRollProperties.get(dieJson);

            if(hasRepeatRoll(rollProperties)) {
                showSplitSums = true;
            }

            // Lambda method for turning the roll numbers into a displayable string.
            const processRollPair = (die: Die, dieDisplayName: string, mainList: Array<any>, strikeList: Array<any>, properties : RollProperties, showPropInfo : boolean) : ColoredDieResults =>
            {
                if(mainList && mainList.length !== 0 || strikeList && strikeList.length !== 0 || (showPropInfo && properties.mModifier !== 0)) {
                    
                    let prependString = dieDisplayName;
                    let appendString = ''; 

                    if(die.isNumbered()) {
                        
                        let subTotal = 0;

                        if(showPropInfo)
                        {
                            if(hasCountAboveEqual(properties)) {
                                subTotal = (showPropInfo ? properties.mModifier : 0);
                                for(let item of mainList) {
                                    let value = item;
                                    if(isDouble(properties)) {value *= 2;}
                                    if(isHalve(properties)) {value /= 2;}
                                    if(value >= properties.mCountAboveEqual) {subTotal += 1;}
                                }
                            } else {
                                subTotal = mainList.reduce(summer,0) + (showPropInfo ? properties.mModifier : 0);
                                if(isDouble(properties)) {subTotal *= 2;}
                                if(isHalve(properties)) {subTotal /= 2;}
                                subTotal = Math.floor(subTotal)
                            }
                            sumResults.push(subTotal);
                        }

                        prependString += ' [' + subTotal + ']: ';
                        
                        if(showPropInfo) {
                            if(properties.mModifier !== 0)
                            {
                                appendString += ' (' + getModifierString(properties.mModifier,true) + ')';
                            }

                            if(isDouble(properties))
                            {
                                appendString += ' (x2)';
                            }

                            if(isHalve(properties))
                            {
                                appendString += ' (/2)';
                            }
                        } 
                    }
                    else {

                        for(let result of mainList) {
                            nonNumberResults.push(result)
                        }

                        prependString += ': ';
                    }

                    return new ColoredDieResults(prependString, appendString, die.min, die.max, mainList, strikeList, dieDisplayName);
                }

                return null
            }

            let mainResults = processRollPair(die, die.displayName, rollResults, rollResultsStruck, rollProperties, true);
            if(mainResults !== null)
            {
                this.rollResultsArray.push(mainResults)
            }

            let droppedResults = processRollPair(die, die.displayName + ' dropped', rollResultsDropped, rollResultsStruckDropped, rollProperties, false);
            if(droppedResults !== null)
            {
                this.rollResultsArray.push(droppedResults)
            }

            let rerolledResults = processRollPair(die, die.displayName + ' re-rolled', rollResultsReRolled, rollResultsStruckReRolled, rollProperties, false);
            if(rerolledResults !== null)
            {
                this.rollResultsArray.push(rerolledResults)
            }
        }

        // Only show expected result when asked for and when we have some some to report.
        if(ExpectedResultManager.getInstance().getShowExpected() && sumResults.length !== 0) {
            let rollAverageString = decimalToString(roll.average(),2);
            let averageText = 'Expected Result - [' + rollAverageString + ']';

            // This isn't the best way to do this, but its good enough.
            this.rollResultsArray.push(new ColoredDieResults(averageText, '', 0, 0, [], [], 'expected'));
        }

        let sumAppendText = '';

        if(showSplitSums && sumResults.length !== 0) {
            let sumTotal = sumResults.reduce(summer,0);
            sumAppendText = ', [' + sumTotal.toString() + ']';
        }

        let combinedResults = Array<any>();

        for(let numberResult of sumResults) {
            combinedResults.push(numberResult);
        }

        for(let nonNumberResult of nonNumberResults) {
            combinedResults.push(nonNumberResult)
        }

        this.rollSum = new ColoredDieResults('', sumAppendText, roll.min(), roll.max(), combinedResults, [], 'sum');
    }

}