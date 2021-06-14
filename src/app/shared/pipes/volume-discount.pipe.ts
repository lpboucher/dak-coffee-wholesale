import { Pipe, PipeTransform } from "@angular/core";

import { PricingTierService } from "@core/pricing/pricing-tier.service";

import { ACTIVE_DISCOUNT_REDUCTION, INACTIVE_DISCOUNT_REDUCTION} from "@utils/constants/discounts";

@Pipe({
    name: "volumeDiscount"
})
export class VolumeDiscountPipe implements PipeTransform {

    constructor(private pricingTierService: PricingTierService) {}

    transform(value: number): number {
        if (this.pricingTierService.isDiscountActive) {
            return value * ACTIVE_DISCOUNT_REDUCTION;
        }

        return value * INACTIVE_DISCOUNT_REDUCTION;
    }

}
