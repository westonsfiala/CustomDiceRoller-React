
import {Roll} from '../../Common/dice/Roll';

export class RollCategoryGroup {
    baseCategory: string;
    category: string;
    rolls: Array<Roll>;
    subRolls: Array<Roll>;
}