
import { 
    DIE_UNKNOWN,
} from "./dieImages/DieImageGetter"
import { concatterNoSpace } from "../utility/StringHelper";
import { randomIntFromInterval } from "../utility/NumberHelper";
import { NonNumberDie } from "./NonNumberDie";

export class WordDie extends NonNumberDie
{
    public static readonly wordIdentifier = "Word";

    public readonly mFaces: Array<string>;

    constructor(dieName: string, faces: Array<string>) 
    {
        if(dieName.length === 0)
        {
            dieName = WordDie.tempName(faces);
        }

        super(dieName, WordDie.wordIdentifier);

        this.mFaces = faces;
    }

    static tempName(facesArray: Array<string>) {

        if(facesArray == undefined || facesArray.length === 0) {return '';}

        let name = '';

        for(let face of facesArray) {
            face.trim();
            if(face.length !== 0) {
                name += face + '-';
            }
        }

        name = name.substring(0, name.length-1)

        return name;
    }

    roll() :  any
    {
        if(this.mFaces.length === 0) {return 0;}

        let index = randomIntFromInterval(0, this.mFaces.length);

        return this.mFaces[index];
    }

    isText() : boolean {
        return true;
    }

    get info() : string
    {
        let dieStrings = '';

        if(this.mFaces.length === 0) {
            dieStrings = '0'
        } else {
            dieStrings = this.mFaces.reduce(concatterNoSpace, '');
        }

        return 'Rolls one of the following: ' + dieStrings;
    }
 
    get imageID() : number
    {
        return DIE_UNKNOWN;
    }
}