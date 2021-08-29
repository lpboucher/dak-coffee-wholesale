import { ProductAttributeOption } from "@shared/models/interfaces/product-attribute-option.interface";

export class ProductAttribute {
    name: string | null = null;
    options: ProductAttributeOption[] = [];
    type: string = "dropdown";

    constructor(productAttributeShape?: Partial<ProductAttribute>) {
        if (productAttributeShape != null) {
            if (productAttributeShape.name != null) {
                this.name = productAttributeShape.name;
            }

            if (productAttributeShape.options != null) {
                this.options = productAttributeShape.options;
            }

            if (productAttributeShape.type != null) {
                this.type = productAttributeShape.type;
            }
        }
    }

    get optionNames(): string[] {
        return this.options.map((option) => option.name);
    }
}

export class SelectedProductAttribute extends ProductAttribute {
    value: any;

    constructor(SelectedProductAttributeShape?: Partial<SelectedProductAttribute>) {
        super(SelectedProductAttributeShape);

        if (SelectedProductAttributeShape != null) {
            if (SelectedProductAttributeShape.value != null) {
                this.value = SelectedProductAttributeShape.value;
            }
        }
    }
}
