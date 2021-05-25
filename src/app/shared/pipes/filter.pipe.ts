import { Pipe, PipeTransform } from "@angular/core";

import { FilterType } from "@shared/models/types/filter-type.type";

import { Product } from "@shared/models/classes/product.class";
import { Coffee } from "@shared/models/classes/coffee.class";

@Pipe({
    name: "filter"
})
export class FilterPipe implements PipeTransform {

    transform(products: Product[], filter: FilterType): Product[] {
        let filteredProducts = [];

        const coffees = products
            .filter(p => p.productType == "coffee")
            .map(p => p as Coffee);

        for (const coffee of coffees) {
            if (this.includedInFilter(coffee.origin, filter, "Origins")) {
                filteredProducts.push(coffee);
            } else if (this.includedInFilter(coffee.process, filter, "Processes")) {
                filteredProducts.push(coffee);
            } else if (this.includedInFilter(coffee.varietal, filter, "Varieties")) {
                filteredProducts.push(coffee);
            }
        }

        return filteredProducts;
    }

    includedInFilter(productAttribute: string | null, filter: FilterType, option: string): boolean {
        return productAttribute != null
            && Object.keys(filter).includes(option)
            && filter[option].includes(productAttribute);
    }
}
