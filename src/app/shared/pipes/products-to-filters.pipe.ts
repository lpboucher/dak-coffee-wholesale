import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "productsToFilters"
})
export class ProductsToFiltersPipe implements PipeTransform {
    transform(value: unknown, ...args: unknown[]): unknown {
        return null;
    }
}
