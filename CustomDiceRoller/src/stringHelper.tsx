

export function getModifierText(value: number, hideZero: boolean) {

    if(hideZero && value === 0) {
        return ''
    }

    let preFix = '';
    if(value >= 0) {
        preFix = '+'
    }

    return preFix + String(value)
}