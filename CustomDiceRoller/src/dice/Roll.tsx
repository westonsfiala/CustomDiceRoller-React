
import { Die } from './Die'
import { SimpleDie } from './SimpleDie';
import { cloneDie } from './DieFactory'
import { RollProperties, isDouble, isHalve, isAdvantage, isDisadvantage } from './RollProperties'
import { RollResults } from './views/RollResults'

import {
    getModifierString,
    getDropHighString,
    getDropLowString,
    getKeepHighString,
    getKeepLowString,
    getMinimumString,
    getReRollString
 } from '../helpers/StringHelper'
import { DiePropertyPair } from './views/DiePropertyPair';

export class Roll {
    public static readonly aggregateRollStringStart = "Aggregate"

    mDiePropArray : Array<DiePropertyPair>;
    mRollName: string;
    mRollCategory: string;

    constructor(rollName: string, rollCategory: string) {
        this.mRollName = rollName;
        this.mRollCategory = rollCategory;

        this.mDiePropArray = new Array<DiePropertyPair>();
    }

    private clone() : Roll {
        let newRoll = new Roll(this.mRollName, this.mRollCategory);

        for(let diePropPair of this.mDiePropArray) {
            newRoll.mDiePropArray.push(new DiePropertyPair(cloneDie(diePropPair.mDie, diePropPair.mDie.displayName), diePropPair.mProperties.clone({})))
        }

        return newRoll;
    }

    setNameCategory(rollName: string, rollCategory: string) : Roll {
        let newRoll = this.clone();

        newRoll.mRollName = rollName;
        newRoll.mRollCategory = rollCategory;

        return newRoll;
    }

    addDieToRoll(die: Die, properties: RollProperties) : Roll
    {
        let newRoll = this.clone();

        let foundPropPair = newRoll.mDiePropArray.find((value) => value.mDie.displayName === die.displayName)

        if(foundPropPair === undefined) {
            newRoll.mDiePropArray.push(new DiePropertyPair(cloneDie(die, die.displayName), properties.clone({})));
        } else {
            foundPropPair.mDie = die;
            foundPropPair.mProperties = properties;
        }


        return newRoll;
    }

    removeDieFromRoll(die: Die) : Roll
    {
        let newRoll = this.clone();

        let propIndex = newRoll.mDiePropArray.findIndex((value) => value.mDie.displayName === die.displayName)

        if(propIndex !== -1) {
            newRoll.mDiePropArray.splice(propIndex, 1);
        } 
        
        return newRoll;
    }

    overrideDieInRoll(oldDie: Die, newDie: Die) : Roll
    {
        let newRoll = this.clone();

        let propIndex = newRoll.mDiePropArray.findIndex((value) => value.mDie.displayName === oldDie.displayName);
        let newDieIndex = newRoll.mDiePropArray.findIndex((value) => value.mDie.displayName === newDie.displayName);

        if(propIndex !== -1 && newDieIndex === -1) {
            let newPropPair = new DiePropertyPair(cloneDie(newDie, newDie.displayName), newRoll.mDiePropArray[propIndex].mProperties.clone({}) )
            newRoll.mDiePropArray.splice(propIndex, 1, newPropPair);
        } 
        
        return newRoll;
    }

    containsDie(die: Die) : boolean
    {
        return this.mDiePropArray.findIndex((value) => value.mDie.displayName === die.displayName) !== -1;
    }

    getTotalDiceInRoll() : number
    {
        let numDice = 0;

        for(let dieProps of this.mDiePropArray)
        {
            numDice += Math.abs(dieProps.mProperties.mNumDice);
        }

        return numDice;
    }

    getDiePropArray() : Array<DiePropertyPair>
    {
        let outputArray = new Array<DiePropertyPair>();

        for(let prop of this.mDiePropArray)
        {
            outputArray.push(new DiePropertyPair(cloneDie(prop.mDie, prop.mDie.displayName), prop.mProperties.clone({})));
        }

        return outputArray;
    }

    moveDieUp(position: number) : Roll
    {
        let newRoll = this.clone();

        // Can't move something up when its already at the top
        // Or if there is nothing
        // Or if there is only one thing
        // Or if its past where we can access
        if(position <= 0 || newRoll.mDiePropArray.length == 0 || newRoll.mDiePropArray.length == 1 || position >= newRoll.mDiePropArray.length)
        {
            return newRoll;
        }

        let newMapStart = newRoll.mDiePropArray.slice(0, position-1);
        let swappedElement = newRoll.mDiePropArray.slice(position-1, position);
        let movedEntry = newRoll.mDiePropArray.slice(position, position+1);
        let newMapEnd = newRoll.mDiePropArray.slice(position+1, newRoll.mDiePropArray.length);

        newRoll.mDiePropArray = newMapStart.concat(movedEntry).concat(swappedElement).concat(newMapEnd);

        return newRoll;
    }

    moveDieDown(position: number) : Roll
    {
        let newRoll = this.clone();

        // Can't move something down when its already at the top
        // Or if there is nothing
        // Or if there is only one thing
        // Or if its past where we can access
        if(position < 0 || newRoll.mDiePropArray.length == 0 || newRoll.mDiePropArray.length == 1 || position >= newRoll.mDiePropArray.length - 1)
        {
            return newRoll;
        }

        let newMapStart = newRoll.mDiePropArray.slice(0, position);
        let movedEntry = newRoll.mDiePropArray.slice(position, position+1);
        let swappedElement = newRoll.mDiePropArray.slice(position+1, position+2);
        let newMapEnd = newRoll.mDiePropArray.slice(position+2, newRoll.mDiePropArray.length);

        newRoll.mDiePropArray = newMapStart.concat(swappedElement).concat(movedEntry).concat(newMapEnd);

        return newRoll;
    }

    roll() : RollResults
    {
        let returnResults = new RollResults();

        for(let props of this.mDiePropArray) {

            let die = props.mDie;
            let dieJson = JSON.stringify(die);
            let properties = props.mProperties;

            let rollPair = this.produceRollLists(die, properties);
            let secondRollPair = this.produceRollLists(die, properties);

            const summer = (accumulator: number, current: number) => accumulator + current;

            returnResults.mRollProperties.set(dieJson, properties);

            switch(properties.mAdvantageDisadvantage)
            {
                case RollProperties.rollDisadvantageValue :
                    if(rollPair.keep.reduce(summer, 0) < secondRollPair.keep.reduce(summer, 0)) {
                        returnResults.mRollResults.set(dieJson, rollPair.keep);
                        returnResults.mDroppedRolls.set(dieJson, rollPair.drop);
                        returnResults.mReRolledRolls.set(dieJson, rollPair.reroll);
                        returnResults.mStruckRollResults.set(dieJson, secondRollPair.keep);
                        returnResults.mStruckDroppedRolls.set(dieJson, secondRollPair.drop);
                        returnResults.mStruckReRolledRolls.set(dieJson, secondRollPair.reroll);
                    } else {
                        returnResults.mRollResults.set(dieJson, secondRollPair.keep);
                        returnResults.mDroppedRolls.set(dieJson, secondRollPair.drop);
                        returnResults.mReRolledRolls.set(dieJson, secondRollPair.reroll);
                        returnResults.mStruckRollResults.set(dieJson, rollPair.keep);
                        returnResults.mStruckDroppedRolls.set(dieJson, rollPair.drop);
                        returnResults.mStruckReRolledRolls.set(dieJson, rollPair.reroll);
                    }
                    break;

                case RollProperties.rollNaturalValue : 
                    returnResults.mRollResults.set(dieJson, rollPair.keep);
                    returnResults.mDroppedRolls.set(dieJson, rollPair.drop);
                    returnResults.mReRolledRolls.set(dieJson, rollPair.reroll);
                    returnResults.mStruckRollResults.set(dieJson, []);
                    returnResults.mStruckDroppedRolls.set(dieJson, []);
                    returnResults.mStruckReRolledRolls.set(dieJson, []);
                    break;

                case RollProperties.rollAdvantageValue : 
                    if(rollPair.keep.reduce(summer) > secondRollPair.keep.reduce(summer)) {
                        returnResults.mRollResults.set(dieJson, rollPair.keep);
                        returnResults.mDroppedRolls.set(dieJson, rollPair.drop);
                        returnResults.mReRolledRolls.set(dieJson, rollPair.reroll);
                        returnResults.mStruckRollResults.set(dieJson, secondRollPair.keep);
                        returnResults.mStruckDroppedRolls.set(dieJson, secondRollPair.drop);
                        returnResults.mStruckReRolledRolls.set(dieJson, secondRollPair.reroll);
                    } else {
                        returnResults.mRollResults.set(dieJson, secondRollPair.keep);
                        returnResults.mDroppedRolls.set(dieJson, secondRollPair.drop);
                        returnResults.mReRolledRolls.set(dieJson, secondRollPair.reroll);
                        returnResults.mStruckRollResults.set(dieJson, rollPair.keep);
                        returnResults.mStruckDroppedRolls.set(dieJson, rollPair.drop);
                        returnResults.mStruckReRolledRolls.set(dieJson, rollPair.reroll);
                    }
                    break
            }
        }

        return returnResults
    }

    // Produces an array of 3 lists, a list of taken values, and a list of dropped values, and a list of rerolled values
    private produceRollLists(die: Die, properties: RollProperties) : {keep: number[], drop: number[], reroll: number[]} 
    {
        let keepList = new Array<number>();
        let dropList = new Array<number>();
        let rerollList = new Array<number>();

        // No dice to roll, return empty lists.
        if(properties.mNumDice == 0)
        {
            return {keep:keepList, drop:dropList, reroll:rerollList};
        }

        // Roll all of the dice and add them to the return list.
        let rollNum = 0;
        while (rollNum < Math.abs(properties.mNumDice)) {

            let dieRoll = die.roll();

            // If we are set to explode, have the maximum value, and actually have a range, roll an extra die
            if(properties.mExplode && dieRoll == die.max && die.max != die.min) {
                rollNum -= 1;
            }

            // If we have a minimum value, drop anything less.
            if(properties.mMinimumRoll !== 0 && Math.abs(dieRoll) < properties.mMinimumRoll)
            {
                rerollList.push(dieRoll);
                dieRoll = Math.min(properties.mMinimumRoll, die.max);
            }

            // If we use reRolls, reRoll under the threshold.
            if(properties.mReRoll !== 0 && Math.abs(dieRoll) <= properties.mReRoll)
            {
                rerollList.push(dieRoll)
                dieRoll = die.roll();
            }

            if(properties.mNumDice > 0) {
                keepList.push(dieRoll);
            } else {
                keepList.push(-dieRoll);
            }
            rollNum += 1;
        }

        // Drop high values
        if(keepList.length <= properties.mDropHigh) {
            dropList = dropList.concat(keepList);
            keepList = new Array<number>();
        } else {
            for(let dropIndex = 0; dropIndex < properties.mDropHigh; dropIndex++) {
                let ejectedValue = Math.max(...keepList);
                let ejectedIndex = keepList.indexOf(ejectedValue);
                keepList.splice(ejectedIndex,1);
                dropList.push(ejectedValue)
            }
        }

        // Drop low values
        if(keepList.length <= properties.mDropLow) {
            dropList = dropList.concat(keepList)
            keepList = new Array<number>()
        } else {
            for(let dropIndex = 0; dropIndex < properties.mDropLow; dropIndex++) {
                let ejectedValue = Math.min(...keepList);
                let ejectedIndex = keepList.indexOf(ejectedValue);
                keepList.splice(ejectedIndex,1);
                dropList.push(ejectedValue)
            }
        }

        // Only do keep high/low when you have those properties
        if(properties.mKeepHigh != 0 || properties.mKeepLow != 0) {
            // Only keep going if we have more rolls than what we want to keep
            if(keepList.length > (properties.mKeepHigh + properties.mKeepLow)) {
                let numberToDrop = keepList.length - (properties.mKeepHigh + properties.mKeepLow)
                let indexToDrop = properties.mKeepLow
                let tempSorted = keepList.slice().sort((a,b) => a-b);
                for(let dropIndex = 0; dropIndex < numberToDrop; dropIndex++) {
                    let ejectedValue = tempSorted[indexToDrop + dropIndex]
                    let ejectedIndex = keepList.indexOf(ejectedValue);
                    keepList.splice(ejectedIndex,1);
                    dropList.push(ejectedValue)
                }
            }
        }

        return {keep:keepList, drop:dropList, reroll:rerollList};
    }

    average() : number
    {
        let dieAverage = 0
        for(let props of this.mDiePropArray)
        {
            let individualAverage = props.mDie.expectedResult(props.mProperties.mMinimumRoll, props.mProperties.mReRoll, props.mProperties.mExplode);

            // How many dice do we actually have.
            let numActualDice = props.mProperties.mNumDice;
            numActualDice -= props.mProperties.mDropHigh + props.mProperties.mDropLow;
            
            let moveTowardsHigh = props.mProperties.mDropLow;
            let moveTowardsLow = props.mProperties.mDropHigh;

            let keepNum = props.mProperties.mKeepHigh + props.mProperties.mKeepLow;
            if(keepNum !== 0 && keepNum < numActualDice) {
                if(props.mProperties.mKeepHigh === 0) {
                    moveTowardsLow += numActualDice - keepNum;
                } else if(props.mProperties.mKeepLow === 0) {
                    moveTowardsHigh += numActualDice - keepNum;
                } else if(props.mProperties.mKeepHigh > props.mProperties.mKeepLow) {
                    moveTowardsHigh += props.mProperties.mKeepHigh - props.mProperties.mKeepLow;
                } else {
                    moveTowardsLow += props.mProperties.mKeepLow - props.mProperties.mKeepHigh;
                }

                numActualDice = keepNum;
            }
            numActualDice = Math.max(0, numActualDice);

            // Are the drop / keep dice skewing the min/max
            let moveTotal = Math.abs(moveTowardsHigh - moveTowardsLow);

            // This will asymptotically approach either max/min as you move furthur towards high/low
            // This is not the true average shift, but it is pretty close. 
            if(moveTowardsHigh > moveTowardsLow) {
                individualAverage = (props.mDie.max * moveTotal + 2*individualAverage) / (2 + moveTotal)
            } else if(moveTowardsHigh < moveTowardsLow) {
                individualAverage = (props.mDie.min * moveTotal + 2*individualAverage) / (2 + moveTotal)
            }
            
            let expectedResult = individualAverage * numActualDice;

            // Same math as above, but the moveTotal is always 1.
            if(isAdvantage(props.mProperties)) { expectedResult = (props.mDie.max + expectedResult*2) / 3; }
            if(isDisadvantage(props.mProperties)) { expectedResult = (props.mDie.min + expectedResult*2) / 3; }

            expectedResult += props.mProperties.mModifier;

            if(isDouble(props.mProperties)) { expectedResult *= 2; }
            if(isHalve(props.mProperties)) { expectedResult /= 2; }

            dieAverage += expectedResult;
        }
        return dieAverage
    }

    displayInHex(): boolean {
        // Only display hex when you start with "0x" and have more characters after that.
        return this.mRollName.length > (Die.dieDisplayInHexID.length) && this.mRollName.startsWith(Die.dieDisplayInHexID)
    }

    get displayName() : string
    {
        return this.mRollName
    }

    get categoryName() : string
    {
        return this.mRollCategory
    }

    getDetailedRollName() : string
    {
        let returnString = ""

        if(this.mDiePropArray.length === 0)
        {
            return returnString
        }

        let defaultProps = new RollProperties({})

        let firstDie = true

        for(let pair of this.mDiePropArray)
        {
            let die = pair.mDie;
            let props = pair.mProperties;
            
            // Don't add the "+" to the first item. Only add "+" to positive count items.
            if(firstDie) {
                firstDie = false
            } else if(props.mNumDice > 0) {
                returnString += "+"
            }

            if(die.displayName.startsWith("d"))
            {
                returnString += props.mNumDice + die.displayName
            }
            else
            {
                returnString += props.mNumDice + 'x' + die.displayName
            }

            switch(props.mAdvantageDisadvantage) {
                case RollProperties.rollAdvantageValue : 
                    returnString += "(Advantage)";
                    break;
                case RollProperties.rollDisadvantageValue : 
                    returnString += "(Disadvantage)";
                    break;
            }

            if(props.mDropHigh !== 0) {
                let dropString = getDropHighString(props.mDropHigh)
                returnString += '(' + dropString + ')';
            } 

            if(props.mDropLow !== 0) {
                let dropString = getDropLowString(props.mDropLow)
                returnString += '(' + dropString + ')';
            }

            if(props.mKeepHigh !== 0) {
                let keepString = getKeepHighString(props.mKeepHigh)
                returnString += '(' + keepString + ')';
            }

            if(props.mKeepLow !== 0) {
                let keepString = getKeepLowString(props.mKeepLow)
                returnString += '(' + keepString + ')';
            }

            if(props.mReRoll != defaultProps.mReRoll)
            {
                let reRollString = getReRollString(props.mReRoll)
                returnString += '(' + reRollString + ')';
            }

            if(props.mMinimumRoll != defaultProps.mMinimumRoll)
            {
                let minString = getMinimumString(props.mMinimumRoll)
                returnString += '(' + minString + ')';
            }

            if(props.mExplode != defaultProps.mExplode) {
                returnString += '(Explode)';
            }

            if(props.mModifier != 0) {
                returnString += getModifierString(props.mModifier, true)
            }
            
            switch(props.mDoubleHalve) {
                case RollProperties.rollDoubleValue :
                    returnString += '(Double)';
                    break;
                case RollProperties.rollHalveValue :
                    returnString += '(Halve)';
                    break;
            }
        }

        return returnString
    }
}