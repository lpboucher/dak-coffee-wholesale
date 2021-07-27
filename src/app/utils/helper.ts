export const simpleDeepEqual = (firstObject: { [key: string]: any }, secondObject: { [key: string]: any }) => {
    const firstKeys = Object.keys(firstObject);
    const secondKeys = Object.keys(secondObject);

    const haveSameNumberOfKeys = firstKeys.length === secondKeys.length;
    const haveSameValues = firstKeys.every((oneKey: string) => {
        return firstObject[oneKey] === secondObject[oneKey];
    });

    return haveSameNumberOfKeys && haveSameValues;
}

export function getUniqueValuesOfKey(objects: { [key: string]: any }[], key: string): any[] {
    return [...new Set(
        objects.map(item => {
            const value = item[key];
            return Array.isArray(value) ? value : [value];
        }).reduce((prev, arr) => [...prev, ...arr])
    )].filter(value => value != null);
}
