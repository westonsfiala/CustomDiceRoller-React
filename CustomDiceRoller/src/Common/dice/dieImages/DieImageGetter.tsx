import ThemeManager from "../../../SettingsPage/Dice/ThemeManager";

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
            case DIE_FATE: return require('./basic/fire/fate.png');
            case DIE_2: return require('./basic/fire/d2.png');
            case DIE_3: return require('./basic/fire/d3.png');
            case DIE_4: return require('./basic/fire/d4.png');
            case DIE_6: return require('./basic/fire/d6.png');
            case DIE_8: return require('./basic/fire/d8.png');
            case DIE_10: return require('./basic/fire/d10.png');
            case DIE_12: return require('./basic/fire/d12.png');
            case DIE_20: return require('./basic/fire/d20.png');
            case DIE_100: return require('./basic/fire/d100.png');
            default : return require('./basic/fire/unknown-die.png');
        }
    }
    if(selectedTheme === 'Forest') {
        switch(imageID)
        {
            case DIE_FATE: return require('./basic/forest/fate.png');
            case DIE_2: return require('./basic/forest/d2.png');
            case DIE_3: return require('./basic/forest/d3.png');
            case DIE_4: return require('./basic/forest/d4.png');
            case DIE_6: return require('./basic/forest/d6.png');
            case DIE_8: return require('./basic/forest/d8.png');
            case DIE_10: return require('./basic/forest/d10.png');
            case DIE_12: return require('./basic/forest/d12.png');
            case DIE_20: return require('./basic/forest/d20.png');
            case DIE_100: return require('./basic/forest/d100.png');
            default : return require('./basic/forest/unknown-die.png');
        }
    }
    if(selectedTheme === 'Beach') {
        switch(imageID)
        {
            case DIE_FATE: return require('./basic/beach/fate.png');
            case DIE_2: return require('./basic/beach/d2.png');
            case DIE_3: return require('./basic/beach/d3.png');
            case DIE_4: return require('./basic/beach/d4.png');
            case DIE_6: return require('./basic/beach/d6.png');
            case DIE_8: return require('./basic/beach/d8.png');
            case DIE_10: return require('./basic/beach/d10.png');
            case DIE_12: return require('./basic/beach/d12.png');
            case DIE_20: return require('./basic/beach/d20.png');
            case DIE_100: return require('./basic/beach/d100.png');
            default : return require('./basic/beach/unknown-die.png');
        }
    }
    if(selectedTheme === 'RGB') {
        switch(imageID)
        {
            case DIE_FATE: return require('./basic/rgb/fate.png');
            case DIE_2: return require('./basic/rgb/d2.png');
            case DIE_3: return require('./basic/rgb/d3.png');
            case DIE_4: return require('./basic/rgb/d4.png');
            case DIE_6: return require('./basic/rgb/d6.png');
            case DIE_8: return require('./basic/rgb/d8.png');
            case DIE_10: return require('./basic/rgb/d10.png');
            case DIE_12: return require('./basic/rgb/d12.png');
            case DIE_20: return require('./basic/rgb/d20.png');
            case DIE_100: return require('./basic/rgb/d100.png');
            default : return require('./basic/rgb/unknown-die.png');
        }
    }
    if(selectedTheme === 'Rainbow') {
        switch(imageID)
        {
            case DIE_FATE: return require('./basic/rainbow/fate.png');
            case DIE_2: return require('./basic/rainbow/d2.png');
            case DIE_3: return require('./basic/rainbow/d3.png');
            case DIE_4: return require('./basic/rainbow/d4.png');
            case DIE_6: return require('./basic/rainbow/d6.png');
            case DIE_8: return require('./basic/rainbow/d8.png');
            case DIE_10: return require('./basic/rainbow/d10.png');
            case DIE_12: return require('./basic/rainbow/d12.png');
            case DIE_20: return require('./basic/rainbow/d20.png');
            case DIE_100: return require('./basic/rainbow/d100.png');
            default : return require('./basic/rainbow/unknown-die.png');
        }
    }

    // Metallic Themes
    if(selectedTheme === 'Steel') {
        switch(imageID)
        {
            case DIE_FATE: return require('./metal/steel/fate.png');
            case DIE_2: return require('./metal/steel/d2.png');
            case DIE_3: return require('./metal/steel/d3.png');
            case DIE_4: return require('./metal/steel/d4.png');
            case DIE_6: return require('./metal/steel/d6.png');
            case DIE_8: return require('./metal/steel/d8.png');
            case DIE_10: return require('./metal/steel/d10.png');
            case DIE_12: return require('./metal/steel/d12.png');
            case DIE_20: return require('./metal/steel/d20.png');
            case DIE_100: return require('./metal/steel/d100.png');
            default : return require('./metal/steel/unknown-die.png');
        }
    }
    if(selectedTheme === 'Gold') {
        switch(imageID)
        {
            case DIE_FATE: return require('./metal/gold/fate.png');
            case DIE_2: return require('./metal/gold/d2.png');
            case DIE_3: return require('./metal/gold/d3.png');
            case DIE_4: return require('./metal/gold/d4.png');
            case DIE_6: return require('./metal/gold/d6.png');
            case DIE_8: return require('./metal/gold/d8.png');
            case DIE_10: return require('./metal/gold/d10.png');
            case DIE_12: return require('./metal/gold/d12.png');
            case DIE_20: return require('./metal/gold/d20.png');
            case DIE_100: return require('./metal/gold/d100.png');
            default : return require('./metal/gold/unknown-die.png');
        }
    }

    // Ice Cream Themes
    if(selectedTheme === 'Creamsicle') {
        switch(imageID)
        {
            case DIE_FATE: return require('./ice-cream/creamsicle/fate.png');
            case DIE_2: return require('./ice-cream/creamsicle/d2.png');
            case DIE_3: return require('./ice-cream/creamsicle/d3.png');
            case DIE_4: return require('./ice-cream/creamsicle/d4.png');
            case DIE_6: return require('./ice-cream/creamsicle/d6.png');
            case DIE_8: return require('./ice-cream/creamsicle/d8.png');
            case DIE_10: return require('./ice-cream/creamsicle/d10.png');
            case DIE_12: return require('./ice-cream/creamsicle/d12.png');
            case DIE_20: return require('./ice-cream/creamsicle/d20.png');
            case DIE_100: return require('./ice-cream/creamsicle/d100.png');
            default : return require('./ice-cream/creamsicle/unknown-die.png');
        }
    }
    if(selectedTheme === 'Mint Chocolate') {
        switch(imageID)
        {
            case DIE_FATE: return require('./ice-cream/mint-chocolate/fate.png');
            case DIE_2: return require('./ice-cream/mint-chocolate/d2.png');
            case DIE_3: return require('./ice-cream/mint-chocolate/d3.png');
            case DIE_4: return require('./ice-cream/mint-chocolate/d4.png');
            case DIE_6: return require('./ice-cream/mint-chocolate/d6.png');
            case DIE_8: return require('./ice-cream/mint-chocolate/d8.png');
            case DIE_10: return require('./ice-cream/mint-chocolate/d10.png');
            case DIE_12: return require('./ice-cream/mint-chocolate/d12.png');
            case DIE_20: return require('./ice-cream/mint-chocolate/d20.png');
            case DIE_100: return require('./ice-cream/mint-chocolate/d100.png');
            default : return require('./ice-cream/mint-chocolate/unknown-die.png');
        }
    }
    if(selectedTheme === 'Rainbow Sherbert') {
        switch(imageID)
        {
            case DIE_FATE: return require('./ice-cream/sherbert/fate.png');
            case DIE_2: return require('./ice-cream/sherbert/d2.png');
            case DIE_3: return require('./ice-cream/sherbert/d3.png');
            case DIE_4: return require('./ice-cream/sherbert/d4.png');
            case DIE_6: return require('./ice-cream/sherbert/d6.png');
            case DIE_8: return require('./ice-cream/sherbert/d8.png');
            case DIE_10: return require('./ice-cream/sherbert/d10.png');
            case DIE_12: return require('./ice-cream/sherbert/d12.png');
            case DIE_20: return require('./ice-cream/sherbert/d20.png');
            case DIE_100: return require('./ice-cream/sherbert/d100.png');
            default : return require('./ice-cream/sherbert/unknown-die.png');
        }
    }
    if(selectedTheme === 'Superman') {
        switch(imageID)
        {
            case DIE_FATE: return require('./ice-cream/superman/fate.png');
            case DIE_2: return require('./ice-cream/superman/d2.png');
            case DIE_3: return require('./ice-cream/superman/d3.png');
            case DIE_4: return require('./ice-cream/superman/d4.png');
            case DIE_6: return require('./ice-cream/superman/d6.png');
            case DIE_8: return require('./ice-cream/superman/d8.png');
            case DIE_10: return require('./ice-cream/superman/d10.png');
            case DIE_12: return require('./ice-cream/superman/d12.png');
            case DIE_20: return require('./ice-cream/superman/d20.png');
            case DIE_100: return require('./ice-cream/superman/d100.png');
            default : return require('./ice-cream/superman/unknown-die.png');
        }
    }

    // Pride Themes
    if(selectedTheme === 'Agender') {
        switch(imageID)
        {
            case DIE_FATE: return require('./pride/agender/fate.png');
            case DIE_2: return require('./pride/agender/d2.png');
            case DIE_3: return require('./pride/agender/d3.png');
            case DIE_4: return require('./pride/agender/d4.png');
            case DIE_6: return require('./pride/agender/d6.png');
            case DIE_8: return require('./pride/agender/d8.png');
            case DIE_10: return require('./pride/agender/d10.png');
            case DIE_12: return require('./pride/agender/d12.png');
            case DIE_20: return require('./pride/agender/d20.png');
            case DIE_100: return require('./pride/agender/d100.png');
            default : return require('./pride/agender/unknown-die.png');
        }
    }
    if(selectedTheme === 'Aromantic') {
        switch(imageID)
        {
            case DIE_FATE: return require('./pride/aromantic/fate.png');
            case DIE_2: return require('./pride/aromantic/d2.png');
            case DIE_3: return require('./pride/aromantic/d3.png');
            case DIE_4: return require('./pride/aromantic/d4.png');
            case DIE_6: return require('./pride/aromantic/d6.png');
            case DIE_8: return require('./pride/aromantic/d8.png');
            case DIE_10: return require('./pride/aromantic/d10.png');
            case DIE_12: return require('./pride/aromantic/d12.png');
            case DIE_20: return require('./pride/aromantic/d20.png');
            case DIE_100: return require('./pride/aromantic/d100.png');
            default : return require('./pride/aromantic/unknown-die.png');
        }
    }
    if(selectedTheme === 'Asexual') {
        switch(imageID)
        {
            case DIE_FATE: return require('./pride/asexual/fate.png');
            case DIE_2: return require('./pride/asexual/d2.png');
            case DIE_3: return require('./pride/asexual/d3.png');
            case DIE_4: return require('./pride/asexual/d4.png');
            case DIE_6: return require('./pride/asexual/d6.png');
            case DIE_8: return require('./pride/asexual/d8.png');
            case DIE_10: return require('./pride/asexual/d10.png');
            case DIE_12: return require('./pride/asexual/d12.png');
            case DIE_20: return require('./pride/asexual/d20.png');
            case DIE_100: return require('./pride/asexual/d100.png');
            default : return require('./pride/asexual/unknown-die.png');
        }
    }
    if(selectedTheme === 'Bisexual') {
        switch(imageID)
        {
            case DIE_FATE: return require('./pride/bisexual/fate.png');
            case DIE_2: return require('./pride/bisexual/d2.png');
            case DIE_3: return require('./pride/bisexual/d3.png');
            case DIE_4: return require('./pride/bisexual/d4.png');
            case DIE_6: return require('./pride/bisexual/d6.png');
            case DIE_8: return require('./pride/bisexual/d8.png');
            case DIE_10: return require('./pride/bisexual/d10.png');
            case DIE_12: return require('./pride/bisexual/d12.png');
            case DIE_20: return require('./pride/bisexual/d20.png');
            case DIE_100: return require('./pride/bisexual/d100.png');
            default : return require('./pride/bisexual/unknown-die.png');
        }
    }
    if(selectedTheme === 'Community Lesbian') {
        switch(imageID)
        {
            case DIE_FATE: return require('./pride/community-lesbian/fate.png');
            case DIE_2: return require('./pride/community-lesbian/d2.png');
            case DIE_3: return require('./pride/community-lesbian/d3.png');
            case DIE_4: return require('./pride/community-lesbian/d4.png');
            case DIE_6: return require('./pride/community-lesbian/d6.png');
            case DIE_8: return require('./pride/community-lesbian/d8.png');
            case DIE_10: return require('./pride/community-lesbian/d10.png');
            case DIE_12: return require('./pride/community-lesbian/d12.png');
            case DIE_20: return require('./pride/community-lesbian/d20.png');
            case DIE_100: return require('./pride/community-lesbian/d100.png');
            default : return require('./pride/community-lesbian/unknown-die.png');
        }
    }
    if(selectedTheme === 'Genderfluid') {
        switch(imageID)
        {
            case DIE_FATE: return require('./pride/genderfluid/fate.png');
            case DIE_2: return require('./pride/genderfluid/d2.png');
            case DIE_3: return require('./pride/genderfluid/d3.png');
            case DIE_4: return require('./pride/genderfluid/d4.png');
            case DIE_6: return require('./pride/genderfluid/d6.png');
            case DIE_8: return require('./pride/genderfluid/d8.png');
            case DIE_10: return require('./pride/genderfluid/d10.png');
            case DIE_12: return require('./pride/genderfluid/d12.png');
            case DIE_20: return require('./pride/genderfluid/d20.png');
            case DIE_100: return require('./pride/genderfluid/d100.png');
            default : return require('./pride/genderfluid/unknown-die.png');
        }
    }
    if(selectedTheme === 'Genderqueer') {
        switch(imageID)
        {
            case DIE_FATE: return require('./pride/genderqueer/fate.png');
            case DIE_2: return require('./pride/genderqueer/d2.png');
            case DIE_3: return require('./pride/genderqueer/d3.png');
            case DIE_4: return require('./pride/genderqueer/d4.png');
            case DIE_6: return require('./pride/genderqueer/d6.png');
            case DIE_8: return require('./pride/genderqueer/d8.png');
            case DIE_10: return require('./pride/genderqueer/d10.png');
            case DIE_12: return require('./pride/genderqueer/d12.png');
            case DIE_20: return require('./pride/genderqueer/d20.png');
            case DIE_100: return require('./pride/genderqueer/d100.png');
            default : return require('./pride/genderqueer/unknown-die.png');
        }
    }
    if(selectedTheme === 'Intersex') {
        switch(imageID)
        {
            case DIE_FATE: return require('./pride/intersex/fate.png');
            case DIE_2: return require('./pride/intersex/d2.png');
            case DIE_3: return require('./pride/intersex/d3.png');
            case DIE_4: return require('./pride/intersex/d4.png');
            case DIE_6: return require('./pride/intersex/d6.png');
            case DIE_8: return require('./pride/intersex/d8.png');
            case DIE_10: return require('./pride/intersex/d10.png');
            case DIE_12: return require('./pride/intersex/d12.png');
            case DIE_20: return require('./pride/intersex/d20.png');
            case DIE_100: return require('./pride/intersex/d100.png');
            default : return require('./pride/intersex/unknown-die.png');
        }
    }
    if(selectedTheme === 'LGBT') {
        switch(imageID)
        {
            case DIE_FATE: return require('./pride/lgbt/fate.png');
            case DIE_2: return require('./pride/lgbt/d2.png');
            case DIE_3: return require('./pride/lgbt/d3.png');
            case DIE_4: return require('./pride/lgbt/d4.png');
            case DIE_6: return require('./pride/lgbt/d6.png');
            case DIE_8: return require('./pride/lgbt/d8.png');
            case DIE_10: return require('./pride/lgbt/d10.png');
            case DIE_12: return require('./pride/lgbt/d12.png');
            case DIE_20: return require('./pride/lgbt/d20.png');
            case DIE_100: return require('./pride/lgbt/d100.png');
            default : return require('./pride/lgbt/unknown-die.png');
        }
    }
    if(selectedTheme === 'Lipstick Lesbian') {
        switch(imageID)
        {
            case DIE_FATE: return require('./pride/lipstick-lesbian/fate.png');
            case DIE_2: return require('./pride/lipstick-lesbian/d2.png');
            case DIE_3: return require('./pride/lipstick-lesbian/d3.png');
            case DIE_4: return require('./pride/lipstick-lesbian/d4.png');
            case DIE_6: return require('./pride/lipstick-lesbian/d6.png');
            case DIE_8: return require('./pride/lipstick-lesbian/d8.png');
            case DIE_10: return require('./pride/lipstick-lesbian/d10.png');
            case DIE_12: return require('./pride/lipstick-lesbian/d12.png');
            case DIE_20: return require('./pride/lipstick-lesbian/d20.png');
            case DIE_100: return require('./pride/lipstick-lesbian/d100.png');
            default : return require('./pride/lipstick-lesbian/unknown-die.png');
        }
    }
    if(selectedTheme === 'Non-Binary') {
        switch(imageID)
        {
            case DIE_FATE: return require('./pride/non-binary/fate.png');
            case DIE_2: return require('./pride/non-binary/d2.png');
            case DIE_3: return require('./pride/non-binary/d3.png');
            case DIE_4: return require('./pride/non-binary/d4.png');
            case DIE_6: return require('./pride/non-binary/d6.png');
            case DIE_8: return require('./pride/non-binary/d8.png');
            case DIE_10: return require('./pride/non-binary/d10.png');
            case DIE_12: return require('./pride/non-binary/d12.png');
            case DIE_20: return require('./pride/non-binary/d20.png');
            case DIE_100: return require('./pride/non-binary/d100.png');
            default : return require('./pride/non-binary/unknown-die.png');
        }
    }
    if(selectedTheme === 'Pansexual') {
        switch(imageID)
        {
            case DIE_FATE: return require('./pride/pansexual/fate.png');
            case DIE_2: return require('./pride/pansexual/d2.png');
            case DIE_3: return require('./pride/pansexual/d3.png');
            case DIE_4: return require('./pride/pansexual/d4.png');
            case DIE_6: return require('./pride/pansexual/d6.png');
            case DIE_8: return require('./pride/pansexual/d8.png');
            case DIE_10: return require('./pride/pansexual/d10.png');
            case DIE_12: return require('./pride/pansexual/d12.png');
            case DIE_20: return require('./pride/pansexual/d20.png');
            case DIE_100: return require('./pride/pansexual/d100.png');
            default : return require('./pride/pansexual/unknown-die.png');
        }
    }
    if(selectedTheme === 'Polysexual') {
        switch(imageID)
        {
            case DIE_FATE: return require('./pride/polysexual/fate.png');
            case DIE_2: return require('./pride/polysexual/d2.png');
            case DIE_3: return require('./pride/polysexual/d3.png');
            case DIE_4: return require('./pride/polysexual/d4.png');
            case DIE_6: return require('./pride/polysexual/d6.png');
            case DIE_8: return require('./pride/polysexual/d8.png');
            case DIE_10: return require('./pride/polysexual/d10.png');
            case DIE_12: return require('./pride/polysexual/d12.png');
            case DIE_20: return require('./pride/polysexual/d20.png');
            case DIE_100: return require('./pride/polysexual/d100.png');
            default : return require('./pride/polysexual/unknown-die.png');
        }
    }
    if(selectedTheme === 'Transgender') {
        switch(imageID)
        {
            case DIE_FATE: return require('./pride/transgender/fate.png');
            case DIE_2: return require('./pride/transgender/d2.png');
            case DIE_3: return require('./pride/transgender/d3.png');
            case DIE_4: return require('./pride/transgender/d4.png');
            case DIE_6: return require('./pride/transgender/d6.png');
            case DIE_8: return require('./pride/transgender/d8.png');
            case DIE_10: return require('./pride/transgender/d10.png');
            case DIE_12: return require('./pride/transgender/d12.png');
            case DIE_20: return require('./pride/transgender/d20.png');
            case DIE_100: return require('./pride/transgender/d100.png');
            default : return require('./pride/transgender/unknown-die.png');
        }
    }

    // Default Case
    switch(imageID)
    {
        case DIE_FATE: return require('./basic/white/fate.png');
        case DIE_2: return require('./basic/white/d2.png');
        case DIE_3: return require('./basic/white/d3.png');
        case DIE_4: return require('./basic/white/d4.png');
        case DIE_6: return require('./basic/white/d6.png');
        case DIE_8: return require('./basic/white/d8.png');
        case DIE_10: return require('./basic/white/d10.png');
        case DIE_12: return require('./basic/white/d12.png');
        case DIE_20: return require('./basic/white/d20.png');
        case DIE_100: return require('./basic/white/d100.png');
        default : return require('./basic/white/unknown-die.png');
    }
}

export function getRequiredImageWhite(imageID : number) {

    // Default Case
    switch(imageID)
    {
        case DIE_FATE: return require('./basic/white/fate.png');
        case DIE_2: return require('./basic/white/d2.png');
        case DIE_3: return require('./basic/white/d3.png');
        case DIE_4: return require('./basic/white/d4.png');
        case DIE_6: return require('./basic/white/d6.png');
        case DIE_8: return require('./basic/white/d8.png');
        case DIE_10: return require('./basic/white/d10.png');
        case DIE_12: return require('./basic/white/d12.png');
        case DIE_20: return require('./basic/white/d20.png');
        case DIE_100: return require('./basic/white/d100.png');
        default : return require('./basic/white/unknown-die.png');
    }
}