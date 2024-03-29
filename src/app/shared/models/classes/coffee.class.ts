import { ProductType } from "@shared/models/types/product-type.type";
import { Product } from "@shared/models/classes/product.class";
import { ProductAttribute } from "@shared/models/classes/product-attribute.class";
import { ProductAttributeOption } from "../interfaces/product-attribute-option.interface";

import { ROAST_OPTIONS } from "@utils/constants/form-options";

export class Coffee extends Product {
    productType: ProductType = "coffee";
    attributes: ProductAttribute[] = [];
    origin: string | null = null;
    tastingNotes: string[] = [];
    process: string | null = null;
    varietal: string[] = [];
    roastOptions: {name: "filter" | "espresso"}[] = ROAST_OPTIONS.map(opt => ({name: opt}));
    modifiers: ProductAttributeOption[] = [];
    volumeOptions: ProductAttributeOption[] = [];

    constructor(coffeeShape?: Partial<Coffee>) {
        super(coffeeShape);

        if (coffeeShape != null && coffeeShape.roastOptions != null && coffeeShape.roastOptions.length > 0) {
            this.roastOptions = coffeeShape.roastOptions;
        }

        if (coffeeShape != null) {
            this.filterableAttributes = [
                { key: "origin", displayName: "Origin" },
                { key: "tastingNotes", displayName: "Tasting Notes" },
                { key: "process", displayName: "Process" },
                { key: "varietal", displayName: "Varietal" },
             ];

            this.attributes = [
                // TODO add hidden type once snipcart behaviour fixed
                /*new ProductAttribute({
                    name: "volume-discount",
                    options: [
                        { name: "30%", priceModifier: -(0.3 * this.priceAsNumber) },
                        { name: "45%", priceModifier: -(0.45 * this.priceAsNumber) },
                    ],
                    type: "readonly"
                }),*/
                new ProductAttribute({
                    name: "roast",
                    options: this.roastOptions,
                }),
            ];

            /*if (coffeeShape.modifiers != null && coffeeShape.modifiers.length > 0) {
                this.modifiers = coffeeShape.modifiers;
                this.attributes.push(
                    new ProductAttribute({
                        name: "volume-weight-discount",
                        options: coffeeShape.modifiers,
                    })
                );
            }*/
            if (coffeeShape.id === '6190df0c708fc469fcde8609') {
                const modifiedOptions = [{ name: '250g', priceModifier: -7.09 }];
                this.volumeOptions = modifiedOptions;
                this.attributes.push(
                    new ProductAttribute({
                        name: "weight",
                        options: modifiedOptions,
                    })
                );

            } else if (coffeeShape.id === '63dbca6ecd8d943c7e8d5e88') {
                const modifiedOptions = [{ name: '250g', priceModifier: -6.25 }];
                this.volumeOptions = modifiedOptions;
                this.attributes.push(
                    new ProductAttribute({
                        name: "weight",
                        options: modifiedOptions,
                    })
                );

            } else if (coffeeShape.id === '64ef60bff8421264cd3de0d0') {
                const modifiedOptions = [{ name: '250g', priceModifier: -6.28 }];
                this.volumeOptions = modifiedOptions;
                this.attributes.push(
                    new ProductAttribute({
                        name: "weight",
                        options: modifiedOptions,
                    })
                );

            } else if (coffeeShape.volumeOptions != null && coffeeShape.volumeOptions.length > 0) {
                this.volumeOptions = coffeeShape.volumeOptions;
                this.attributes.push(
                    new ProductAttribute({
                        name: "weight",
                        options: coffeeShape.volumeOptions,
                    })
                );
            } else {
                this.attributes.push(
                    new ProductAttribute({
                        name: "weight",
                        options: [
                            { name: "250g" },
                            { name: "1kg" },
                        ]}),
                );
            }

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
