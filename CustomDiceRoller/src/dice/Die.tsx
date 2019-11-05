
export class DieLoadError extends Error {
    constructor() {
        super("");
    }
}

export abstract class Die {

    public static readonly dieDisplayInHexID = '0x';

    public readonly mDieName: string;
    public readonly mDieType: string;

    constructor(dieName: string, dieType: string) {
        this.mDieName = dieName;
        this.mDieType = dieType;
    }

    abstract clone(newName : string) : Die;

    abstract roll() : number;

    abstract get max() : number;

    abstract get min() : number;

    abstract get average() : number;

    get displayInHex() : boolean {
        // Only display hex when you start with "0x" and have more characters after that.
        return this.mDieName.length > Die.dieDisplayInHexID.length && 
            this.mDieName.startsWith (Die.dieDisplayInHexID);
    }

    get displayName() : string { return this.mDieName; }

    abstract get info() : string;

    abstract get imageID() : number;
}