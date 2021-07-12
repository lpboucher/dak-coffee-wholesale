import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { PricingTierService } from "@core/pricing/pricing-tier.service";

import { WeightPipe } from "@shared/pipes/weight.pipe";

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

    constructor(
        private pricingTierService: PricingTierService,
        private weightPipe: WeightPipe
    ) {}

    openCart(): void {
        (window as any).Snipcart.api.theme.cart.open();
    }

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
            .map((item: any) => item.quantity * this.getSnipcartItemWeight(item))
            .reduce((sum: number, weight: number) => sum + weight, 0);
    }

    private getSnipcartItemWeight(item: any): number {
        let weightField = item.customFields.find((field: any) => field.name == "Weight");
        return weightField?.value != null ? this.weightPipe.transform(weightField.value) : 0;
    }

    private updatePricingService(): void {
        this.pricingTierService.updateDiscount(this.cartWeight$.value);
    }
}
