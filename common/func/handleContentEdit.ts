export const pasteAsPlainText = (event: any) => {
    event.preventDefault();

    const text = event.clipboardData.getData('text/plain');
    document.execCommand('insertHTML', false, text);
};

export const trimSpaces = (string: string) => {
    return string
        .replace(/&nbsp;/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<');
};

export const disableNewlines = (event: any) => {
    const keyCode = event.keyCode || event.which;
    keyCode === 13 && event.preventDefault();
};
