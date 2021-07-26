import { Pipe, PipeTransform } from "@angular/core";

import { ProductAttributeOption } from "../models/types/product-attribute-option.interface";

@Pipe({
    name: "attributeToSnipcartList"
})
export class AttributeOptionsToSnipcartListPipe implements PipeTransform {
    transform(options: ProductAttributeOption[] | null): string {
        if (options == null) return "";
        return options
            .map(o => o.optionName + "[" + o.priceModifier + "]")
            .join("|");
    }
}
