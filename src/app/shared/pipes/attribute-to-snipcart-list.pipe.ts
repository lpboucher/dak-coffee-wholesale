import { Pipe, PipeTransform } from "@angular/core";

import { ProductAttribute } from "@shared/models/classes/product-attribute.class";

@Pipe({
    name: "attributeToSnipcartList"
})
export class AttributeToSnipcartListPipe implements PipeTransform {
    transform(attribute: ProductAttribute): string {
        return attribute.options
            .reduce((s, o) => s +  `|${ o.optionName }[${ o.priceModifier }]`, "")
            .substring(1);
    }
}
