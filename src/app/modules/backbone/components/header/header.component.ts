import { ChangeDetectorRef, Component, EventEmitter, Output } from "@angular/core";

import { AuthService } from "@core/authentication/authentication.service";
import { PricingTierService } from "@core/pricing/pricing-tier.service";
import { CartService } from "@core/cart/cart.service";
import { ModalService } from "@core/views/modal.service";

import { WalletModalComponent } from "@shared/components/modals";
import { NavigationComponent } from "@shared/abstracts/navigation/navigation.component";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent extends NavigationComponent {
    @Output() showSidebarEvent: EventEmitter<any> = new EventEmitter();

    constructor(
        protected pricingTierService: PricingTierService,
        protected changeDetectorRef: ChangeDetectorRef,
        protected cartService: CartService,
        protected modalService: ModalService<WalletModalComponent>,
        protected authService: AuthService,
    ) {
        super(pricingTierService, changeDetectorRef, cartService, modalService, authService);
    }

    onBurgerMenuClick(): void {
        this.showSidebarEvent.emit();
    }
}