import { Pipe, PipeTransform } from "@angular/core";

import { ProductAttribute } from "../models/classes/product-attribute.class";

@Pipe({
    name: "adjustedProductPrice"
})
export class AdjustedProductPricePipe implements PipeTransform {
    transform(basePrice: number, pricedAttributes: ProductAttribute[], selections: {[key: string]: any}): number {

        if (basePrice === 0) return 0;
        if (pricedAttributes == null || pricedAttributes.length === 0) return basePrice;

        return pricedAttributes.reduce((sum, attribute) => {
            const selectedOptionPriceModifer = attribute.options.find((opt) => opt.name === selections[attribute.name!]);
            return sum + (selectedOptionPriceModifer?.priceModifier ?? 0);
        }, basePrice);
    }
}
