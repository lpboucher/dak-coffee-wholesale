import { ProductType } from "@shared/models/types/product-type.type";
import { ProductAttribute } from "@shared/models/classes/product-attribute.class";
import { Product } from "@shared/models/classes/product.class";

export class Merchandise extends Product {
    productType: ProductType = "merchandise";
    attributes: ProductAttribute[] = [];
    dimensions: string | null = null;
    material: string | null = null;

    constructor(merchandiseShape?: Partial<Merchandise>) {
        super(merchandiseShape);

        if (merchandiseShape != null) {
            this.filterableAttributes = [
                { key: "dimensions", displayName: "Dimensions" }
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
