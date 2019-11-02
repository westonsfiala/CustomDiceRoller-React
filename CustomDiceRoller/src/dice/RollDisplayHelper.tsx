

import {Roll} from "./Roll"
import {createUnknownDie} from "./DieFactory"
import {getModifierString} from "../StringHelper"

class StruckStringPair {

    public id : string;
    public regularText : string;
    public struckText : string;

    constructor(regularText, struckText, id = '') {
        this.id = id;
        this.regularText = regularText;
        this.struckText = struckText;
    }
}

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

        const summer = (accumulator: number, current: number) => accumulator + current;
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

        for(let dieJson of rollValues.mRollResults.keys()) {

            let die = createUnknownDie(dieJson);

            let rollResults = rollValues.mRollResults.get(dieJson);
            let rollResultsDropped = rollValues.mDroppedRolls.get(dieJson);
            let rollResultsReRolled = rollValues.mReRolledRolls.get(dieJson);
            let rollResultsStruck = rollValues.mStruckRollResults.get(dieJson);
            let rollResultsStruckDropped = rollValues.mStruckDroppedRolls.get(dieJson);
            let rollResultsStruckReRolled = rollValues.mStruckReRolledRolls.get(dieJson);
            let rollModifier = rollValues.mRollModifiers.get(dieJson);

            const processRollPair = (dieName: string, mainList: Array<number>, strikeList: Array<number>, modifier?: number | 0) : StruckStringPair =>
            {
                if(mainList && mainList.length !== 0 || strikeList && strikeList.length !== 0) {
                    let subTotal = mainList.reduce(summer,0) + modifier;
                    let mainListString = mainList.reduce(concatter, '');
                    let strikeListString = strikeList.reduce(concatter, '');
                    let detailString = '';
                    detailString += dieName + ' [' + subTotal + ']: '; 
                    detailString += mainListString;
                    if(rollModifier !== 0)
                    {
                        if(mainListString.length !== 0)
                        {
                            detailString += ',';
                        }
                        detailString += '(' + getModifierString(rollModifier,true) + ')';
                    }
                    if(strikeListString.length !== 0) {
                        detailString += ' ';
                    }
                    return new StruckStringPair(detailString, strikeListString, dieName);
                }

                return null
            }

            let mainResults = processRollPair(die.displayName, rollResults, rollResultsStruck, rollModifier);
            if(mainResults !== null)
            {
                this.rollResultsText.push(mainResults)
            }

            let droppedResults = processRollPair(die.displayName, rollResultsDropped, rollResultsStruckDropped, 0);
            if(droppedResults !== null)
            {
                this.rollResultsText.push(droppedResults)
            }

            let rerolledResults = processRollPair(die.displayName, rollResultsReRolled, rollResultsStruckReRolled, 0);
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

        let sumResult = 0;
        let sumStruck = 0;
        let displayStruck = false;
        let displayDropped = false;

        for(let dieRolls of rollValues.mRollResults.values())
        {
            sumResult += dieRolls.reduce(summer);
        }

        for(let dieMod of rollValues.mRollModifiers.values()) {
            sumResult += dieMod;
            sumStruck += dieMod;
        }

        // Only show the struck through text
        if(rollValues.mStruckRollResults.size !== 0) {
            for (let struckValues of rollValues.mStruckRollResults.values()) {
                if(struckValues.length !== 0) {
                    sumStruck += struckValues.reduce(summer);
                    displayStruck = true;
                }
            }
        }

        let sumDropped = sumResult
        if(rollValues.mDroppedRolls.size !== 0) {
            for (let droppedValues of rollValues.mDroppedRolls.values()) {
                if(droppedValues.length !== 0) {
                    sumDropped += droppedValues.reduce(summer);
                    displayDropped = true;
                }
            }
        }

        let highText = sumResult.toString();
        let lowText = sumStruck.toString();
        let droppedText = sumDropped.toString();
        let struckText = '';

        if(displayStruck) 
        {
            struckText = lowText;
        }
        else if(displayDropped)
        {
            struckText = droppedText;
        }

        this.rollSumText.regularText = highText;
        this.rollSumText.struckText = struckText;
    }

}