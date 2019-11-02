
import {SimpleDie} from './SimpleDie'


export const standardDice = [
    {
        id:'d2',
        die: new SimpleDie('d2', 2)
    },
    {
        id:'d4',
        die: new SimpleDie('d4', 4)
    },
    {
        id:'d6',
        die: new SimpleDie('d6', 6)
    },
    {
        id:'d8',
        die: new SimpleDie('d8', 8)
    },
    {
        id:'d10',
        die: new SimpleDie('d10', 10)
    },
    {
        id:'d12',
        die: new SimpleDie('d12', 12)
    },
    {
        id:'d20',
        die: new SimpleDie('d20', 20)
    },
    {
        id:'d100',
        die: new SimpleDie('d100', 100)
    },
];