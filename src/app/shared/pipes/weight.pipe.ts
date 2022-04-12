import { Pipe, PipeTransform } from "@angular/core";

import { Weight } from "@shared/models/types/weight.type";

@Pipe({
    name: "weightToGrams"
})
export class WeightPipe implements PipeTransform {
    transform(weight: Weight): number {
        const isKilos = weight.includes("kg");
        const rawWeightValue = weight.split(/kg|g/)[0];

        const weightValue = Number.parseFloat(rawWeightValue);
        return isKilos ? weightValue : weightValue / 1000;
    }
}
