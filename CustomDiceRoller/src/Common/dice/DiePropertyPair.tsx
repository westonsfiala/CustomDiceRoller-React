import { Die } from "../dice/Die";
import { RollProperties } from "../dice/RollProperties";

export class DiePropertyPair {

    mDie: Die;
    mProperties: RollProperties;

    constructor(die: Die, properties: RollProperties) {
        this.mDie = die;
        this.mProperties = properties;
    }
}