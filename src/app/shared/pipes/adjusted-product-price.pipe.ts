import { Pipe, PipeTransform } from "@angular/core";

import { ProductAttribute } from "../models/classes/product-attribute.class";

@Pipe({
    name: "adjustedProductPrice"
})
export class AdjustedProductPricePipe implements PipeTransform {
    transform(basePrice: number, pricedAttributes: ProductAttribute[], selections: {[key: string]: any}): number {

        if (basePrice === 0) return 0;
        if (pricedAttributes == null || pricedAttributes.length === 0) return basePrice;

        let pricedAttribute: ProductAttribute;

        const isCoffee = pricedAttributes.find((attr) => attr.name === "volume-weight-discount");
        const isMerchandise = pricedAttributes.find((attr) => attr.name === "volume-discount");

        if (isCoffee != null) {
            pricedAttribute = isCoffee!;
            const activeOption = isCoffee.options.find((opt) => opt.name === selections[isCoffee.name!]);
            return basePrice + activeOption?.priceModifier!;
        } else {
            pricedAttribute = isMerchandise!;
        }

        const activeOption = pricedAttribute?.options.find((opt) => opt.name === selections[pricedAttribute.name!]);
        return basePrice + activeOption?.priceModifier!;
    }
}
