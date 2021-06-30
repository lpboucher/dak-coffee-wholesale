export class CustomOption {
    name: string;
    list: string[];
    selection: string;

    constructor(name: string, list: string[], selection: string) {
        this.name = name;
        this.list = list;
        this.selection = selection;
    }
}
