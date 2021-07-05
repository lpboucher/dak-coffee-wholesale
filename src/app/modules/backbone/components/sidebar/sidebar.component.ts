import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from "@angular/core";

import { AuthService } from "@core/authentication/authentication.service";
import { CartService } from "@core/cart/cart.service";
import { PricingTierService } from "@core/pricing/pricing-tier.service";
import { ModalService } from "@core/views/modal.service";

import { WalletModalComponent } from "@shared/components/modals";
import { NavigationComponent } from "@shared/abstracts/navigation/navigation.component";

import { NAVIGATION } from "@utils/constants/navigation";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent extends NavigationComponent {
    @Output() hideSidebarEvent: EventEmitter<any> = new EventEmitter();
    navigation = NAVIGATION;
    openLabel = "";

    constructor(
        protected authService: AuthService,
        protected pricingTierService: PricingTierService,
        protected cartService: CartService,
        protected modalService: ModalService<WalletModalComponent>,
        protected changeDetectorRef: ChangeDetectorRef,
    ) {
        super(pricingTierService, changeDetectorRef, cartService, modalService, authService)
    }

    onMobileCloseClicked(): void {
        this.hideSidebarEvent.emit();
    }

    onPricingToggled(value: boolean): void {
        this.pricingTierService.toggleDiscount(value);
    }
}
