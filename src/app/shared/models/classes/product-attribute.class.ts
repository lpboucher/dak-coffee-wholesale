import { ProductAttributeOption } from "@shared/models/types/product-attribute-option.interface"

export class ProductAttribute {
    name: string | null = null;
    options: ProductAttributeOption[] | null = null;

    constructor(productAttributeShape?: Partial<ProductAttribute>) {
        if (productAttributeShape != null) {
            if (productAttributeShape.name != null) {
                this.name = productAttributeShape.name;
            }

            if (productAttributeShape.options != null) {
                this.options = productAttributeShape.options;
            }
        }
    }
}
