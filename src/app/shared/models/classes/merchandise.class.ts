import { ProductType } from "../types/product-type.type";
import { Product } from "./product.class";

export class Merchandise extends Product {
    productType: ProductType = "merchandise";
    dimensions: string | null = null;
    material: string | null = null;

    constructor(merchandiseShape?: Partial<Merchandise>) {
        super(merchandiseShape);

        if (merchandiseShape != null) {
            this.filterableAttributes = [
                ...this.filterableAttributes,
                { attribute: "dimensions", displayName: "Dimensions" }
            ];

            if (merchandiseShape.dimensions != null) {
                this.dimensions = merchandiseShape.dimensions;
            }

            if (merchandiseShape.material != null) {
                this.material = merchandiseShape.material;
            }
        }
    }
}
