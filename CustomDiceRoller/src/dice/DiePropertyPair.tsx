import { Die } from "./Die";
import { RollProperties } from "./RollProperties";

export class DiePropertyPair {

    mDie: Die;
    mProperties: RollProperties;

    constructor(die: Die, properties: RollProperties) {
        this.mDie = die;
        this.mProperties = properties;
    }
}