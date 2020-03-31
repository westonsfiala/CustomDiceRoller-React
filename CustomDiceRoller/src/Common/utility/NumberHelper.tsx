

// Sometimes we do not want to allow for the value to be 0.
export function enforceGoodValue(value: number, change: number, disallowZero: boolean) {
    let newValue = value + change;

    if(newValue != 0 || !disallowZero) {
        return newValue;
    }

    if(value < -1 && change > 1) {
        return -1;
    }

    if(value > 1 && change < -1) {
        return 1;
    }

    if(change >= 0) {
        return 1;
    }

    return -1
}

// Will return the increment that is needed to snap to the next evenly divisible stepSize.
// i.e (101, 100) -> 99, (101,-100) -> -1
export function snapToNextIncrement(valueIn: number, stepSize: number) {
    if(stepSize == 0 )
    {
        return valueIn
    }

    let valueRem = valueIn % stepSize

    // If you are negative jumping up, or positive jumping down, just drop down/up the remainder.
    if((valueRem > 0 && stepSize < 0) || (valueRem < 0 && stepSize > 0))
    {
        return -valueRem
    }
    else
    {
        return -valueRem + stepSize
    }
}

// Generates a random number between [min,max]
export function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}