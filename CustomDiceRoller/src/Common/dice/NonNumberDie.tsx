import { Die } from "./Die";

export class DieLoadError extends Error {
    constructor() {
        super("");
    }
}

export abstract class NonNumberDie extends Die {

    public static readonly dieDisplayInHexID = '0x';

    public mDieName: string;
    public readonly mDieType: string;

    constructor(dieName: string, dieType: string) {
        super(dieName, dieType);
    }
    
    isNumbered() : boolean {
        return false;
    }

    get max() : number { return -1; }

    get min() : number { return -1; }

    get average() : number { return -1; }

    expectedResult(minimum: number, rerollUnder:number, countAbove:number, explode:boolean) : number { return -1; }


}