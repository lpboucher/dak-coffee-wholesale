import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "percentString"
})
export class PercentStringPipe implements PipeTransform {
    transform(value: number, decimals: number = 0): string {
        return `${value.toFixed(decimals)}%`;
    }
}
