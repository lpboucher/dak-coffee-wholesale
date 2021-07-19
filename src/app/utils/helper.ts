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
    const values = objects.reduce((prev: any[], curr) => prev.concat(curr[key]), [])
    const uniqueValues = new Set(values);
    return [...uniqueValues];
}
