import type { RichText, TextWithRichTextSupport } from "../interfaces";

const renderRichText = (prop: TextWithRichTextSupport) => {
    const constructStringFromRichText = (val: RichText[]): string => {
        return val.reduce((acc, { classList, text }) => {
            const prepend = classList ? `<span class="${classList.join(' ')}">` : '';
            const postpend = classList ? `</span>` : '';
            return [acc, prepend, text, postpend].join(" ")
        }, '');
    }
    
    return Array.isArray(prop)
    ? constructStringFromRichText(prop)
    : prop;
}

export default renderRichText;