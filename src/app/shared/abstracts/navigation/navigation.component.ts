import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";

import { AuthService } from "@core/authentication/authentication.service";
import { CartService } from "@core/cart/cart.service";
import { PricingTierService } from "@core/pricing/pricing-tier.service";
import { ModalService } from "@core/views/modal.service";

import { WalletModalComponent } from "@shared/components/modals";
import { VolumeRequiredModalComponent } from "@shared/components/modals";

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
    walletAmount: number = 0;

    constructor(
        protected pricingTierService: PricingTierService,
        protected changeDetectorRef: ChangeDetectorRef,
        protected cartService: CartService,
        protected modalService: ModalService<WalletModalComponent | VolumeRequiredModalComponent>,
        protected authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.subscriptions.add(this.pricingTierService.isDiscountActive$
            .subscribe((value) => {
                this.priceTierActive = value;
                this.cartService.updateItemsPricingDiscount((window as any).Snipcart.store.getState().cart.items.items)
                    .then(() => {
                        this.changeDetectorRef.detectChanges();
                });
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

        this.subscriptions.add(this.pricingTierService.walletAmount$
            .subscribe((value) => {
                this.walletAmount = value;
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
        if (this.cartService.isCheckoutAllowed() === true) {
            this.cartService.openCart();
        } else {
            this.modalService.open(VolumeRequiredModalComponent);
        }
    }

    onLogoutClicked(): void {
        this.authService.logout();
    }
}
