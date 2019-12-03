

export function getModifierString(value: number, hideZero: boolean) {

    if(hideZero && value === 0) {
        return '';
    }

    let preFix = '';
    if(value >= 0) {
        preFix = '+';
    }

    return preFix + value;
}

export function getNumDiceString(numDice : number) : string
{
    return numDice + 'd';
}

export function getDropHighString(drop : number) : string
{
    return 'Drop ' + drop + ' Highest';
}

export function getDropLowString(drop : number) : string
{
    return 'Drop ' + drop + ' Lowest';
}

export function getKeepHighString(keep : number) : string
{
    return 'Keep ' + keep + ' Highest';
}

export function getKeepLowString(keep : number) : string
{
    return 'Keep ' + keep + ' Lowest';
}

export function getReRollString(reroll : number) : string
{
    return 'Re-Roll Die <= |' + reroll + '|'
}

export function getMinimumString(minimum : number) : string
{
    return 'Minimum Value = |' + minimum + '|'
}

export function getDropHighTitle() : string
{
    return 'Drop X Highest';
}

export function getDropLowTitle() : string
{
    return 'Drop X Lowest';
}

export function getKeepHighTitle() : string
{
    return 'Keep X Highest';
}

export function getKeepLowTitle() : string
{
    return 'Keep X Lowest';
}

export function getReRollTitle() : string
{
    return 'Re-Roll Die <= |X|'
}

export function getMinimumTitle() : string
{
    return 'Minimum Value = |X|'
}