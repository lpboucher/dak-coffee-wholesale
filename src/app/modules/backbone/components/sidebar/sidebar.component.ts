import { ChangeDetectorRef, Component, Input, Output, EventEmitter } from "@angular/core";

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
    @Input() open: boolean = false;
    @Output() openChange = new EventEmitter<boolean>();
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
        this.open = false;
        this.openChange.emit(this.open);
    }

    onPricingToggled(value: boolean): void {
        this.pricingTierService.toggleDiscount(value);
    }
}
