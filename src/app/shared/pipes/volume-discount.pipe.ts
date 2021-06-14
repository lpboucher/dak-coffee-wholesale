import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "volumeDiscount"
})
export class VolumeDiscountPipe implements PipeTransform {

    transform(value: unknown, ...args: unknown[]): unknown {
        return null;
    }

}
