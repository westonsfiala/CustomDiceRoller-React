
import { Die } from "./Die"
import {randomIntFromInterval} from "./RandomNumberRoller"
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

} from "./DieImageGetter"

export class SimpleDie extends Die
{
    public static readonly simpleDieIdentifier = "Simple";

    public readonly mDie: number;

    constructor(dieName: string, die: number) 
    {
        if(dieName.length === 0)
        {
            dieName = 'd' + die;
        }

        super(dieName, SimpleDie.simpleDieIdentifier);

        this.mDie = die;
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

    get info() : string
    {
        return 'Rolls a number between 1 and ' + this.mDie + '\nAverage of ' + this.average;
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