import { Pipe, PipeTransform } from "@angular/core";

import { PricingTierService } from "@core/pricing/pricing-tier.service";

import { ACTIVE_DISCOUNT_REDUCTION, INACTIVE_DISCOUNT_REDUCTION} from "@utils/constants/discounts";

@Pipe({
    name: "volumeDiscount",
    pure: false,
})
export class VolumeDiscountPipe implements PipeTransform {

    constructor(private pricingTierService: PricingTierService) {}

    transform(rawValue: string | null): string {
        if (rawValue == null) { return ""; }

        const discount = this.pricingTierService.isDiscountActive ? ACTIVE_DISCOUNT_REDUCTION : INACTIVE_DISCOUNT_REDUCTION;
        return (Number.parseFloat(rawValue) * discount).toFixed(2);
    }

}
