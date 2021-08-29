import { Component, ViewChild } from "@angular/core";
import { PricingTierService } from "@core/pricing/pricing-tier.service";
import { ModalBackboneComponent } from "@shared/components/modals";

@Component({
    selector: "app-wallet-modal",
    templateUrl: "./wallet-modal.component.html",
    styleUrls: ["./wallet-modal.component.scss"]
})
export class WalletModalComponent {
    @ViewChild("modal") modal: ModalBackboneComponent | undefined;

    get walletAmount(): number {
        return this.pricingTierService.walletAmount;
    }

    constructor(private pricingTierService: PricingTierService) {}

    onOk(): void {
        if (this.modal != null) {
            this.modal.close();
        }
    }
}
