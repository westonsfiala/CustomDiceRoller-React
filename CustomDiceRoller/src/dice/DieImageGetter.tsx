
export const DIE_UNKNOWN = -1;
export const DIE_FATE = 0;
export const DIE_2 = 2;
export const DIE_3 = 3;
export const DIE_4 = 4;
export const DIE_6 = 6;
export const DIE_8 = 8;
export const DIE_10 = 10;
export const DIE_12 = 12;
export const DIE_20 = 20;
export const DIE_100 = 100;

export function getRequiredImage(imageID : number) {
    switch(imageID)
    {
        case DIE_FATE: return require('./dieImages/white/fate.png');
        case DIE_2: return require('./dieImages/white/d2.png');
        case DIE_3: return require('./dieImages/white/d6-up-3.png');
        case DIE_4: return require('./dieImages/white/d4.png');
        case DIE_6: return require('./dieImages/white/d6-up-6.png');
        case DIE_8: return require('./dieImages/white/d8.png');
        case DIE_10: return require('./dieImages/white/d10.png');
        case DIE_12: return require('./dieImages/white/d12.png');
        case DIE_20: return require('./dieImages/white/d20.png');
        case DIE_100: return require('./dieImages/white/d100.png');
        default : return require('./dieImages/white/unknown-die.png');
    }

    // TODO: different switches for the themes.
}