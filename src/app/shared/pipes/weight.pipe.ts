import { Pipe, PipeTransform } from "@angular/core";

import { Weight } from "@shared/models/types/weight.type";

@Pipe({
    name: "weight"
})
export class WeightPipe implements PipeTransform {
    transform(weight: Weight): number {
        const isGrams = !weight.includes("kg");
        const rawWeightValue = weight.split(/kg|g/)[0];

        let weightValue = Number.parseInt(rawWeightValue);
        if (isGrams) {
            weightValue = weightValue / 1000;
        }

        return weightValue;
    }
}
