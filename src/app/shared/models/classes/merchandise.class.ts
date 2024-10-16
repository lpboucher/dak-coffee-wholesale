import { ProductType } from "@shared/models/types/product-type.type";
import { ProductAttribute } from "@shared/models/classes/product-attribute.class";
import { Product } from "@shared/models/classes/product.class";

export class Merchandise extends Product {
    productType: ProductType = "merchandise";
    attributes: ProductAttribute[] = [];
    dimensions: string | null = null;
    material: string | null = null;
    type: string | null = null;
    isAvailableWholesale = false;

    constructor(merchandiseShape?: Partial<Merchandise>) {
        super(merchandiseShape);

        if (merchandiseShape != null) {
            this.filterableAttributes = [
                { key: "dimensions", displayName: "Dimensions" }
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
            ];

            if (merchandiseShape.dimensions != null) {
                this.dimensions = merchandiseShape.dimensions;
            }

            if (merchandiseShape.material != null) {
                this.material = merchandiseShape.material;
            }

            if (merchandiseShape.type != null) {
                this.type = merchandiseShape.type;

                if (merchandiseShape.type === "t-shirt") {
                    this.attributes.push(
                        new ProductAttribute({
                            name: "size",
                            options: [
                                { name: "XS" },
                                { name: "S" },
                                { name: "M" },
                                { name: "L" },
                                { name: "XL" },
                            ]}),
                    );

                    this.attributes.push(
                        new ProductAttribute({
                            name: "color",
                            options: [
                                { name: "Vintage White", priceModifier: -(0 * this.priceAsNumber) },
                            ]}),
                    );
                }

                if (merchandiseShape.type === "clothing") {
                    this.attributes.push(
                        new ProductAttribute({
                            name: "size",
                            options: [
                                { name: "S" },
                                { name: "M" },
                                { name: "L" },
                                { name: "XL (only in blue)" },
                            ]}),
                    );

                    this.attributes.push(
                        new ProductAttribute({
                            name: "color",
                            options: [
                                { name: "Navy", priceModifier: -(0.3 * this.priceAsNumber) },
                                { name: "Cream Grey", priceModifier: -(0.3 * this.priceAsNumber) },
                            ]}),
                    );
                }

                if (merchandiseShape.type === "crewneck") {
                    this.attributes.push(
                        new ProductAttribute({
                            name: "size",
                            options: [
                                { name: "S" },
                                { name: "M" },
                                { name: "L" },
                                { name: "XL" },
                            ]}),
                    );

                    this.attributes.push(
                        new ProductAttribute({
                            name: "color",
                            options: [
                                { name: "Vintage White", priceModifier: -(0 * this.priceAsNumber) },
                            ]}),
                    );
                }

                if (merchandiseShape.type === "nitro-crew") {
                    this.attributes.push(
                        new ProductAttribute({
                            name: "size",
                            options: [
                                { name: "XXS" },
                                { name: "XS" },
                                { name: "S" },
                                // { name: "M" },
                                // { name: "L" },
                            ]}),
                    );

                    this.attributes.push(
                        new ProductAttribute({
                            name: "color",
                            options: [
                                { name: "Green", priceModifier: -(0.25 * this.priceAsNumber) },
                            ]}),
                    );
                }

                if (merchandiseShape.type === "roasting-tee" || merchandiseShape.type === "brewing-tee" ) {
                    this.attributes.push(
                        new ProductAttribute({
                            name: "size",
                            options: [
                                { name: "XS" },
                                { name: "S" },
                                { name: "M" },
                                { name: "L" },
                                { name: "XL" },
                            ]}),
                    );

                    this.attributes.push(
                        new ProductAttribute({
                            name: "color",
                            options: [
                                { name: "White", priceModifier: -(0.3 * this.priceAsNumber) },
                            ]}),
                    );
                }
            }

            if (merchandiseShape.isAvailableWholesale != null) {
                this.isAvailableWholesale = merchandiseShape.isAvailableWholesale;
            }
        }
    }
}
