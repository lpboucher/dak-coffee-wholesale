import { Pipe, PipeTransform } from "@angular/core";

import { FilterType } from "@shared/models/types/filter-type.type";

import { Product } from "@shared/models/classes/product.class";

@Pipe({
    name: "filter"
})
export class FilterPipe implements PipeTransform {

    transform(products: Product[], filter: FilterType): Product[] {
        return [];
    }
}
