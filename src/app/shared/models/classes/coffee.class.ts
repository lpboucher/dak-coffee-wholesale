import { ProductType } from "@shared/models/types/product-type.type";
import { Product } from "@shared/models/classes/product.class";
import { ProductAttribute } from "./product-attribute.class";

export class Coffee extends Product {
    productType: ProductType = "coffee";
    attributes: ProductAttribute[] = [];
    origin: string | null = null;
    tastingNotes: string | null = null;
    process: string | null = null;
    varietal: string | null = null;

    constructor(coffeeShape?: Partial<Coffee>) {
        super(coffeeShape);

        if (coffeeShape != null) {
            this.filterableAttributes = [
                { key: "origin", displayName: "Origin" },
                { key: "tastingNotes", displayName: "Tasting Notes" },
                { key: "process", displayName: "Process" },
                { key: "varietal", displayName: "Varietal" },
             ];

            this.attributes = [
                new ProductAttribute({
                    name: "weight",
                    options: [
                        { name: "250g" },
                        { name: "1kg", priceModifier: this.kgPriceAsNumber - this.priceAsNumber },
                    ]}),
                new ProductAttribute({
                    name: "roast",
                    options: [
                        { name: "Filter" },
                        { name: "Espresso" },
                        { name: "Both" },
                    ]
                })
            ];

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

    get kgPriceAsNumber(): number {
        return 4 * this.priceAsNumber * 0.9;
    }
}
