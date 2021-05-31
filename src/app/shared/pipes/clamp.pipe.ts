import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "clamp"
})
export class ClampPipe implements PipeTransform {

    transform(value: number, min: number, max: number): number {
        value = Math.max(value, min);
        value = Math.min(value, max);

        return value;
    }

}
