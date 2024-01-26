export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function capitalizeWords(inputString: string) {
    return inputString.replace(/\b\w/g, (match) => match.toUpperCase());
}