import ThemeManager from "../../sync/ThemeManager";

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
            case DIE_FATE: return require('./fire/fate.png');
            case DIE_2: return require('./fire/d2.png');
            case DIE_3: return require('./fire/d3.png');
            case DIE_4: return require('./fire/d4.png');
            case DIE_6: return require('./fire/d6.png');
            case DIE_8: return require('./fire/d8.png');
            case DIE_10: return require('./fire/d10.png');
            case DIE_12: return require('./fire/d12.png');
            case DIE_20: return require('./fire/d20.png');
            case DIE_100: return require('./fire/d100.png');
            default : return require('./fire/unknown-die.png');
        }
    }
    if(selectedTheme === 'Forest') {
        switch(imageID)
        {
            case DIE_FATE: return require('./forest/fate.png');
            case DIE_2: return require('./forest/d2.png');
            case DIE_3: return require('./forest/d3.png');
            case DIE_4: return require('./forest/d4.png');
            case DIE_6: return require('./forest/d6.png');
            case DIE_8: return require('./forest/d8.png');
            case DIE_10: return require('./forest/d10.png');
            case DIE_12: return require('./forest/d12.png');
            case DIE_20: return require('./forest/d20.png');
            case DIE_100: return require('./forest/d100.png');
            default : return require('./forest/unknown-die.png');
        }
    }
    if(selectedTheme === 'Beach') {
        switch(imageID)
        {
            case DIE_FATE: return require('./beach/fate.png');
            case DIE_2: return require('./beach/d2.png');
            case DIE_3: return require('./beach/d3.png');
            case DIE_4: return require('./beach/d4.png');
            case DIE_6: return require('./beach/d6.png');
            case DIE_8: return require('./beach/d8.png');
            case DIE_10: return require('./beach/d10.png');
            case DIE_12: return require('./beach/d12.png');
            case DIE_20: return require('./beach/d20.png');
            case DIE_100: return require('./beach/d100.png');
            default : return require('./beach/unknown-die.png');
        }
    }
    if(selectedTheme === 'RGB') {
        switch(imageID)
        {
            case DIE_FATE: return require('./rgb/fate.png');
            case DIE_2: return require('./rgb/d2.png');
            case DIE_3: return require('./rgb/d3.png');
            case DIE_4: return require('./rgb/d4.png');
            case DIE_6: return require('./rgb/d6.png');
            case DIE_8: return require('./rgb/d8.png');
            case DIE_10: return require('./rgb/d10.png');
            case DIE_12: return require('./rgb/d12.png');
            case DIE_20: return require('./rgb/d20.png');
            case DIE_100: return require('./rgb/d100.png');
            default : return require('./rgb/unknown-die.png');
        }
    }
    if(selectedTheme === 'Rainbow') {
        switch(imageID)
        {
            case DIE_FATE: return require('./rainbow/fate.png');
            case DIE_2: return require('./rainbow/d2.png');
            case DIE_3: return require('./rainbow/d3.png');
            case DIE_4: return require('./rainbow/d4.png');
            case DIE_6: return require('./rainbow/d6.png');
            case DIE_8: return require('./rainbow/d8.png');
            case DIE_10: return require('./rainbow/d10.png');
            case DIE_12: return require('./rainbow/d12.png');
            case DIE_20: return require('./rainbow/d20.png');
            case DIE_100: return require('./rainbow/d100.png');
            default : return require('./rainbow/unknown-die.png');
        }
    }

    // Metallic Themes
    if(selectedTheme === 'Steel') {
        switch(imageID)
        {
            case DIE_FATE: return require('./steel/fate.png');
            case DIE_2: return require('./steel/d2.png');
            case DIE_3: return require('./steel/d3.png');
            case DIE_4: return require('./steel/d4.png');
            case DIE_6: return require('./steel/d6.png');
            case DIE_8: return require('./steel/d8.png');
            case DIE_10: return require('./steel/d10.png');
            case DIE_12: return require('./steel/d12.png');
            case DIE_20: return require('./steel/d20.png');
            case DIE_100: return require('./steel/d100.png');
            default : return require('./steel/unknown-die.png');
        }
    }
    if(selectedTheme === 'Gold') {
        switch(imageID)
        {
            case DIE_FATE: return require('./gold/fate.png');
            case DIE_2: return require('./gold/d2.png');
            case DIE_3: return require('./gold/d3.png');
            case DIE_4: return require('./gold/d4.png');
            case DIE_6: return require('./gold/d6.png');
            case DIE_8: return require('./gold/d8.png');
            case DIE_10: return require('./gold/d10.png');
            case DIE_12: return require('./gold/d12.png');
            case DIE_20: return require('./gold/d20.png');
            case DIE_100: return require('./gold/d100.png');
            default : return require('./gold/unknown-die.png');
        }
    }

    // Ice Cream Themes
    if(selectedTheme === 'Creamsicle') {
        switch(imageID)
        {
            case DIE_FATE: return require('./creamsicle/fate.png');
            case DIE_2: return require('./creamsicle/d2.png');
            case DIE_3: return require('./creamsicle/d3.png');
            case DIE_4: return require('./creamsicle/d4.png');
            case DIE_6: return require('./creamsicle/d6.png');
            case DIE_8: return require('./creamsicle/d8.png');
            case DIE_10: return require('./creamsicle/d10.png');
            case DIE_12: return require('./creamsicle/d12.png');
            case DIE_20: return require('./creamsicle/d20.png');
            case DIE_100: return require('./creamsicle/d100.png');
            default : return require('./creamsicle/unknown-die.png');
        }
    }
    if(selectedTheme === 'Mint Chocolate') {
        switch(imageID)
        {
            case DIE_FATE: return require('./mint-chocolate/fate.png');
            case DIE_2: return require('./mint-chocolate/d2.png');
            case DIE_3: return require('./mint-chocolate/d3.png');
            case DIE_4: return require('./mint-chocolate/d4.png');
            case DIE_6: return require('./mint-chocolate/d6.png');
            case DIE_8: return require('./mint-chocolate/d8.png');
            case DIE_10: return require('./mint-chocolate/d10.png');
            case DIE_12: return require('./mint-chocolate/d12.png');
            case DIE_20: return require('./mint-chocolate/d20.png');
            case DIE_100: return require('./mint-chocolate/d100.png');
            default : return require('./mint-chocolate/unknown-die.png');
        }
    }
    if(selectedTheme === 'Rainbow Sherbert') {
        switch(imageID)
        {
            case DIE_FATE: return require('./rainbow-sherbert/fate.png');
            case DIE_2: return require('./rainbow-sherbert/d2.png');
            case DIE_3: return require('./rainbow-sherbert/d3.png');
            case DIE_4: return require('./rainbow-sherbert/d4.png');
            case DIE_6: return require('./rainbow-sherbert/d6.png');
            case DIE_8: return require('./rainbow-sherbert/d8.png');
            case DIE_10: return require('./rainbow-sherbert/d10.png');
            case DIE_12: return require('./rainbow-sherbert/d12.png');
            case DIE_20: return require('./rainbow-sherbert/d20.png');
            case DIE_100: return require('./rainbow-sherbert/d100.png');
            default : return require('./rainbow-sherbert/unknown-die.png');
        }
    }
    if(selectedTheme === 'Superman') {
        switch(imageID)
        {
            case DIE_FATE: return require('./superman/fate.png');
            case DIE_2: return require('./superman/d2.png');
            case DIE_3: return require('./superman/d3.png');
            case DIE_4: return require('./superman/d4.png');
            case DIE_6: return require('./superman/d6.png');
            case DIE_8: return require('./superman/d8.png');
            case DIE_10: return require('./superman/d10.png');
            case DIE_12: return require('./superman/d12.png');
            case DIE_20: return require('./superman/d20.png');
            case DIE_100: return require('./superman/d100.png');
            default : return require('./superman/unknown-die.png');
        }
    }

    // Default Case
    switch(imageID)
    {
        case DIE_FATE: return require('./white/fate.png');
        case DIE_2: return require('./white/d2.png');
        case DIE_3: return require('./white/d6-up-3.png');
        case DIE_4: return require('./white/d4.png');
        case DIE_6: return require('./white/d6-up-6.png');
        case DIE_8: return require('./white/d8.png');
        case DIE_10: return require('./white/d10.png');
        case DIE_12: return require('./white/d12.png');
        case DIE_20: return require('./white/d20.png');
        case DIE_100: return require('./white/d100.png');
        default : return require('./white/unknown-die.png');
    }
}