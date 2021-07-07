import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "formatPrice"
})
export class FormatPricePipe implements PipeTransform {
    transform(price: number): string {
        return `€${ price.toFixed(2) }`;
    }
}
