import { randomIntFromInterval } from "../rollHelper";
import { Die } from "./Die"

export class SimpleDie extends Die
{
    public static readonly simpleDieStringStart = "Simple";

    mDie: number;

    constructor(dieName: String, die: number) {
        if(dieName.length === 0)
        {
            dieName = 'd' + die;
        }

        super(dieName);

        this.mDie = die;
    }

    clone(newName: String) : Die {
        return new SimpleDie(newName, this.mDie);
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

    get getInfo() : String
    {
        return 'Rolls a number between 1 and ' + this.mDie + '\nAverage of ' + this.average;
    }

    get getImageID() : number
    {
        // TODO: Make this work.
        return 0;

        // return when(mDie)
        // {
        //     2 -> DIE_2
        //     3 -> DIE_3
        //     4 -> DIE_4
        //     6 -> DIE_6
        //     8 -> DIE_8
        //     10 -> DIE_10
        //     12 -> DIE_12
        //     20 -> DIE_20
        //     100 -> DIE_100
        //     else -> DIE_UNKNOWN
        // }
    }
}