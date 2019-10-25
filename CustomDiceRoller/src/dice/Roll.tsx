
import { Die } from './Die'
import { RollProperties } from './RollProperties'
import { RollResults } from './RollResults'
import { SimpleDie } from './SimpleDie';
import {
    getModifierString,
    getDropHighString,
    getDropLowString,
    getKeepHighString,
    getKeepLowString,
    getMinimumDieValueString,
    getReRollString
 } from '../stringHelper'

export class Roll {
    public static readonly aggregateRollStringStart = "Aggregate"

    mDieMap : Map<string, RollProperties>;
    mRollName: string;
    mRollCategory: string;

    constructor(rollName: string, rollCategory: string) {
        this.mRollName = rollName;
        this.mRollCategory = rollCategory;

        this.mDieMap = new Map<string, RollProperties>();
    }

    clone(newRollName: string, newRollCategory: string) : Roll
    {
        let retRoll = JSON.parse(JSON.stringify(this)) as Roll;

        retRoll.mRollName = newRollName;
        retRoll.mRollCategory = newRollCategory;

        return retRoll;
    }

    addDieToRoll(die: Die, properties: RollProperties)
    {
        let newDieProperties = JSON.parse(JSON.stringify(properties)) as RollProperties;

        this.mDieMap[JSON.stringify(die)] = newDieProperties;
    }

    removeDieFromRoll(die: Die) : boolean
    {
        return this.mDieMap.delete(JSON.stringify(die)) != null;
    }

    containsDie(die: Die) : boolean
    {
        return this.mDieMap.has(JSON.stringify(die));
    }

    getTotalDiceInRoll() : number
    {
        let numDice = 0;

        for(let dieProps of this.mDieMap.values())
        {
            numDice += Math.abs(dieProps.mDieCount);
        }

        return numDice;
    }

    getDice() : Map<Die, RollProperties>
    {
        let outputMap = new Map<Die, RollProperties>();

        for(let [dieJson, properties] of this.mDieMap.entries())
        {
            outputMap[JSON.parse(dieJson)] = properties;
        }

        return outputMap;
    }

    overrideDieAt(die: Die, position: number) : boolean 
    {
        let curPos = 0;
        for(let dieJson of this.mDieMap.keys())
        {
            if(curPos === position) {
                let newDieJson = JSON.stringify(die);
                let props = this.mDieMap.get(dieJson);
                this.mDieMap.delete(dieJson);
                this.mDieMap[newDieJson] = props;
                return true;
            }
            curPos++
        }

        return false;
    }

    getDieAt(position: number) : Die
    {
        let curPos = 0;
        for(let dieJson of this.mDieMap.keys())
        {
            if(curPos === position) {
                return JSON.parse(dieJson);
            }
            curPos++;
        }

        return new SimpleDie('Invlaid', 1);
    }

    moveDieUp(position: number) : boolean
    {
        // Can't move something up when its already at the top
        // Or if there is nothing
        // Or if there is only one thing
        // Or if its past where we can access
        if(position <= 0 || this.mDieMap.size == 0 || this.mDieMap.size == 1 || position >= this.mDieMap.size)
        {
            return false;
        }

        let iterableEnteries = [...this.mDieMap.entries()];

        let movedEntry = iterableEnteries.splice(position, 1);

        let newMapStart = iterableEnteries.slice(0, position-1);
        let newMapEnd = iterableEnteries.slice(position, iterableEnteries.length);

        iterableEnteries = newMapStart.concat(movedEntry).concat(newMapEnd);

        this.mDieMap = new Map(iterableEnteries);

        return true;
    }

    moveDieDown(position: number) : boolean
    {
        // Can't move something down when its already at the top
        // Or if there is nothing
        // Or if there is only one thing
        // Or if its past where we can access
        if(position < 0 || this.mDieMap.size == 0 || this.mDieMap.size == 1 || position >= this.mDieMap.size - 1)
        {
            return false;
        }

        let iterableEnteries = [...this.mDieMap.entries()];

        let movedEntry = iterableEnteries.splice(position, 1);

        let newMapStart = iterableEnteries.slice(0, position);
        let newMapEnd = iterableEnteries.slice(position+1, iterableEnteries.length);

        iterableEnteries = newMapStart.concat(movedEntry).concat(newMapEnd);

        this.mDieMap = new Map(iterableEnteries);

        return true;
    }


    getRollPropertiesAt(position: number) : RollProperties
    {
        let curPos = 0;
        for(let prop of this.mDieMap.values())
        {
            if(curPos === position) {
                return prop;
            }
            curPos++;
        }

        return new RollProperties({});
    }

    roll() : RollResults
    {
        let returnResults = new RollResults();

        for(let [dieJson, properties] of this.mDieMap) {

            let die = JSON.parse(dieJson) as Die;

            let rollPair = this.produceRollLists(die, properties);
            let secondRollPair = this.produceRollLists(die, properties);

            const summer = (accumulator: number, current: number) => accumulator + current;

            returnResults.mRollModifiers[dieJson] = properties.mModifier;

            switch(properties.mAdvantageDisadvantage)
            {
                case RollProperties.rollDisadvantageValue :
                    if(rollPair.keep.reduce(summer) < secondRollPair.keep.reduce(summer)) {
                        returnResults.mRollResults[dieJson] = rollPair.keep
                        returnResults.mDroppedRolls[dieJson] = rollPair.drop
                        returnResults.mReRolledRolls[dieJson] = rollPair.reroll
                        returnResults.mStruckRollResults[dieJson] = secondRollPair.keep
                        returnResults.mStruckDroppedRolls[dieJson] = secondRollPair.drop
                        returnResults.mStruckReRolledRolls[dieJson] = secondRollPair.reroll
                    } else {
                        returnResults.mRollResults[dieJson] = secondRollPair.keep
                        returnResults.mDroppedRolls[dieJson] = secondRollPair.drop
                        returnResults.mReRolledRolls[dieJson] = secondRollPair.reroll
                        returnResults.mStruckRollResults[dieJson] = rollPair.keep
                        returnResults.mStruckDroppedRolls[dieJson] = rollPair.drop
                        returnResults.mStruckReRolledRolls[dieJson] = rollPair.reroll
                    }
                    break;

                case RollProperties.rollNaturalValue : 
                    returnResults.mRollResults[dieJson] = rollPair.keep
                    returnResults.mDroppedRolls[dieJson] = rollPair.drop
                    returnResults.mReRolledRolls[dieJson] = rollPair.reroll
                    break;

                case RollProperties.rollAdvantageValue : 
                    if(rollPair.keep.reduce(summer) > secondRollPair.keep.reduce(summer)) {
                        returnResults.mRollResults[dieJson] = rollPair.keep
                        returnResults.mDroppedRolls[dieJson] = rollPair.drop
                        returnResults.mReRolledRolls[dieJson] = rollPair.reroll
                        returnResults.mStruckRollResults[dieJson] = secondRollPair.keep
                        returnResults.mStruckDroppedRolls[dieJson] = secondRollPair.drop
                        returnResults.mStruckReRolledRolls[dieJson] = secondRollPair.reroll
                    } else {
                        returnResults.mRollResults[dieJson] = secondRollPair.keep
                        returnResults.mDroppedRolls[dieJson] = secondRollPair.drop
                        returnResults.mReRolledRolls[dieJson] = secondRollPair.reroll
                        returnResults.mStruckRollResults[dieJson] = rollPair.keep
                        returnResults.mStruckDroppedRolls[dieJson] = rollPair.drop
                        returnResults.mStruckReRolledRolls[dieJson] = rollPair.reroll
                    }
                    break
            }
        }

        // TODO: move this elsewhere & generalize it.
        // Check for rolling critical success or critical failures
        let d20SaveString = JSON.stringify(new SimpleDie("d20", 20));
        if(returnResults.mRollResults.has(d20SaveString)) {
            let results = returnResults.mRollResults.get(d20SaveString);
            if(results.length == 1) {
                if(results[0] == 20) {
                    returnResults.mRollMaximumValue = true;
                } else if(results[0] == 1) {
                    returnResults.mRollMinimumValue = true;
                }
            }
        }

        return returnResults
    }

    // Produces an array of 3 lists, a list of taken letues, and a list of dropped letues, and a list of rerolled letues
    private produceRollLists(die: Die, properties: RollProperties) : {keep: number[], drop: number[], reroll: number[]} 
    {

        let keepList = new Array<number>();
        let dropList = new Array<number>();
        let rerollList = new Array<number>();

        // No dice to roll, return empty lists.
        if(properties.mDieCount == 0)
        {
            return {keep:keepList, drop:dropList, reroll:rerollList};
        }

        // Roll all of the dice and add them to the return list.
        let rollNum = 0;
        while (rollNum < Math.abs(properties.mDieCount)) {
            let dieRoll = die.roll();

            // If we are set to explode, have the maximum letue, and actually have a range, roll an extra die
            if(properties.mExplode && dieRoll == die.max && die.max != die.min) {
                rollNum -= 1;
            }

            // If we have a minimum letue, drop anything less.
            if(properties.mUseMinimumRoll && dieRoll < properties.mMinimumRoll)
            {
                rerollList.push(dieRoll);
                dieRoll = properties.mMinimumRoll;
            }

            // If we use reRolls, reRoll under the threshold.
            if(properties.mUseReRoll && dieRoll <= properties.mReRoll)
            {
                rerollList.push(dieRoll)
                dieRoll = die.roll();
            }

            if(properties.mDieCount > 0) {
                keepList.push(dieRoll);
            } else {
                keepList.push(-dieRoll);
            }
            rollNum += 1;
        }

        // Drop high letues
        if(keepList.length <= properties.mDropHigh) {
            dropList.concat(keepList);
            keepList = new Array<number>();
        } else {
            for(let dropIndex = 0; dropIndex < properties.mDropHigh; dropIndex++) {
                let ejectedValue = Math.max(...keepList);
                let ejectedIndex = keepList.indexOf(ejectedValue);
                keepList.splice(ejectedIndex,1);
                dropList.push(ejectedValue)
            }
        }

        // Drop low letues
        if(keepList.length <= properties.mDropLow) {
            dropList.concat(keepList)
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
                let tempSorted = keepList.slice().sort()
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
        for(let [dieJson, prop] of this.mDieMap)
        {
            dieAverage += JSON.parse(dieJson).average() * prop.mDieCount + prop.mModifier
        }
        return dieAverage
    }

    displayInHex(): boolean {
        // Only display hex when you start with "0x" and have more characters after that.
        return this.mRollName.length > (Die.dieDisplayInHexID.length) && this.mRollName.startsWith(
            Die.dieDisplayInHexID
        )
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

        if(this.mDieMap.size === 0)
        {
            return returnString
        }

        let defaultProps = new RollProperties({})

        let firstDie = true

        for(let [dieJson, props] of this.mDieMap)
        {
            // Don't add the "+" to the first item. Only add "+" to positive count items.
            if(firstDie) {
                firstDie = false
            } else if(props.mDieCount > 0) {
                returnString += "+"
            }

            let die = JSON.parse(dieJson) as Die;
            if(die.displayName.startsWith("d"))
            {
                returnString += props.mDieCount + die.displayName
            }
            else
            {
                returnString += props.mDieCount + 'x' + die.displayName
            }

            switch(props.mAdvantageDisadvantage) {
                case RollProperties.rollAdvantageValue : 
                    returnString += "(Advantage)"
                    break;
                case RollProperties.rollDisadvantageValue : 
                    returnString += "(Disadvantage)"
                    break;
            }

            if(props.mDropHigh != 0) {
                let dropString = getDropHighString(props.mDropHigh)
                returnString += '(' + dropString + ')';
            } 

            if(props.mDropLow != 0) {
                let dropString = getDropLowString(props.mDropLow)
                returnString += '(' + dropString + ')';
            }

            if(props.mKeepHigh != 0) {
                let keepString = getKeepHighString(props.mKeepHigh)
                returnString += '(' + keepString + ')';
            }

            if(props.mKeepLow != 0) {
                let keepString = getKeepLowString(props.mKeepLow)
                returnString += '(' + keepString + ')';
            }

            if(props.mUseReRoll != defaultProps.mUseReRoll
                && props.mReRoll != defaultProps.mReRoll)
            {
                let reRollString = getReRollString(props.mReRoll)
                returnString += '(' + reRollString + ')';
            }

            if(props.mUseMinimumRoll != defaultProps.mUseMinimumRoll
                && props.mMinimumRoll != defaultProps.mMinimumRoll)
            {
                let minString = getMinimumDieValueString(props.mMinimumRoll)
                returnString += '(' + minString + ')';
            }

            if(props.mExplode != defaultProps.mExplode) {
                returnString += '(Explode)';
            }

            if(props.mModifier != 0) {
                returnString += getModifierString(props.mModifier, true)
            }
        }

        return returnString
    }
}