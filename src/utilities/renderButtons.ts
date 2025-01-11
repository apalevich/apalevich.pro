const renderButtons = (buttons) => buttons.map(({ text, primary, url }) => {
    const buttonClass = primary ? 'button-primary' : 'button-secondary';
    const classList = ['button', buttonClass].join(' ');
    return `<a class="${classList}" href="${url}">${text}</a>`;
}).join('')

export default renderButtons;