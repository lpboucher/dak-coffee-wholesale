import { Pipe, PipeTransform } from "@angular/core";

import { ProductAttributeOption } from "../models/types/product-attribute-option.interface";

@Pipe({
    name: "priceModifier"
})
export class PriceModifierPipe implements PipeTransform {
    transform(options: ProductAttributeOption[] | null): string {
        if (options == null || options.length === 0) return "";

        const optionsWithPrice = options.map(({optionName, priceModifier}) => `${optionName}[${priceModifier}]`);
        return optionsWithPrice.join("|");
    }
}