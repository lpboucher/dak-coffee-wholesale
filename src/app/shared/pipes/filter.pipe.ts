import { Pipe, PipeTransform } from "@angular/core";

import { FilterType } from "@shared/models/types/filter-type.type";

@Pipe({
    name: "filter"
})
export class FilterPipe implements PipeTransform {

    transform(items: Object[], filter: FilterType): Object[] {
        if (items == null) { return []; }
        if (filter == null) { return items; }

        return items.filter(item => this.includedByFilter(filter, item));
    }

    includedByFilter(filter: FilterType, item: Object): boolean {
        for (const [key, value] of Object.keys(item)) {
            if (this.matchingValue(filter, key, value)) {
                return true;
            }
        }

        return false;
    }

    matchingValue(filter: FilterType, key: string, value: string): boolean {
        return Object.keys(filter).includes(key)
            && filter[key].includes(value);
    }
}
