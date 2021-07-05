import { ChangeDetectorRef, Component } from "@angular/core";

import { AuthService } from "@core/authentication/authentication.service";
import { PricingTierService } from "@core/pricing/pricing-tier.service";
import { CartService } from "@core/cart/cart.service";
import { ModalService } from "@core/views/modal.service";

import { SidebarComponent } from "@modules/backbone/components/sidebar/sidebar.component";
import { WalletModalComponent } from "@shared/components/modals";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent extends SidebarComponent {
    showSidebar = false;
    onBurgerMenuClick: () => void = () => { this.showSidebar = true; }

    constructor(
        authService: AuthService,
        pricingTierService: PricingTierService,
        cartService: CartService,
        modalService: ModalService<WalletModalComponent>,
        changeDetectorRef: ChangeDetectorRef,
    ) {
        super(authService, pricingTierService, cartService, modalService, changeDetectorRef);
    }

    onClickedOffSidebar(): void {
        this.showSidebar = false;
    }
}
