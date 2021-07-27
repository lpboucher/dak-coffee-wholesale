import { ProductType } from "@shared/models/types/product-type.type";
import { Product } from "@shared/models/classes/product.class";
import { ProductAttribute } from "./product-attribute.class";

export class Coffee extends Product {
    productType: ProductType = "coffee";
    attributes: ProductAttribute[] = [];
    origin: string | null = null;
    tastingNotes: string[] | null = null;
    process: string | null = null;
    varietal: string[] | null = null;

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
                        { optionName: "250g", priceModifier: 0 },
                        { optionName: "1kg", priceModifier: this.kgPriceAsNumber - this.priceAsNumber },
                    ]}),
                new ProductAttribute({
                    name: "roast",
                    options: [
                        { optionName: "Filter", priceModifier: 0 },
                        { optionName: "Espresso", priceModifier: 0 },
                        { optionName: "Both", priceModifier: 0 },
                    ]
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
        return [this.origin ?? "", this.tastingNotes?.join(", ") ?? ""];
    }

    get kgPriceAsNumber(): number {
        return 4 * this.priceAsNumber * 0.9;
    }
}
