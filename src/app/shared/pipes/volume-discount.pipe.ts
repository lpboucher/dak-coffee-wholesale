import { Pipe, PipeTransform } from "@angular/core";

import { PricingTierService } from "@core/pricing/pricing-tier.service";

@Pipe({
    name: "volumeDiscount"
})
export class VolumeDiscountPipe implements PipeTransform {
    private static ACTIVE_DISCOUNT_REDUCTION: number = 0.55;
    private static INACTIVE_DISCOUNT_REDUCTION: number = 0.7;

    constructor(private pricingTierService: PricingTierService) {}

    transform(value: number): number {
        if (this.pricingTierService.isDiscountActive) {
            return value * VolumeDiscountPipe.ACTIVE_DISCOUNT_REDUCTION;
        }

        return value * VolumeDiscountPipe.INACTIVE_DISCOUNT_REDUCTION;
    }

}
