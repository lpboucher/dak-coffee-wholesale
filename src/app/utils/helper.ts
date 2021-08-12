export const simpleDeepEqual = (firstObject: { [key: string]: any }, secondObject: { [key: string]: any }) => {
    const firstKeys = Object.keys(firstObject);
    const secondKeys = Object.keys(secondObject);

    const haveSameNumberOfKeys = firstKeys.length === secondKeys.length;
    const haveSameValues = firstKeys.every((oneKey: string) => {
        return firstObject[oneKey] === secondObject[oneKey];
    });

    return haveSameNumberOfKeys && haveSameValues;
}

export const sentenceToKebab = (sentence: string) => {
    return sentence.toLowerCase().replace(" ", "-");
}
