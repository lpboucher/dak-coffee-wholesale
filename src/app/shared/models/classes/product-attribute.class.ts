import { ProductAttributeOption } from "@shared/models/types/product-attribute-option.interface"

export class ProductAttribute {
    name: string;
    options: ProductAttributeOption[];

    constructor(name: string, options: ProductAttributeOption[]) {
        this.name = name;
        this.options = options;
    }
}
