import { ChangeDetectorRef, Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";

import { AuthService } from "@core/authentication/authentication.service";
import { CartService } from "@core/cart/cart.service";
import { PricingTierService } from "@core/pricing/pricing-tier.service";
import { ModalService } from "@core/views/modal.service";
import { WalletModalComponent } from "@shared/components/wallet-modal/wallet-modal.component";

import { NAVIGATION } from "@utils/constants/navigation";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit, OnDestroy {
    protected subscriptions: Subscription = new Subscription();
    navigation = NAVIGATION;
    openLabel = "";
    priceTierActive = false;

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
        private modalService: ModalService<WalletModalComponent>,
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
