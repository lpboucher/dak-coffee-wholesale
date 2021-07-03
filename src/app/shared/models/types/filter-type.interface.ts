export interface Filter {
    displayName: string;
    key: string;
    subOptions: string[];
}

export interface FilterType {
    [key: string]: Filter;
}
