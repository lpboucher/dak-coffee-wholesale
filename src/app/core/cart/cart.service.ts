import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { PricingTierService } from "@core/pricing/pricing-tier.service";
import { AlertService } from "@core/alerts/alert.service";

import { WeightPipe } from "@shared/pipes/weight.pipe";
import { Product } from "@shared/models/classes/product.class";
import { SelectedProductAttribute } from "@shared/models/classes/product-attribute.class";

const DISCOUNT_CODE = "WALLET-ORDER-121";

@Injectable({
    providedIn: "root"
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

    addToCart(product: Product, quantity?: number, customFields?: SelectedProductAttribute[]): void {
        const { id, name, price } = product;
        const url = `http://9d28-2a02-a210-2504-5c80-9901-9724-fcfd-e502.ngrok.io/snipcartParser`;

        (window as any).Snipcart.api.cart.items.add({
            id,
            name,
            price,
            url,
            quantity: quantity ?? 1,
            minQuantity: 1,
            customFields,
        });
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
        this.pricingTierService.updateCustomerWallet(cart.email, cart.total)
            .subscribe(({updated}) => {
                if (updated) {
                    this.alertService.success(
                        "Your wallet has been updated, the discount will be applied automatically on your next order!"
                    );
                }
            });
    }

    updateCart(total: number, items: any): void {
        // TODO loop through items and make sure all items include same volume discount
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
        const weightField = item.customFields.find((field: any) => field.name.toLowerCase() === "weight".toLowerCase());
        return weightField ? this.weightPipe.transform(weightField.value) : 0;
    }

    private updatePricingService(): void {
        this.pricingTierService.updateDiscount(this.cartWeight$.value);
    }
}
