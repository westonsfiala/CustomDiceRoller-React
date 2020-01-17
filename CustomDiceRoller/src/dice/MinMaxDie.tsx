
import { Die } from "./Die"
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
    DIE_100,
    DIE_FATE
} from "./dieImages/DieImageGetter"
import { randomIntFromInterval } from "../helpers/NumberHelper";

export class MinMaxDie extends Die
{
    public static readonly minMaxDieIdentifier = "MinMax";

    public readonly mMinimum: number;
    public readonly mMaximum: number;

    constructor(dieName: string, min: number, max: number) 
    {
        let realMin = Math.min(min, max);
        let realMax = Math.max(min, max);

        if(dieName.length === 0)
        {
            dieName = MinMaxDie.tempName(realMin.toString(), realMax.toString());
        }

        super(dieName, MinMaxDie.minMaxDieIdentifier);

        this.mMinimum = realMin;
        this.mMaximum = realMax;
    }

    static tempName(minString: string, maxString: string) {
        return 'd' + minString + ':' + maxString;
    }

    roll() :  number
    {
        return randomIntFromInterval(this.mMinimum, this.mMaximum+1);
    }

    get max(): number {
        return this.mMaximum;
    }

    get min(): number {
        return this.mMinimum;
    }

    get average() : number
    {
        return (this.mMinimum + this.mMaximum) / 2;
    }

    get info() : string
    {
        return 'Rolls a number between ' + this.mMinimum + ' and ' + this.mMaximum + '\nAverage of ' + this.average;
    }
 
    get imageID() : number
    {
        switch(this.mMinimum)
        {
            case -1: switch(this.mMaximum) {
                case 1: return DIE_FATE;
                default : return DIE_UNKNOWN;
            }
            case 1: switch(this.mMaximum) {
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
            default : return DIE_UNKNOWN;
        }
    }
}