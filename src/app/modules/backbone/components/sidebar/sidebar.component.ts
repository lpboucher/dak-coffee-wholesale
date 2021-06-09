import { Component, OnInit } from "@angular/core";

import { AuthService } from "@core/authentication/authentication.service";

import { NAVIGATION } from "@app/utils/constants/navigation";
import { PricingTierService } from "@app/core/pricing/pricing-tier.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
    navigation = NAVIGATION;
    openLabel = "";
    onPriceTierToggle: () => void;
    priceTierActive$: Observable<boolean>;

    constructor(
        private authService: AuthService,
        private pricingTierService: PricingTierService,
    ) {
        this.onPriceTierToggle = this.pricingTierService.toggleDiscount;
        this.priceTierActive$ = this.pricingTierService.isDiscountActive;
    }

    ngOnInit(): void {
    }

    onLogoutClicked(): void {
        this.authService.logout();
    }
}
