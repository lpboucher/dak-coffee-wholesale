import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { PricingTierService } from "@core/pricing/pricing-tier.service";
import { AlertService } from "@core/alerts/alert.service";

import { WeightPipe } from "@shared/pipes/weight.pipe";


const DISCOUNT_CODE = "WALLET-ORDER-121";


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
        private alertService: AlertService,
        private weightPipe: WeightPipe,
    ) {}

    applyDiscount(code?: string): void {
        (window as any).Snipcart.api.cart.applyDiscount(code ?? DISCOUNT_CODE)
            .then(({result}: any) => {
                this.alertService.success(`Applied wallet discount of ${result.discount.value} to cart`);
            })
            .catch((err: any) => {
                console.log(err);
            });
    }

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
        return items.reduce((sum: number, item: any) => sum + (item.quantity * this.getSnipcartItemWeight(item)), 0);
    }

    private getSnipcartItemWeight(item: any): number {
        const weightField = item.customFields.find((field: any) => field.name === "Weight");
        return weightField ? this.weightPipe.transform(weightField.value) : 0;
    }

    private updatePricingService(): void {
        this.pricingTierService.updateDiscount(this.cartWeight$.value);
    }
}
