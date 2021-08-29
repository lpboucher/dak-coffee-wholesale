import { Component, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { PricingTierService } from "@core/pricing/pricing-tier.service";

import { ModalBackboneComponent } from "@shared/components/modals";

import { CART_WEIGHT_THRESHOLD } from "@utils/constants/discounts";

@Component({
    selector: "app-volume-selection-modal",
    templateUrl: "./volume-selection-modal.component.html",
    styleUrls: ["./volume-selection-modal.component.scss"]
})
export class VolumeSelectionModalComponent {
    @ViewChild("modal") modal: ModalBackboneComponent | undefined;
    largeVolumeDiscountSelected: boolean = false;
    weightThreshold: string = CART_WEIGHT_THRESHOLD.toFixed(1);

    constructor(
        private pricingTierService: PricingTierService,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    onChangeSelection(largeVolumeDiscountSelected: boolean): void {
        this.largeVolumeDiscountSelected = largeVolumeDiscountSelected;
    }

    onConfirm(): void {
        this.pricingTierService.toggleDiscount(this.largeVolumeDiscountSelected);

        if (this.modal != null) {
            const { checkPricing, ...existingParams } = this.route.snapshot.queryParams;
            this.modal.close();
            this.router.navigate([], { queryParams: existingParams });
        }
    }
}
