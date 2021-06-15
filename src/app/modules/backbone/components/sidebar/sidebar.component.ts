import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { AuthService } from "@core/authentication/authentication.service";
import { CartService } from "@core/cart/cart.service";
import { PricingTierService } from "@core/pricing/pricing-tier.service";

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

    constructor(
        private authService: AuthService,
        private pricingTierService: PricingTierService,
        private cartService: CartService,
    ) {}

    ngOnInit(): void {
        this.priceTierActive$ = this.pricingTierService.isDiscountActive$;
    }

    get cartTotal(): Observable<number> {
        return this.cartService.cartTotal$;
    }

    get cartWeight(): Observable<number> {
        return this.cartService.cartWeight$;
    }

    onPricingToggled(value: boolean): void {
        this.pricingTierService.toggleDiscount(value);
    }

    onWalletWidgetClicked(): void {
        console.log("Wallet widget clicked.");
    }

    onCartWidgetClicked(): void {
        console.log("Cart widget clicked.");
    }

    onLogoutClicked(): void {
        this.authService.logout();
    }
}
