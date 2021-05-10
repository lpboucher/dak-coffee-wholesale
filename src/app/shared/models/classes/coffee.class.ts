import { Product } from "./product.class"

export class Coffee extends Product {
    origin: string;
    tastingNotes: string;
    process: string;
    varietal: string;

    constructor(
        id: number,
        name: string,
        price: string,
        description: string,

        origin: string,
        tastingNotes: string,
        process: string,
        varietal: string,
    ) {
        super(id, name, price, description);

        this.origin = origin;
        this.tastingNotes = tastingNotes;
        this.process = process;
        this.varietal = varietal;
    }

    get displayedDescription() {
        return [this.process, this.varietal];
    }

    get displayedDetails(): string[] {
        return [this.origin, this.tastingNotes];
    }
}
