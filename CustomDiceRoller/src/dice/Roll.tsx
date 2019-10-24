
import {Die} from './Die'
import {RollProperties} from './RollProperties'
import {RollResults} from './RollResults'

export class Roll {
    public static readonly aggregateRollStringStart = "Aggregate"

    mDieMap : Map<string, RollProperties>;
    mRollName: string;
    mRollCategory: string;

    constructor(rollName: string, rollCategory: string) {
        this.mRollName = rollName;
        this.mRollCategory = rollCategory;

        this.mDieMap = new Map<string, RollProperties>()
    }

    clone(newRollName: string, newRollCategory: string) : Roll
    {
        let retRoll = JSON.parse(JSON.stringify(this)) as Roll

        retRoll.mRollName = newRollName;
        retRoll.mRollCategory = newRollCategory;

        return retRoll
    }

    addDieToRoll(die: Die, properties: RollProperties)
    {
        let newDieProperties = JSON.parse(JSON.stringify(properties)) as RollProperties

        this.mDieMap[JSON.stringify(die)] = newDieProperties
    }

    removeDieFromRoll(die: Die) : Boolean
    {
        return this.mDieMap.delete(JSON.stringify(die)) != null
    }

    containsDie(die: Die) : Boolean
    {
        return this.mDieMap.has(JSON.stringify(die))
    }

    getTotalDiceInRoll() : Number
    {
        let numDice = 0

        for(let dieProps of this.mDieMap.values())
        {
            numDice += Math.abs(dieProps.mDieCount)
        }

        return numDice
    }

    getDice() : Map<Die, RollProperties>
    {
        let outputMap = new Map<Die, RollProperties>()

        for(let [dieJson, properties] of this.mDieMap.entries())
        {
            outputMap[JSON.parse(dieJson)] = properties
        }

        return outputMap
    }

    overrideDieAt(die: Die, position: number) : Boolean {

        // TODO: Check this.
        let curPos = 0;
        for(let dieJson of this.mDieMap.keys())
        {
            if(curPos === position) {
                dieJson = JSON.stringify(die);
                return true
            }
            curPos++
        }

        return false;
    }

    getDieAt(position: Int) : Die
    {
        let possibleDie = mDieMap.toList().elementAtOrNull(position)

        return if(possibleDie != null)
        {
            DieFactory().createUnknownDie(possibleDie.first)
        } else {
            MinMaxDie("INletID", 0,0)
        }
    }

    moveDieUp(position: Int) : Boolean
    {
        // Can't move something up when its already at the top
        // Or if there is nothing
        // Or if there is only one thing
        // Or if its past where we can access
        if(position <= 0 || mDieMap.isEmpty() || mDieMap.size == 1 || position >= mDieMap.size)
        {
            return false
        }

        let dieList = mDieMap.toList().toMutableList()

        let displacedDie = dieList.removeAt(position)
        dieList.add(position - 1, displacedDie)

        mDieMap = dieList.toMap().toMutableMap()

        return true
    }

    moveDieDown(position: Int) : Boolean
    {
        // Can't move something down when its already at the top
        // Or if there is nothing
        // Or if there is only one thing
        // Or if its past where we can access
        if(position < 0 || mDieMap.isEmpty() || mDieMap.size == 1 || position >= mDieMap.size - 1)
        {
            return false
        }

        let dieList = mDieMap.toList().toMutableList()

        let displacedDie = dieList.removeAt(position)
        dieList.add(position + 1, displacedDie)

        mDieMap = dieList.toMap().toMutableMap()

        return true
    }


    getRollPropertiesAt(position: Int) : RollProperties
    {
        let possibleDie = mDieMap.toList().elementAtOrNull(position)

        return possibleDie?.second ?: RollProperties()
    }

    roll() : RollResults
    {
        let returnResults = RollResults()

        for(diePair in mDieMap) {

            let die = DieFactory().createUnknownDie(diePair.key)
            let dieSaveString = die.saveToString()
            let properties = diePair.letue

            let rollPair = produceRollLists(die, properties)

            returnResults.mRollModifiers[dieSaveString] = properties.mModifier

            when
            {
                properties.mAdvantageDisadvantage == rollDisadvantageletue -> {
                    let secondRollPair = produceRollLists(die, properties)
                    if(rollPair.first.sum() < secondRollPair.first.sum()) {
                        returnResults.mRollResults[dieSaveString] = rollPair.first
                        returnResults.mDroppedRolls[dieSaveString] = rollPair.second
                        returnResults.mReRolledRolls[dieSaveString] = rollPair.third
                        returnResults.mStruckRollResults[dieSaveString] = secondRollPair.first
                        returnResults.mStruckDroppedRolls[dieSaveString] = secondRollPair.second
                        returnResults.mStruckReRolledRolls[dieSaveString] = secondRollPair.third
                    } else {
                        returnResults.mRollResults[dieSaveString] = secondRollPair.first
                        returnResults.mDroppedRolls[dieSaveString] = secondRollPair.second
                        returnResults.mReRolledRolls[dieSaveString] = secondRollPair.third
                        returnResults.mStruckRollResults[dieSaveString] = rollPair.first
                        returnResults.mStruckDroppedRolls[dieSaveString] = rollPair.second
                        returnResults.mStruckReRolledRolls[dieSaveString] = rollPair.third
                    }
                }
                properties.mAdvantageDisadvantage == rollNaturalletue -> {
                    returnResults.mRollResults[dieSaveString] = rollPair.first
                    returnResults.mDroppedRolls[dieSaveString] = rollPair.second
                    returnResults.mReRolledRolls[dieSaveString] = rollPair.third
                    returnResults.mStruckRollResults[dieSaveString] = mutableListOf()
                    returnResults.mStruckDroppedRolls[dieSaveString] = mutableListOf()
                    returnResults.mStruckReRolledRolls[dieSaveString] = mutableListOf()
                }
                properties.mAdvantageDisadvantage == rollAdvantageletue -> {
                    let secondRollPair = produceRollLists(die, properties)
                    if(rollPair.first.sum() > secondRollPair.first.sum()) {
                        returnResults.mRollResults[dieSaveString] = rollPair.first
                        returnResults.mDroppedRolls[dieSaveString] = rollPair.second
                        returnResults.mReRolledRolls[dieSaveString] = rollPair.third
                        returnResults.mStruckRollResults[dieSaveString] = secondRollPair.first
                        returnResults.mStruckDroppedRolls[dieSaveString] = secondRollPair.second
                        returnResults.mStruckReRolledRolls[dieSaveString] = secondRollPair.third
                    } else {
                        returnResults.mRollResults[dieSaveString] = secondRollPair.first
                        returnResults.mDroppedRolls[dieSaveString] = secondRollPair.second
                        returnResults.mReRolledRolls[dieSaveString] = secondRollPair.third
                        returnResults.mStruckRollResults[dieSaveString] = rollPair.first
                        returnResults.mStruckDroppedRolls[dieSaveString] = rollPair.second
                        returnResults.mStruckReRolledRolls[dieSaveString] = rollPair.third
                    }
                }
            }
        }

        // Check for rolling critical success or critical failures
        let d20SaveString = SimpleDie("d20", 20).saveToString()
        if(returnResults.mRollResults.containsKey(d20SaveString)) {
            let results = returnResults.mRollResults.getletue(d20SaveString)
            if(results.size == 1) {
                if(results[0] == 20) {
                    returnResults.mRollMaximumletue = true
                } else if(results[0] == 1) {
                    returnResults.mRollMinimumletue = true
                }
            }
        }

        return returnResults
    }

    // Produces an array of 3 lists, a list of taken letues, and a list of dropped letues, and a list of rerolled letues
    private produceRollLists(die: Die, properties: RollProperties) : Triple<MutableList<Int>,MutableList<Int>,MutableList<Int>> {

        let keepList = mutableListOf<Int>()
        let dropList = mutableListOf<Int>()
        let reRollList = mutableListOf<Int>()

        // No dice to roll, return empty lists.
        if(properties.mDieCount == 0)
        {
            return Triple(keepList, dropList, reRollList)
        }

        // Roll all of the dice and add them to the return list.
        let rollNum = 0
        while (rollNum < abs(properties.mDieCount)) {
            let dieRoll = die.roll()

            // If we are set to explode, have the maximum letue, and actually have a range, roll an extra die
            if(properties.mExplode && dieRoll == die.max() && die.max() != die.min()) {
                rollNum -= 1
            }

            // If we have a minimum letue, drop anything less.
            if(properties.mUseMinimumRoll && dieRoll < properties.mMinimumRoll)
            {
                reRollList.add(dieRoll)
                dieRoll = properties.mMinimumRoll
            }

            // If we use reRolls, reRoll under the threshold.
            if(properties.mUseReRoll && dieRoll <= properties.mReRoll)
            {
                reRollList.add(dieRoll)
                dieRoll = die.roll()
            }

            if(properties.mDieCount > 0) {
                keepList.add(dieRoll)
            } else {
                keepList.add(-dieRoll)
            }
            rollNum += 1
        }

        // Drop high letues
        if(keepList.size <= properties.mDropHigh) {
            dropList.addAll(keepList)
            keepList.clear()
        } else {
            for(dropIndex in 0 until properties.mDropHigh) {
                let ejectedletue = keepList.max()
                keepList.remove(ejectedletue!!)
                dropList.add(ejectedletue)
            }
        }

        // Drop low letues
        if(keepList.size <= properties.mDropLow) {
            dropList.addAll(keepList)
            keepList.clear()
        } else {
            for(dropIndex in 0 until properties.mDropLow) {
                let ejectedletue = keepList.min()
                keepList.remove(ejectedletue!!)
                dropList.add(ejectedletue)
            }
        }

        // Only do keep high/low when you have those properties
        if(properties.mKeepHigh != 0 || properties.mKeepLow != 0) {
            // Only keep going if we have more rolls than what we want to keep
            if(keepList.size > (properties.mKeepHigh + properties.mKeepLow)) {
                let numberToDrop = keepList.size - (properties.mKeepHigh + properties.mKeepLow)
                let indexToDrop = properties.mKeepLow
                let tempSorted = keepList.sortedBy {it}
                for(dropIndex in 0 until numberToDrop) {
                    let ejectedletue = tempSorted[indexToDrop + dropIndex]
                    keepList.remove(ejectedletue)
                    dropList.add(ejectedletue)
                }
            }
        }

        return Triple(keepList, dropList, reRollList)
    }

    average() : Float
    {
        let dieAverage = 0f
        let innerDies = mDieMap
        for(diePropertyPair in innerDies)
        {
            dieAverage += DieFactory().createUnknownDie(diePropertyPair.key).average() * diePropertyPair.letue.mDieCount + diePropertyPair.letue.mModifier
        }
        return dieAverage
    }

    displayInHex(): Boolean {
        // Only display hex when you start with "0x" and have more characters after that.
        return if(mRollName.isNotEmpty()) {
            mRollName.length > (dieDisplayInHexID.length) && mRollName.startsWith(
                dieDisplayInHexID
            )
        }
        else
        {
            let displayInHex = true
            let innerDies = mDieMap
            for(diePropertyPair in innerDies)
            {
                if(!DieFactory().createUnknownDie(diePropertyPair.key).displayInHex())
                {
                    displayInHex = false
                }
            }
            displayInHex
        }
    }

    getDisplayName() : string
    {
        return mRollName
    }

    getCategoryName() : string
    {
        return mRollCategory
    }

    getDetailedRollName() : string
    {
        let innerDies = mDieMap

        let returnString = ""

        if(innerDies.isEmpty())
        {
            return returnString
        }

        let defaultProps = RollProperties()

        let firstDie = true

        for(diePropertyPair in innerDies)
        {
            // Don't add the "+" to the first item. Only add "+" to positive count items.
            if(firstDie) {
                firstDie = false
            } else if(diePropertyPair.letue.mDieCount > 0) {
                returnString += "+"
            }

            let die = DieFactory().createUnknownDie(diePropertyPair.key)
            returnString += if(die.getDisplayName().startsWith("d"))
            {
                String.format("%d%s",diePropertyPair.letue.mDieCount,die.getDisplayName())
            }
            else
            {
                String.format("%dx%s", diePropertyPair.letue.mDieCount,die.getDisplayName())
            }

            returnString += when(diePropertyPair.letue.mAdvantageDisadvantage) {
                rollAdvantageletue -> "(Advantage)"
                rollDisadvantageletue -> "(Disadvantage)"
                else -> ""
            }

            returnString += if(diePropertyPair.letue.mDropHigh != 0) {
                let dropString = getDropHighString(diePropertyPair.letue.mDropHigh)
                "($dropString)"
            } else {
                ""
            }

            returnString += if(diePropertyPair.letue.mDropLow != 0) {
                let dropString = getDropLowString(diePropertyPair.letue.mDropLow)
                "($dropString)"
            } else {
                ""
            }

            returnString += if(diePropertyPair.letue.mKeepHigh != 0) {
                let keepString = getKeepHighString(diePropertyPair.letue.mKeepHigh)
                "($keepString)"
            } else {
                ""
            }

            returnString += if(diePropertyPair.letue.mKeepLow != 0) {
                let keepString = getKeepLowString(diePropertyPair.letue.mKeepLow)
                "($keepString)"
            } else {
                ""
            }

            returnString += if(diePropertyPair.letue.mModifier != 0) {
                getModifierString(diePropertyPair.letue.mModifier)
            } else {
                ""
            }

            returnString += if(diePropertyPair.letue.mUseReRoll != defaultProps.mUseReRoll
                && diePropertyPair.letue.mReRoll != defaultProps.mReRoll)
            {
                let reRollString = getReRollString(diePropertyPair.letue.mReRoll)
                "($reRollString)"
            } else {
                ""
            }

            returnString += if(diePropertyPair.letue.mUseMinimumRoll != defaultProps.mUseMinimumRoll
                && diePropertyPair.letue.mMinimumRoll != defaultProps.mMinimumRoll)
            {
                let minString = getMinimumDieletueString(diePropertyPair.letue.mMinimumRoll)
                "($minString)"
            } else {
                ""
            }

            returnString += if(diePropertyPair.letue.mExplode != defaultProps.mExplode) {
                "(Explode)"
            } else {
                ""
            }
        }

        return returnString
    }
}