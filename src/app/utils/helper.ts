export const simpleDeepEqual = (firstObject: { [key: string]: any }, secondObject: { [key: string]: any }) => {
    const firstKeys = Object.keys(firstObject);
    const secondKeys = Object.keys(secondObject);

    const haveSameNumberOfKeys = firstKeys.length === secondKeys.length;
    const haveSameValues = firstKeys.every((oneKey: string) => {
        return firstObject[oneKey] === secondObject[oneKey];
    });

    return haveSameNumberOfKeys && haveSameValues;
};

export const getUniqueValuesOfKey = (objects: { [key: string]: any }[], key: string): any[] => {
    const allValuesAtKey: any[] = [];
    objects.forEach((oneObject) => {
        if (oneObject[key]) {
            Array.isArray(oneObject[key]) ?
                oneObject[key].map((oneArrayValue: any) => allValuesAtKey.push(oneArrayValue)) :
                allValuesAtKey.push(oneObject[key]);
        }
    });

    return [...new Set(allValuesAtKey)];
};

export const camelToSentence = (text: string) => {
    const result = text.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
};

export const sentenceToKebab = (sentence: string, toUppercase: boolean = false) => {
    const kebabRegEx = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;
    const transformedSentence = sentence.match(kebabRegEx)!.join("-");
    return toUppercase ? transformedSentence.toUpperCase() : transformedSentence.toLowerCase();
};
