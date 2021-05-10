export abstract class Product {
    id: number;
    name: string;
    price: string;
    description: string;

    constructor(
        id: number,
        name: string,
        price: string,
        description: string,
    ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
    }

    get displayedDescription(): string[] {
        return [this.description];
    }

    get displayedDetails(): string[] {
        return [this.description];
    }
}
