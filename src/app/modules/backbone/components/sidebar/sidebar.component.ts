import { ChangeDetectorRef, Component, OnInit, OnDestroy, Input, Output, EventEmitter } from "@angular/core";
import { Subscription } from "rxjs";

import { AuthService } from "@core/authentication/authentication.service";
import { PricingTierService } from "@core/pricing/pricing-tier.service";

import { NAVIGATION } from "@utils/constants/navigation";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit, OnDestroy {
    protected subscriptions: Subscription = new Subscription();
    @Input() open: boolean = false;
    @Output() openChange = new EventEmitter<boolean>();
    navigation = NAVIGATION;
    openLabel = "";
    priceTierActive = false;

    constructor(
        private authService: AuthService,
        private pricingTierService: PricingTierService,
        private changeDetectorRef: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        this.subscriptions.add(this.pricingTierService.isDiscountActive$
            .subscribe((value) => {
                this.priceTierActive = value;
                this.changeDetectorRef.detectChanges();
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    onMobileCloseClicked(): void {
        this.open = false;
        this.openChange.emit(this.open);
    }

    onPricingToggled(value: boolean): void {
        this.pricingTierService.toggleDiscount(value);
    }

    onLogoutClicked(): void {
        this.authService.logout();
    }
}
