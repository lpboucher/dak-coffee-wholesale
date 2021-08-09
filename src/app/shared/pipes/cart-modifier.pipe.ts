import { Pipe, PipeTransform } from "@angular/core";

import { ProductAttribute, SelectedProductAttribute } from "../models/classes/product-attribute.class";

@Pipe({
    name: "cartModifier"
})
export class CartModifierPipe implements PipeTransform {
    transform(attributes: ProductAttribute[] | null, values: {[key: string]: any}): SelectedProductAttribute[] {
        let nonNullModifiers: SelectedProductAttribute[] = [];

        if (attributes == null || attributes.length === 0) return [];

        attributes.forEach((oneAttribute) => {
            if (oneAttribute.name != null) {
                nonNullModifiers.push(new SelectedProductAttribute({
                    ...oneAttribute,
                    value: values[oneAttribute.name]
                }));
            }
        })

        return nonNullModifiers;
    }
}
