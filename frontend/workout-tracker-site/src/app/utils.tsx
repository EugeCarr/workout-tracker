
export const getStylesConstants = (divStyles: (HTMLBodyElement)): {} => {
    let cs = getComputedStyle(divStyles);
    const styles = {
        backroundColor: cs.getPropertyValue("--background-color"),
        cardBackgroundColor: cs.getPropertyValue("--card-background-color"),
        linkHoverColor: cs.getPropertyValue("--link-hover-color"),
        accentColor: cs.getPropertyValue("--accent-colour"),
        textColor: cs.getPropertyValue("--text-colour"),
        defaultSmallTextSize: cs.getPropertyValue("--default-small-text-size"),
        defatylMediumTextSize: cs.getPropertyValue("--default-medium-text-size"),
    }
    return styles
}

export const getTokenExpiryTime = (): Date => {
    return new Date(Date.now() + 5 * 60000)
}