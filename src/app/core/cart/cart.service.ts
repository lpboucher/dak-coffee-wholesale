import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { PricingTierService } from "@core/pricing/pricing-tier.service";

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartTotal$: BehaviorSubject<number> = new BehaviorSubject(0);
    private cartWeight$: BehaviorSubject<number> = new BehaviorSubject(0);

    get currentCartTotal$(): Observable<number> {
        return this.cartTotal$.asObservable();
    }

    get currentCartWeight$(): Observable<number> {
        return this.cartWeight$.asObservable();
    }

    constructor(private pricingTierService: PricingTierService) {}

    addingItem(item: any) {
        console.log(`Adding: ${ item }`);
    }

    addedItem(item: any) {
        console.log(`Added: ${ item }`);
    }

    updatedItem(item: any) {
        console.log(`Updated: ${ item }`);
    }

    removedItem(item: any) {
        console.log(`Removed: ${ item }`);
    }

    orderCompleted(cart: any) {
        console.log(`Order completed: ${ cart }`);
    }

    updateCart(total: number, items: any): void {
        this.updateCartTotal(total);
        this.updateCartWeight(items);
        this.updatePricingService();
    }

    private updateCartTotal(total: number): void {
        this.cartTotal$.next(total);
    }

    private updateCartWeight(items: any): void {
        const newWeight = this.evaluateCartWeight(items);
        this.cartWeight$.next(newWeight);
    }

    private evaluateCartWeight(items: any): number {
        return items
            .filter((item: any) => item?.dimensions?.weight != null && item?.quantity != null)
            .reduce((sum: number, item: any) => sum + (item.dimensions.weight * item.quantity), 0);
    }

    private updatePricingService(): void {
        const itemsInCart = (window as any).Snipcart.store.getState().cart.items.count;
        this.pricingTierService.updateDiscount(itemsInCart);
    }
}
