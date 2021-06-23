import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";

import { PricingTierService } from "@core/pricing/pricing-tier.service";

@Injectable({
    providedIn: 'root'
})
export class CartService implements OnDestroy {
    private subscriptions: Subscription = new Subscription();
    private cartTotal$: BehaviorSubject<number> = new BehaviorSubject(0);
    private cartWeight$: BehaviorSubject<number> = new BehaviorSubject(0);

    get currentCartTotal$(): Observable<number> {
        return this.cartTotal$.asObservable();
    }

    get currentCartWeight$(): Observable<number> {
        return this.cartWeight$.asObservable();
    }

    constructor(private pricingTierService: PricingTierService) {}

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    addingItem(item: any) {
        this.update();
        console.log(`Adding: ${ item }`);
    }

    addedItem(item: any) {
        this.update();
        console.log(`Added: ${ item }`);
    }

    updatedItem(item: any) {
        this.update();
        console.log(`Updated: ${ item }`);
    }

    removedItem(item: any) {
        this.update();
        console.log(`Removed: ${ item }`);
    }

    orderCompleted(cart: any) {
        this.update();
        console.log(`Order completed: ${ cart }`);
    }

    update(): void {
        this.updateCart();
        this.updatePricingService();
    }

    private updateCart(): void {
        setTimeout(() => {
            this.updateCartTotal();
            this.updateCartWeight();
        });
    }

    private updateCartTotal(): void {
        const newTotal = (window as any).Snipcart.store.getState().cart.total;
        this.cartTotal$.next(newTotal);
    }

    private updateCartWeight(): void {
        this.cartWeight$.next(this.evaluateCartWeight());
    }

    private evaluateCartWeight(): number {
        const cartItems = (window as any).Snipcart.store.getState().cart.items.items;
        return cartItems
            .filter((item: any) => item?.dimensions?.weight != null && item?.quantity != null)
            .reduce((sum: number, item: any) => sum + (item.dimensions.weight * item.quantity), 0);
    }

    private updatePricingService(): void {
        const itemsInCart = (window as any).Snipcart.store.getState().cart.items.count;
        this.pricingTierService.updateDiscount(itemsInCart);
    }
}
