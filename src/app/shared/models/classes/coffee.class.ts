import { ProductType } from "../types/product-type.type";
import { Product } from "./product.class";

export class Coffee extends Product {
    productType: ProductType = "coffee";
    origin: string | null = null;
    tastingNotes: string[] | null = null;
    process: string | null = null;
    varietal: string[] | null = null;

    constructor(coffeeShape?: Partial<Coffee>) {
        super(coffeeShape);

        if (coffeeShape != null) {
            this.filterableAttributes = [
                ...this.filterableAttributes,
                { key: "origin", displayName: "Origin" },
                { key: "tastingNotes", displayName: "Tasting Notes" },
                { key: "process", displayName: "Process" },
                { key: "varietal", displayName: "Varietal" },
            ];

            if (coffeeShape.origin != null) {
                this.origin = coffeeShape.origin;
            }

            if (coffeeShape.tastingNotes != null) {
                this.tastingNotes = (coffeeShape.tastingNotes as any as string).split(", ");
            }

            if (coffeeShape.process != null) {
                this.process = coffeeShape.process;
            }

            if (coffeeShape.varietal != null) {
                this.varietal = (coffeeShape.varietal as any as string).split(", ");
            }
        }
    }

    get displayedDescription(): string[] {
        return [this.process ?? "", this.varietal?.join(", ") ?? ""];
    }

    get displayedDetails(): string[] {
        return [this.origin ?? "", this.tastingNotes?.join(", ") ?? ""];
    }
}
