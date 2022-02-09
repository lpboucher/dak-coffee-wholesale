import { Pipe, PipeTransform } from "@angular/core";

import { ProductAttribute } from "../models/classes/product-attribute.class";

@Pipe({
    name: "cartModifier"
})
export class CartModifierPipe implements PipeTransform {
    transform(attribute: ProductAttribute | null): string {
        if (attribute == null) { return ""; }

        const hasModifier = attribute?.options.some(opt => opt.priceModifier);

        const attributesWithPrice = attribute?.options.map(({name, priceModifier}) => {
            if (hasModifier) {
                return `${name}[${Math.round(priceModifier! * 100) / 100}]`;
            }
            return name;
        });

        return attributesWithPrice.join("|");
    }
}

