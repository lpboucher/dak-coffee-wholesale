import { Pipe, PipeTransform } from "@angular/core";

import { Product } from "@shared/models/classes/product.class";
import { FilterType } from "@shared/models/types/filter-type.type";

import { getUniqueValuesOfKey, camelToSentence } from "@utils/helper";

@Pipe({
    name: "productsToFilters"
})
export class ProductsToFiltersPipe implements PipeTransform {
    transform(products: Product[]): FilterType[] {
        const uniqueKeys = getUniqueValuesOfKey(products, "filterKeys");

        return uniqueKeys.map((oneKey) => {
            return {
                key: oneKey,
                displayName: camelToSentence(oneKey),
                options: getUniqueValuesOfKey(products, oneKey),
            };
        });
    }
}
