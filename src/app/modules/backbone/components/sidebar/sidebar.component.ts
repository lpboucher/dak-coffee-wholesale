import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";

import { AuthService } from "@core/authentication/authentication.service";

import { NAVIGATION } from "@app/utils/constants/navigation";
import { PricingTierService } from "@app/core/pricing/pricing-tier.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit, OnDestroy {
    navigation = NAVIGATION;
    openLabel = "";
    priceTierActive = false;
    private subscriptions: Subscription = new Subscription();

    constructor(
        private authService: AuthService,
        private pricingTierService: PricingTierService,
        private changeDetectorRef: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        this.subscriptions.add(
            this.pricingTierService.isDiscountActive$.subscribe(value => {
                this.priceTierActive = value;
                this.changeDetectorRef.detectChanges();
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    onPricingToggled(value: boolean): void {
        this.pricingTierService.toggleDiscount(value);
    }

    onLogoutClicked(): void {
        this.authService.logout();
    }
}
