import { Pipe, PipeTransform } from "@angular/core";

import { ActiveFilters } from "@shared/models/types/active-filters.type";

@Pipe({
    name: "filter"
})
export class FilterPipe implements PipeTransform {

    transform<T>(items?: T[], filter?: ActiveFilters): T[] {
        if (items == null) { return []; }
        if (filter == null || Object.keys(filter).length === 0) { return items; }

        return items.filter(item => this.includedByFilter(filter, item));
    }

    includedByFilter(filter: ActiveFilters, item: Object): boolean {
        return Object.entries(item)
            .some(([k, v]) =>
                Array.isArray(v)
                    ? v.some(element => this.matchingValue(filter, k, element))
                    : this.matchingValue(filter, k, v)
    );
    }

    matchingValue(filter: ActiveFilters, key: string, value: string): boolean {
        return Object.keys(filter).includes(key)
            && filter[key].includes(String(value));
    }
}
