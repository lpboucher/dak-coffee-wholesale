import { Component, ViewChild } from "@angular/core";
import { PricingTierService } from "@app/core/pricing/pricing-tier.service";

import { ModalBackboneComponent } from "@shared/components/modals";

@Component({
    selector: "app-volume-selection-modal",
    templateUrl: "./volume-selection-modal.component.html",
    styleUrls: ["./volume-selection-modal.component.scss"]
})
export class VolumeSelectionModalComponent {
    @ViewChild("modal") modal: ModalBackboneComponent | undefined;
    largeVolumeDiscountSelected: boolean = false;

    constructor(private pricingTierService: PricingTierService) {}

    onChangeSelection(largeVolumeDiscountSelected: boolean): void {
        this.largeVolumeDiscountSelected = largeVolumeDiscountSelected;
    }

    onConfirm(): void {
        this.pricingTierService.toggleDiscount(this.largeVolumeDiscountSelected);

        if (this.modal != null) {
            this.modal.close();
        }
    }
}
