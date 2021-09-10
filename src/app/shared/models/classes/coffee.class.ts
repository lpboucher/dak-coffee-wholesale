import { ProductType } from "@shared/models/types/product-type.type";
import { Product } from "@shared/models/classes/product.class";
import { ProductAttribute } from "@shared/models/classes/product-attribute.class";

import { ROAST_OPTIONS } from "@utils/constants/form-options";

export class Coffee extends Product {
    productType: ProductType = "coffee";
    attributes: ProductAttribute[] = [];
    origin: string | null = null;
    tastingNotes: string[] = [];
    process: string | null = null;
    varietal: string[] = [];

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
                // TODO add hidden type once snipcart behaviour fixed
                new ProductAttribute({
                    name: "volume-discount",
                    options: [
                        { name: "30%", priceModifier: -(0.3 * this.priceAsNumber) },
                        { name: "45%", priceModifier: -(0.45 * this.priceAsNumber) },
                    ],
                }),
                new ProductAttribute({
                    name: "weight",
                    options: [
                        { name: "250g" },
                        { name: "1kg", priceModifier: this.kgPriceAsNumber - this.priceAsNumber },
                    ]}),
                new ProductAttribute({
                    name: "roast",
                    options: ROAST_OPTIONS.map(opt => ({name: opt})),
                })
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
        return [this.origin ?? ""];
    }

    get kgPriceAsNumber(): number {
        return 4 * this.priceAsNumber * 0.9;
    }
}
