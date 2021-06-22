import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { AuthService } from "@core/authentication/authentication.service";
import { CartService } from "@core/cart/cart.service";
import { PricingTierService } from "@core/pricing/pricing-tier.service";
import { ModalService } from "@core/views/modal.service";
import { WalletModalComponent } from "@shared/components/modals/content/wallet-modal/wallet-modal.component";

import { NAVIGATION } from "@utils/constants/navigation";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
    navigation = NAVIGATION;
    openLabel = "";
    priceTierActive$: Observable<boolean> = new Observable();

    get cartTotal(): Observable<number> {
        return this.cartService.cartTotal$;
    }

    get cartWeight(): Observable<number> {
        return this.cartService.cartWeight$;
    }

    constructor(
        private authService: AuthService,
        private pricingTierService: PricingTierService,
        private cartService: CartService,
        private modalService: ModalService<WalletModalComponent>
    ) {}

    ngOnInit(): void {
        this.priceTierActive$ = this.pricingTierService.isDiscountActive$;
    }

    onPricingToggled(value: boolean): void {
        this.pricingTierService.toggleDiscount(value);
    }

    onWalletWidgetClicked(): void {
        this.modalService.open(WalletModalComponent);
    }

    onCartWidgetClicked(): void {
        (window as any).Snipcart.api.theme.cart.open();
    }

    onLogoutClicked(): void {
        this.authService.logout();
    }
}
