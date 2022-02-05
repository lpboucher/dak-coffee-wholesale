import { Pipe, PipeTransform } from "@angular/core";

import { ProductAttribute, SelectedProductAttribute } from "../models/classes/product-attribute.class";

@Pipe({
    name: "cartModifier"
})
export class CartModifierPipe implements PipeTransform {
    transform(attributes: ProductAttribute[] | null, values: {[key: string]: any}, discount: string): SelectedProductAttribute[] {
        let nonNullModifiers: SelectedProductAttribute[] = [];

        if (attributes == null || attributes.length === 0) { return []; }

        attributes.forEach((oneAttribute) => {
            if (oneAttribute.name === "volume-weight-discount") {
                nonNullModifiers.push(new SelectedProductAttribute({
                    ...oneAttribute,
                    value: `${values["weight"]}/${discount}`
                }));
            } else if (oneAttribute.name != null && oneAttribute.name !== "volume-weight-discount") {
                nonNullModifiers.push(new SelectedProductAttribute({
                    ...oneAttribute,
                    value: values[oneAttribute.name]
                }));
            }
        });

        return nonNullModifiers;
    }
}
