
class DieLoadError extends Error {

}

export abstract class Die {

    public static readonly dieDisplayInHexID = '0x';

    mDieName: string;

    constructor(dieName: string) {
        this.mDieName = dieName;
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

    abstract get getInfo() : string;

    abstract get getImageID() : string;
}