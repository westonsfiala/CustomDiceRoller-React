

import {Roll} from "./Roll"
import {createUnknownDie} from "./DieFactory"
import {getModifierString} from "../helpers/StringHelper"
import {StruckStringPair} from "./StruckStringPair"
import { RollProperties, isDouble, isHalve } from "./RollProperties";

// Class that performs a roll when constructed and turns that roll into displayable chunks of information.
export class RollDisplayHelper {

    public readonly timeStamp : Date;
    public readonly storedRoll : Roll;
    public readonly rollNameText : string;
    public readonly rollSumText : StruckStringPair;
    public readonly rollResultsText : Array<StruckStringPair>;

    constructor(roll: Roll) {
        
        this.timeStamp = new Date();
        this.storedRoll = roll;
        this.rollNameText = '';
        this.rollSumText = new StruckStringPair('','');
        this.rollResultsText = Array<StruckStringPair>();

        // Lambda method for use in the reduce method to sum all the values.
        const summer = (accumulator: number, current: number) => accumulator + current;

        // Lambda method for use in the reduce method to output a nicely comma separated list.
        const concatter = (accumulator: string, current: number, index: number) : string => {
            if(index === 0) 
            {
                return current.toString();
            } 
            else 
            {
                return accumulator + ', ' + current;
            }
        }

        let rollValues = roll.roll();

        this.rollNameText = roll.getDetailedRollName();
        
        let sumResult = 0;

        // Go through all of the dice in the roll and start making the roll detail lines
        for(let dieJson of rollValues.getKeys()) {

            let die = createUnknownDie(dieJson);

            let rollResults = rollValues.mRollResults.get(dieJson);
            let rollResultsDropped = rollValues.mDroppedRolls.get(dieJson);
            let rollResultsReRolled = rollValues.mReRolledRolls.get(dieJson);
            let rollResultsStruck = rollValues.mStruckRollResults.get(dieJson);
            let rollResultsStruckDropped = rollValues.mStruckDroppedRolls.get(dieJson);
            let rollResultsStruckReRolled = rollValues.mStruckReRolledRolls.get(dieJson);
            let rollProperties = rollValues.mRollProperties.get(dieJson);

            // Lambda method for turning the roll numbers into a displayable string.
            const processRollPair = (dieName: string, mainList: Array<number>, strikeList: Array<number>, properties : RollProperties, showPropInfo : boolean) : StruckStringPair =>
            {
                if(mainList && mainList.length !== 0 || strikeList && strikeList.length !== 0 || (showPropInfo && properties.mModifier !== 0)) {
                    let subTotal = mainList.reduce(summer,0) + (showPropInfo ? properties.mModifier : 0);

                    if(showPropInfo)
                    {
                        if(isDouble(properties)) {subTotal *= 2;}
                        if(isHalve(properties)) {subTotal /= 2;}
                        sumResult += Math.floor(subTotal);
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

        // TODO: When settings are made, SHOW AVERAGE
        if(true) {
            let averageText = 'Expected Result - [' + roll.average() + ']';

            this.rollResultsText.push(new StruckStringPair(averageText,'', 'expected'));
        }

        this.rollSumText.regularText = sumResult.toString();
        this.rollSumText.struckText = '';
    }

}