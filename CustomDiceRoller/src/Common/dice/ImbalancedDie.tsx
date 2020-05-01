
import { Die } from "./Die"
import { 
    DIE_UNKNOWN,
} from "./dieImages/DieImageGetter"
import { concatterNoSpace } from "../utility/StringHelper";
import { randomIntFromInterval } from "../utility/NumberHelper";

export class ImbalancedDie extends Die
{
    public static readonly imbalancedIdentifier = "Imbalanced";

    public readonly mFaces: Array<number>;

    constructor(dieName: string, faces: Array<number>) 
    {
        if(dieName.length === 0)
        {
            dieName = ImbalancedDie.tempName(faces.reduce(concatterNoSpace, ''));
        }

        super(dieName, ImbalancedDie.imbalancedIdentifier);

        this.mFaces = faces;
    }

    static tempName(facesString: string) {

        if(facesString == undefined || facesString.length === 0) {return 'd0';}

        let name = 'd';
        
        let splitFaces = facesString.split(',');

        for(let face of splitFaces) {
            face.trim();
            if(face.length !== 0) {
                name += face + '-';
            }
        }

        name = name.substring(0, name.length-1)

        return name;
    }

    roll() :  number
    {
        if(this.mFaces.length === 0) {return 0;}

        let index = randomIntFromInterval(0, this.mFaces.length);

        return this.mFaces[index];
    }

    get max(): number {
        let max = 0;
        this.mFaces.forEach((value) => max = Math.max(value, max));
        return max;
    }

    get min(): number {
        let min = 0;
        this.mFaces.forEach((value) => min = Math.min(value, min));
        return min;
    }

    get average() : number
    {
        if(this.mFaces.length === 0) {return 0;}

        let average = 0;
        this.mFaces.forEach((value) => average += value);
        return average / this.mFaces.length;
    }
    
    expectedResult(minimum: number, rerollUnder:number, countAbove:number, explode:boolean) : number
    {
        let advAverage = 0;
        const normalAverage = this.average;

        this.mFaces.forEach((face) => {
            let value = face;
            if(minimum > value) { value = Math.min(this.max, minimum); }
            if(rerollUnder >= value) { value = normalAverage; }
            if(explode && value == this.max) { 
                let numSides = this.mFaces.length;
                if(numSides == 1)
                {
                    value = this.max + normalAverage;
                } else {
                    value = this.max + numSides/(numSides-1) * normalAverage; 
                }
            }
            if(countAbove > 0 && value >= countAbove) { 
                value = 1;
                if(explode && value == this.max && normalAverage >= countAbove) { 
                    value += 1; 
                }
            }
            advAverage += value;
        });

        if(this.mFaces.length !== 0)
        {
            advAverage /= this.mFaces.length;
        }

        return advAverage;
    }

    get info() : string
    {
        let dieStrings = '';

        if(this.mFaces.length === 0) {
            dieStrings = '0'
        } else {
            dieStrings = this.mFaces.reduce(concatterNoSpace, '');
        }

        return 'Rolls one of the following: ' + dieStrings + '\nAverage of ' + this.average;
    }
 
    get imageID() : number
    {
        return DIE_UNKNOWN;
    }
}