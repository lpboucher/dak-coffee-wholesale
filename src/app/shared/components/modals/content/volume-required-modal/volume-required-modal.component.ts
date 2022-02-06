import { Component, ViewChild } from "@angular/core";
import { CartService } from "@core/cart/cart.service";
import { ModalBackboneComponent } from "@shared/components/modals";

import { CART_WEIGHT_THRESHOLD } from "@utils/constants/discounts";

@Component({
    selector: "app-volume-required-modal",
    templateUrl: "./volume-required-modal.component.html",
    styleUrls: ["./volume-required-modal.component.scss"]
})
export class VolumeRequiredModalComponent {
    @ViewChild("modal") modal: ModalBackboneComponent | undefined;

    get cartWeight(): number {
        return this.cartService.currentCartWeightValue;
    }

    get minimumWeight(): number {
        return CART_WEIGHT_THRESHOLD;
    }

    constructor(private cartService: CartService) {}

    onOk(): void {
        if (this.modal != null) {
            this.modal.close();
        }
    }
}
