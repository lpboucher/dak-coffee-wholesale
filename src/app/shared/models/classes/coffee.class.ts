import { ProductAttributeOption } from "@shared/models/types/product-attribute-option.interface";
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
            this.attributes = [
                new ProductAttribute(
                    "weight",
                    [
                        { optionName: "250g", priceModifier: 0 },
                        { optionName: "1kg", priceModifier: this.kgPriceAsNumber },
                    ]),
                new ProductAttribute(
                    "roast",
                    [
                        { optionName: "Filter", priceModifier: 0 },
                        { optionName: "Espresso", priceModifier: 0 },
                        { optionName: "Both", priceModifier: 0 },
                    ]
                )
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
