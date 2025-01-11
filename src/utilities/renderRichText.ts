import type { RichText } from "../interfaces";

const renderRichText = (prop: string|RichText[]) => {
    const constructStringFromRichText = (val: RichText[]): string => {
        return val.reduce((acc, { classList, text }) => {
            const prepend = classList ? `<span class="${classList.join(' ')}">` : '';
            const postpend = classList ? `</span>` : '';
            return [acc, prepend, text, postpend].join(" ")
        }, ''); // Initialize the accumulator as an empty string
    }
    
    return Array.isArray(prop)
    ? constructStringFromRichText(prop)
    : prop;
}

export default renderRichText;