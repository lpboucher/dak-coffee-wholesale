import { Pipe, PipeTransform } from "@angular/core";

import { ProductAttribute } from "../models/classes/product-attribute.class";

@Pipe({
    name: "adjustedProductPrice"
})
export class AdjustedProductPricePipe implements PipeTransform {
    transform(basePrice: number, pricedAttributes: ProductAttribute[], selections: {[key: string]: any}): number {

        if (basePrice === 0) return 0;
        if (pricedAttributes == null || pricedAttributes.length === 0) return basePrice;

        let priceModifier: number;
        const isCoffee = pricedAttributes.find((attr) => attr.name === "weight");
        const isMerchandise = pricedAttributes.find((attr) => attr.name === "color");

        if (isCoffee != null) {
            const activeOption = isCoffee.options.find((opt) => opt.name === selections[isCoffee.name!]);
            priceModifier = activeOption?.priceModifier!;
        } else if(isMerchandise != null) {
            const activeOption = isMerchandise.options.find((opt) => opt.name === selections[isMerchandise.name!]);
            priceModifier = activeOption?.priceModifier!;
        } else {
            priceModifier = 0;
        }

        return basePrice + priceModifier;
    }
}
