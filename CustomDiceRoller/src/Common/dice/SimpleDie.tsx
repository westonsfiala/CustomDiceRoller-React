
import { 
    DIE_UNKNOWN,
    DIE_2,
    DIE_3,
    DIE_4,
    DIE_6,
    DIE_8,
    DIE_10,
    DIE_12,
    DIE_20,
    DIE_100
} from "./dieImages/DieImageGetter"

import { randomIntFromInterval } from "../utility/NumberHelper";
import { NumberDie } from "./NumberDie";
import { decimalToString } from "../utility/StringHelper";

export class SimpleDie extends NumberDie
{
    public static readonly simpleDieIdentifier = "Simple";

    public readonly mDie: number;

    constructor(dieName: string, die: number) 
    {
        if(dieName.length === 0)
        {
            dieName = SimpleDie.tempName(die.toString());
        }

        super(dieName, SimpleDie.simpleDieIdentifier);

        this.mDie = die;
    }

    static tempName(dieString : string)
    {
        return 'd' + dieString;
    }

    roll() :  number
    {
        if(this.mDie == 0) {
            return 0;
        } else {
            return randomIntFromInterval(1, this.mDie + 1);
        }
    }

    get max(): number {
        return this.mDie;
    }

    get min(): number {
        return 1;
    }

    get average() : number
    {
        return (this.mDie + 1) / 2;
    }

    expectedResult(minimum: number, rerollUnder:number, countAbove:number, explode:boolean) : number
    {
        let advAverage = 0;
        const normalAverage = this.average;

        for(let i = 0; i < Math.abs(this.mDie); i += 1) {
            let value = i+1;
            if(minimum > value) { value = Math.min(this.max, minimum); }
            if(rerollUnder >= value) { value = normalAverage; }
            if(explode && value == this.max) { 
                let numSides = this.max;
                if(numSides == 1)
                {
                    value = this.max + normalAverage;
                } else {
                    value = this.max + numSides/(numSides-1) * normalAverage; 
                }
            }
            if(countAbove !== 0) { 
                if(value >= countAbove) {
                    value = 1;
                    if(explode && value == this.max && normalAverage >= countAbove) { 
                        value += 1; 
                    }
                } else {
                    value = 0;
                }
            }
            advAverage += value;
        }

        advAverage /= this.mDie;

        return advAverage;
    }

    get info() : string
    {
        return 'Rolls a number between 1 and ' + this.mDie + '\nAverage of ' + decimalToString(this.average,2);
    }
 
    get imageID() : number
    {
        switch(this.mDie)
        {
            case 2: return DIE_2;
            case 3: return DIE_3;
            case 4: return DIE_4;
            case 6: return DIE_6;
            case 8: return DIE_8;
            case 10: return DIE_10;
            case 12: return DIE_12;
            case 20: return DIE_20;
            case 100: return DIE_100;
            default : return DIE_UNKNOWN;
        }
    }
}