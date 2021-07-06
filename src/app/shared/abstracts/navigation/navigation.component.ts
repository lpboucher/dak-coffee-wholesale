import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { AuthService } from "@core/authentication/authentication.service";
import { CartService } from "@core/cart/cart.service";
import { PricingTierService } from "@core/pricing/pricing-tier.service";
import { ModalService } from "@core/views/modal.service";

import { WalletModalComponent } from "@shared/components/modals";

@Component({
    selector: "app-navigation",
    template: "",
    styles: [""]
})
export abstract class NavigationComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription = new Subscription();
    priceTierActive: boolean = false;
    cartTotal: number = 0;
    cartWeight: number = 0;

    constructor(
        protected pricingTierService: PricingTierService,
        protected changeDetectorRef: ChangeDetectorRef,
        protected cartService: CartService,
        protected modalService: ModalService<WalletModalComponent>,
        protected authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.subscriptions.add(this.pricingTierService.isDiscountActive$
            .subscribe((value) => {
                this.priceTierActive = value;
                this.changeDetectorRef.detectChanges();
            })
        );

        this.subscriptions.add(this.cartService.currentCartTotal$
            .subscribe((value) => {
                this.cartTotal = value;
                this.changeDetectorRef.detectChanges();
            })
        );

        this.subscriptions.add(this.cartService.currentCartWeight$
            .subscribe((value) => {
                this.cartWeight = value;
                this.changeDetectorRef.detectChanges();
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    onWalletWidgetClicked(): void {
        this.modalService.open(WalletModalComponent);
    }

    onCartWidgetClicked(): void {
        this.cartService.openCart();
    }

    onLogoutClicked(): void {
        this.authService.logout();
    }
}
