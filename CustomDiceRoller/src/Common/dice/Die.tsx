
export class DieLoadError extends Error {
    constructor() {
        super("");
    }
}

export abstract class Die {

    public static readonly dieDisplayInHexID = '0x';

    public mDieName: string;
    public readonly mDieType: string;

    constructor(dieName: string, dieType: string) {
        this.mDieName = dieName;
        this.mDieType = dieType;
    }

    abstract roll() : any;

    abstract isNumbered() : boolean;

    abstract isText() : boolean;

    abstract get max() : number;

    abstract get min() : number;

    abstract get average() : number;

    abstract expectedResult(minimum: number, rerollUnder:number, countAbove:number, explode:boolean) : number;

    get displayName() : string { return this.mDieName; }

    get displayInHex() : boolean {
        // Only display hex when you start with "0x" and have more characters after that.
        return this.mDieName.length > Die.dieDisplayInHexID.length && 
            this.mDieName.startsWith (Die.dieDisplayInHexID);
    }

    abstract get info() : string;

    abstract get imageID() : number;
}