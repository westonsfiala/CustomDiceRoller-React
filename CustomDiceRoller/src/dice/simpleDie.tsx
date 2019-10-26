import { randomIntFromInterval } from "../rollHelper";
import { Die } from "./Die"

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

    clone(newName: string) : Die {
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

    get getInfo() : string
    {
        return 'Rolls a number between 1 and ' + this.mDie + '\nAverage of ' + this.average;
    }

    get getImageID() : string
    {
        switch(this.mDie)
        {
            case 2: return 'd2';
            case 3: return 'd6-up-3';
            case 4: return 'd4';
            case 6: return 'd6-up-6';
            case 8: return 'd8';
            case 10: return 'd10';
            case 12: return 'd12';
            case 20: return 'd20';
            case 100: return 'd100';
            default : return 'unknown-die'
        }
    }
}