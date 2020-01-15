import ThemeManager from "../sync/ThemeManager";

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

    let selectedTheme = ThemeManager.getInstance().getDieThemeString();
    
    // Basic Themes
    if(selectedTheme === 'Fire') {
        switch(imageID)
        {
            case DIE_FATE: return require('./dieImages/fire/fate.png');
            case DIE_2: return require('./dieImages/fire/d2.png');
            case DIE_3: return require('./dieImages/fire/d3.png');
            case DIE_4: return require('./dieImages/fire/d4.png');
            case DIE_6: return require('./dieImages/fire/d6.png');
            case DIE_8: return require('./dieImages/fire/d8.png');
            case DIE_10: return require('./dieImages/fire/d10.png');
            case DIE_12: return require('./dieImages/fire/d12.png');
            case DIE_20: return require('./dieImages/fire/d20.png');
            case DIE_100: return require('./dieImages/fire/d100.png');
            default : return require('./dieImages/fire/unknown-die.png');
        }
    }
    if(selectedTheme === 'Forest') {
        switch(imageID)
        {
            case DIE_FATE: return require('./dieImages/forest/fate.png');
            case DIE_2: return require('./dieImages/forest/d2.png');
            case DIE_3: return require('./dieImages/forest/d3.png');
            case DIE_4: return require('./dieImages/forest/d4.png');
            case DIE_6: return require('./dieImages/forest/d6.png');
            case DIE_8: return require('./dieImages/forest/d8.png');
            case DIE_10: return require('./dieImages/forest/d10.png');
            case DIE_12: return require('./dieImages/forest/d12.png');
            case DIE_20: return require('./dieImages/forest/d20.png');
            case DIE_100: return require('./dieImages/forest/d100.png');
            default : return require('./dieImages/forest/unknown-die.png');
        }
    }
    if(selectedTheme === 'Beach') {
        switch(imageID)
        {
            case DIE_FATE: return require('./dieImages/beach/fate.png');
            case DIE_2: return require('./dieImages/beach/d2.png');
            case DIE_3: return require('./dieImages/beach/d3.png');
            case DIE_4: return require('./dieImages/beach/d4.png');
            case DIE_6: return require('./dieImages/beach/d6.png');
            case DIE_8: return require('./dieImages/beach/d8.png');
            case DIE_10: return require('./dieImages/beach/d10.png');
            case DIE_12: return require('./dieImages/beach/d12.png');
            case DIE_20: return require('./dieImages/beach/d20.png');
            case DIE_100: return require('./dieImages/beach/d100.png');
            default : return require('./dieImages/beach/unknown-die.png');
        }
    }
    if(selectedTheme === 'RGB') {
        switch(imageID)
        {
            case DIE_FATE: return require('./dieImages/rgb/fate.png');
            case DIE_2: return require('./dieImages/rgb/d2.png');
            case DIE_3: return require('./dieImages/rgb/d3.png');
            case DIE_4: return require('./dieImages/rgb/d4.png');
            case DIE_6: return require('./dieImages/rgb/d6.png');
            case DIE_8: return require('./dieImages/rgb/d8.png');
            case DIE_10: return require('./dieImages/rgb/d10.png');
            case DIE_12: return require('./dieImages/rgb/d12.png');
            case DIE_20: return require('./dieImages/rgb/d20.png');
            case DIE_100: return require('./dieImages/rgb/d100.png');
            default : return require('./dieImages/rgb/unknown-die.png');
        }
    }
    if(selectedTheme === 'Rainbow') {
        switch(imageID)
        {
            case DIE_FATE: return require('./dieImages/rainbow/fate.png');
            case DIE_2: return require('./dieImages/rainbow/d2.png');
            case DIE_3: return require('./dieImages/rainbow/d3.png');
            case DIE_4: return require('./dieImages/rainbow/d4.png');
            case DIE_6: return require('./dieImages/rainbow/d6.png');
            case DIE_8: return require('./dieImages/rainbow/d8.png');
            case DIE_10: return require('./dieImages/rainbow/d10.png');
            case DIE_12: return require('./dieImages/rainbow/d12.png');
            case DIE_20: return require('./dieImages/rainbow/d20.png');
            case DIE_100: return require('./dieImages/rainbow/d100.png');
            default : return require('./dieImages/rainbow/unknown-die.png');
        }
    }

    // Metallic Themes
    if(selectedTheme === 'Steel') {
        switch(imageID)
        {
            case DIE_FATE: return require('./dieImages/steel/fate.png');
            case DIE_2: return require('./dieImages/steel/d2.png');
            case DIE_3: return require('./dieImages/steel/d3.png');
            case DIE_4: return require('./dieImages/steel/d4.png');
            case DIE_6: return require('./dieImages/steel/d6.png');
            case DIE_8: return require('./dieImages/steel/d8.png');
            case DIE_10: return require('./dieImages/steel/d10.png');
            case DIE_12: return require('./dieImages/steel/d12.png');
            case DIE_20: return require('./dieImages/steel/d20.png');
            case DIE_100: return require('./dieImages/steel/d100.png');
            default : return require('./dieImages/steel/unknown-die.png');
        }
    }
    if(selectedTheme === 'Gold') {
        switch(imageID)
        {
            case DIE_FATE: return require('./dieImages/gold/fate.png');
            case DIE_2: return require('./dieImages/gold/d2.png');
            case DIE_3: return require('./dieImages/gold/d3.png');
            case DIE_4: return require('./dieImages/gold/d4.png');
            case DIE_6: return require('./dieImages/gold/d6.png');
            case DIE_8: return require('./dieImages/gold/d8.png');
            case DIE_10: return require('./dieImages/gold/d10.png');
            case DIE_12: return require('./dieImages/gold/d12.png');
            case DIE_20: return require('./dieImages/gold/d20.png');
            case DIE_100: return require('./dieImages/gold/d100.png');
            default : return require('./dieImages/gold/unknown-die.png');
        }
    }

    // Ice Cream Themes
    if(selectedTheme === 'Creamsicle') {
        switch(imageID)
        {
            case DIE_FATE: return require('./dieImages/creamsicle/fate.png');
            case DIE_2: return require('./dieImages/creamsicle/d2.png');
            case DIE_3: return require('./dieImages/creamsicle/d3.png');
            case DIE_4: return require('./dieImages/creamsicle/d4.png');
            case DIE_6: return require('./dieImages/creamsicle/d6.png');
            case DIE_8: return require('./dieImages/creamsicle/d8.png');
            case DIE_10: return require('./dieImages/creamsicle/d10.png');
            case DIE_12: return require('./dieImages/creamsicle/d12.png');
            case DIE_20: return require('./dieImages/creamsicle/d20.png');
            case DIE_100: return require('./dieImages/creamsicle/d100.png');
            default : return require('./dieImages/creamsicle/unknown-die.png');
        }
    }
    if(selectedTheme === 'Mint Chocolate') {
        switch(imageID)
        {
            case DIE_FATE: return require('./dieImages/mint-chocolate/fate.png');
            case DIE_2: return require('./dieImages/mint-chocolate/d2.png');
            case DIE_3: return require('./dieImages/mint-chocolate/d3.png');
            case DIE_4: return require('./dieImages/mint-chocolate/d4.png');
            case DIE_6: return require('./dieImages/mint-chocolate/d6.png');
            case DIE_8: return require('./dieImages/mint-chocolate/d8.png');
            case DIE_10: return require('./dieImages/mint-chocolate/d10.png');
            case DIE_12: return require('./dieImages/mint-chocolate/d12.png');
            case DIE_20: return require('./dieImages/mint-chocolate/d20.png');
            case DIE_100: return require('./dieImages/mint-chocolate/d100.png');
            default : return require('./dieImages/mint-chocolate/unknown-die.png');
        }
    }
    if(selectedTheme === 'Rainbow Sherbert') {
        switch(imageID)
        {
            case DIE_FATE: return require('./dieImages/rainbow-sherbert/fate.png');
            case DIE_2: return require('./dieImages/rainbow-sherbert/d2.png');
            case DIE_3: return require('./dieImages/rainbow-sherbert/d3.png');
            case DIE_4: return require('./dieImages/rainbow-sherbert/d4.png');
            case DIE_6: return require('./dieImages/rainbow-sherbert/d6.png');
            case DIE_8: return require('./dieImages/rainbow-sherbert/d8.png');
            case DIE_10: return require('./dieImages/rainbow-sherbert/d10.png');
            case DIE_12: return require('./dieImages/rainbow-sherbert/d12.png');
            case DIE_20: return require('./dieImages/rainbow-sherbert/d20.png');
            case DIE_100: return require('./dieImages/rainbow-sherbert/d100.png');
            default : return require('./dieImages/rainbow-sherbert/unknown-die.png');
        }
    }
    if(selectedTheme === 'Superman') {
        switch(imageID)
        {
            case DIE_FATE: return require('./dieImages/superman/fate.png');
            case DIE_2: return require('./dieImages/superman/d2.png');
            case DIE_3: return require('./dieImages/superman/d3.png');
            case DIE_4: return require('./dieImages/superman/d4.png');
            case DIE_6: return require('./dieImages/superman/d6.png');
            case DIE_8: return require('./dieImages/superman/d8.png');
            case DIE_10: return require('./dieImages/superman/d10.png');
            case DIE_12: return require('./dieImages/superman/d12.png');
            case DIE_20: return require('./dieImages/superman/d20.png');
            case DIE_100: return require('./dieImages/superman/d100.png');
            default : return require('./dieImages/superman/unknown-die.png');
        }
    }

    // Default Case
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
}