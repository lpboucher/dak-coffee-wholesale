import { ChangeDetectorRef, Component } from "@angular/core";

import { AuthService } from "@core/authentication/authentication.service";
import { CartService } from "@core/cart/cart.service";
import { PricingTierService } from "@core/pricing/pricing-tier.service";
import { ModalService } from "@core/views/modal.service";

import { WalletModalComponent } from "@shared/components/wallet-modal/wallet-modal.component";
import { SidebarComponent } from "@modules/backbone/components/sidebar/sidebar.component";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent extends SidebarComponent {
    showSidebar = false;

    constructor(
        authService: AuthService,
        pricingTierService: PricingTierService,
        cartService: CartService,
        modalService: ModalService<WalletModalComponent>,
        changeDetectorRef: ChangeDetectorRef,
    ) {
        super(authService, pricingTierService, cartService, modalService, changeDetectorRef);
    }

    onBurgerMenuClick(): void {
        this.showSidebar = true;
    }
}
