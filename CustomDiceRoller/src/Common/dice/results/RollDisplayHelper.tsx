

import { RollResults } from "./RollResults";

import {Roll} from "../Roll"
import { RollProperties, isDouble, isHalve, hasRepeatRoll } from "../RollProperties";

import {createUnknownDie} from "../factory/DieFactory"

import {getModifierString, concatter, demimalToString} from "../../utility/StringHelper"

import {StruckStringPair} from "../../views/StruckStringPair"

import SortTypeManager from "../../../SettingsPage/Results/SortTypeManager";
import ExpectedResultManager from "../../../SettingsPage/Results/ExpectedResultManager";

// Class that performs a roll when constructed and turns that roll into displayable chunks of information.
export class RollDisplayHelper {

    public readonly timeString : string;
    public readonly dateString : string;
    public readonly storedRoll : Roll;
    public readonly storedResults : RollResults;
    public readonly rollNameText : string;
    public readonly rollSumText : StruckStringPair;
    public readonly rollResultsText : Array<StruckStringPair>;
    public readonly key : string;

    constructor(roll: Roll) {
        
        let currentDateTime = new Date();
        this.timeString = currentDateTime.toLocaleTimeString();
        this.dateString = currentDateTime.toLocaleDateString();
        this.storedRoll = roll;
        this.rollNameText = '';
        this.rollSumText = new StruckStringPair('','');
        this.rollResultsText = Array<StruckStringPair>();
        this.key = Date.now().toString();

        // Lambda method for use in the reduce method to sum all the values.
        const summer = (accumulator: number, current: number) => accumulator + current;

        this.storedResults = roll.roll();

        this.rollNameText = roll.getDetailedRollName();
        
        let sumResult = Array<number>();
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
            const processRollPair = (dieName: string, mainList: Array<number>, strikeList: Array<number>, properties : RollProperties, showPropInfo : boolean) : StruckStringPair =>
            {
                if(mainList && mainList.length !== 0 || strikeList && strikeList.length !== 0 || (showPropInfo && properties.mModifier !== 0)) {
                    let subTotal = mainList.reduce(summer,0) + (showPropInfo ? properties.mModifier : 0);

                    if(showPropInfo)
                    {
                        if(isDouble(properties)) {subTotal *= 2;}
                        if(isHalve(properties)) {subTotal /= 2;}
                        subTotal = Math.floor(subTotal)
                        sumResult.push(subTotal);
                    }

                    let mainListString = mainList.reduce(concatter, '');
                    let strikeListString = strikeList.reduce(concatter, '');

                    let detailString = '';
                    detailString += dieName + ' [' + subTotal + ']: '; 
                    detailString += mainListString;

                    if(showPropInfo) {
                        if(properties.mModifier !== 0)
                        {
                            detailString += ' (' + getModifierString(properties.mModifier,true) + ')';
                        }

                        if(isDouble(properties))
                        {
                            detailString += ' (x2)';
                        }

                        if(isHalve(properties))
                        {
                            detailString += ' (/2)';
                        }
                    } 

                    if(strikeListString.length !== 0) {
                        detailString += ' ';
                    }
                    return new StruckStringPair(detailString, strikeListString, dieName);
                }

                return null
            }

            let mainResults = processRollPair(die.displayName, rollResults, rollResultsStruck, rollProperties, true);
            if(mainResults !== null)
            {
                this.rollResultsText.push(mainResults)
            }

            let droppedResults = processRollPair(die.displayName + ' dropped', rollResultsDropped, rollResultsStruckDropped, rollProperties, false);
            if(droppedResults !== null)
            {
                this.rollResultsText.push(droppedResults)
            }

            let rerolledResults = processRollPair(die.displayName + ' re-rolled', rollResultsReRolled, rollResultsStruckReRolled, rollProperties, false);
            if(rerolledResults !== null)
            {
                this.rollResultsText.push(rerolledResults)
            }
        }

        if(ExpectedResultManager.getInstance().getShowExpected()) {
            let rollAverageString = demimalToString(roll.average(),2);
            let averageText = 'Expected Result - [' + rollAverageString + ']';

            this.rollResultsText.push(new StruckStringPair(averageText,'', 'expected'));
        }

        let sumTotal = sumResult.reduce(summer,0);
        let sumText = sumTotal.toString();

        if(showSplitSums) {
            sumText = sumResult.reduce(concatter,'') + ', [' + sumText + ']';
        }

        this.rollSumText.regularText = sumText;
        this.rollSumText.struckText = '';
    }

}