import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { environment as config } from "@env";

import { PricingTierService } from "@core/pricing/pricing-tier.service";
import { AlertService } from "@core/alerts/alert.service";

import { WeightPipe } from "@shared/pipes/weight.pipe";
import { Product } from "@shared/models/classes/product.class";
import { SelectedProductAttribute } from "@shared/models/classes/product-attribute.class";

import { NO_VOLUME_DISCOUNT, LARGE_VOLUME_DISCOUNT } from "@utils/constants/discounts";

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

    applyDiscount(code: string): void {
        if (this.discountExists(code)) {
            this.removeDiscount(code, true);
        } else {
            this.addDiscount(code);
        }
    }

    addDiscount(code: string): void {
        (window as any).Snipcart.api.cart.applyDiscount(code)
            .then(({result}: any) => {
                // this.alertService.success(`Applied wallet discount of ${result.discount.value} to cart`);
            })
            .catch((err: any) => {
                console.log(err);
            });
    }

    removeDiscount(code: string, readd: boolean = false): void {
        (window as any).Snipcart.api.cart.removeDiscount(code)
            .then((_: any) => {
                if (readd) {
                    this.addDiscount(code);
                }
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
        // const url = `https://cc7f-2a02-a210-2501-f600-4523-4716-e448-3fc5.ngrok.io/snipcartParser`;
        const url = `${config.backendURL}wholesale/snipcartParser`;

        console.log("adding", {
            id,
            name,
            price,
            url,
            quantity: quantity ?? 1,
            minQuantity: 1,
            customFields,
        });

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
        this.updateItemsPricingDiscount(items);
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

    private updateItemsPricingDiscount(items: any): void {
        console.log(items);
        // const haveSomeItems30Discount
        // const haveSomeItems45Discount
        /*if (this.pricingTierService.isDiscountActive === true) {

        }*/
    }

    private setItemsDiscount(items: any, hasDiscount = false): void {
        const newDiscount = hasDiscount ? LARGE_VOLUME_DISCOUNT : NO_VOLUME_DISCOUNT;
        console.log("new discount", newDiscount);
    }

    private discountExists(code: string): any {
        const activeDiscounts = (window as any).Snipcart.store.getState().cart.discounts.items;
        return activeDiscounts.some((oneDiscount: any) => oneDiscount.code === code);
    }
}
