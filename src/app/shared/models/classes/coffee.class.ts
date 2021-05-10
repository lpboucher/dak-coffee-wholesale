import { Product } from "./product.class";

export class Coffee extends Product {
    origin: string | null = null;
    tastingNotes: string | null = null;
    process: string | null = null;
    varietal: string | null = null;

    constructor(coffeeShape?: Partial<Coffee>) {
        super(coffeeShape);

        if (coffeeShape != null) {
            if (coffeeShape.origin != null) {
                this.origin = coffeeShape.origin;
            }

            if (coffeeShape.tastingNotes != null) {
                this.tastingNotes = coffeeShape.tastingNotes;
            }

            if (coffeeShape.process != null) {
                this.process = coffeeShape.process;
            }

            if (coffeeShape.varietal != null) {
                this.varietal = coffeeShape.varietal;
            }
        }
    }

    get displayedDescription(): string[] {
        return [this.process ?? "", this.varietal ?? ""];
    }

    get displayedDetails(): string[] {
        return [this.origin ?? "", this.tastingNotes ?? ""];
    }
}
