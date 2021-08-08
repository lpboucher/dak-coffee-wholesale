import { Pipe, PipeTransform } from "@angular/core";

import { ProductAttribute } from "../models/classes/product-attribute.class";
import { CartModifier } from "../models/types/cart-modifier.interface";

@Pipe({
    name: "cartModifier"
})
export class CartModifierPipe implements PipeTransform {
    transform(attributes: ProductAttribute[] | null, values: {[key: string]: any}): CartModifier[] {
        let nonNullModifiers: CartModifier[] = [];

        if (attributes == null || attributes.length === 0) return [];

        attributes.forEach((oneAttribute) => {
            if (oneAttribute.name != null) {
                nonNullModifiers.push({ attribute: oneAttribute, selection: values[oneAttribute.name]});
            }
        })

        return nonNullModifiers;
    }
}
