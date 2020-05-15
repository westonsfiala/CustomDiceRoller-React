import { Die } from "./Die";

export class DieLoadError extends Error {
    constructor() {
        super("");
    }
}

export abstract class NumberDie extends Die {

    public static readonly dieDisplayInHexID = '0x';

    public mDieName: string;
    public readonly mDieType: string;

    constructor(dieName: string, dieType: string) {
        super(dieName, dieType);
    }

    abstract roll() : number;
    
    isNumbered() : boolean {
        return true;
    }

    isText() : boolean {
        return true;
    }

    abstract get max() : number;

    abstract get min() : number;

    abstract get average() : number;

    abstract expectedResult(minimum: number, rerollUnder:number, countAbove:number, explode:boolean) : number;

    get displayInHex() : boolean {
        // Only display hex when you start with "0x" and have more characters after that.
        return this.mDieName.length > Die.dieDisplayInHexID.length && 
            this.mDieName.startsWith (Die.dieDisplayInHexID);
    }
}