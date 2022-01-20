import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "percentString"
})
export class PercentStringPipe implements PipeTransform {
    transform(percentDecimal: number, decimals: number = 0): string {
        return `${(percentDecimal * 100).toFixed(decimals)}%`;
    }
}
