export function camelify(text: string): string {
    const words = text.trim().split(/\s+/);
    if (words.length === 0) return '';
    words[0] = words[0].toLowerCase();
    return words.join('');
}

export function deCamelify(text: string): string {
    const words = text.trim().split(/(?=[A-Z])/);
    if (words.length === 0) return '';
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(' ');
}