import { Pipe, PipeTransform } from "@angular/core";

import { Product } from "@shared/models/classes/product.class";
import { ProductType } from "@shared/models/types/product-type.type";
import { FilterType } from "@shared/models/types/filter-type.type";
import { FilterableAttribute } from "@shared/models/types/filterable-attribute.type";

import { getUniqueValuesOfKey } from "@utils/helper";

@Pipe({
    name: "productsToFilters"
})
export class ProductsToFiltersPipe implements PipeTransform {
    transform(products: Product[], productType: ProductType): FilterType[] {
        const filters = products
            .reduce(
                (arr, product) => [...arr, ...product.filterableAttributes],
                [] as FilterableAttribute[]
            ).reduce(
                (union, fa) => ({
                    ...union,
                    ...{
                        [fa.attribute]: {
                            displayName: fa.displayName,
                            key: fa.attribute,
                            options: getUniqueValuesOfKey(products, fa.attribute),
                        }
                    }
                }), {}
            ) as { [key: string]: FilterType };

        if (productType != "all") delete filters["productType"];

        return Object.values(filters);
    }
}
