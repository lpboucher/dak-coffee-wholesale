import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { PricingTierService } from "@core/pricing/pricing-tier.service";
import { ShippingApiService } from "../shipping/shipping.service";
import { AlertService } from "@core/alerts/alert.service";

import { WeightPipe } from "@shared/pipes/weight.pipe";
import { PercentStringPipe } from "@shared/pipes/percent-string.pipe";

import { CART_WEIGHT_THRESHOLD } from "@utils/constants/discounts";

@Injectable({
    providedIn: "root"
})
export class CartService {
    private hasPerformedInitialUpdate = false;
    private isPerformingManualUpdates$ = new BehaviorSubject(false);
    private cartTotal$: BehaviorSubject<number> = new BehaviorSubject(0);
    private cartWeight$: BehaviorSubject<number> = new BehaviorSubject(0);

    get snipcart(): any {
        return (window as any).Snipcart;
    }

    get snipcartCart(): any {
        const { cart } = this.snipcart.store.getState();
        return cart;
    }

    get snipcartCartTotal(): any {
        return this.snipcartCart.total;
    }

    get snipcartCartItems(): any {
        return this.snipcartCart.items.items;
    }

    get currentCartTotal$(): Observable<number> {
        return this.cartTotal$.asObservable();
    }

    get currentCartWeight$(): Observable<number> {
        return this.cartWeight$.asObservable();
    }

    get currentCartWeightValue(): number {
        return this.cartWeight$.value;
    }

    constructor(
        private pricingTierService: PricingTierService,
        private shippingService: ShippingApiService,
        private alertService: AlertService,
        private weightPipe: WeightPipe,
        private percentStringPipe: PercentStringPipe,
    ) {}

    toggleManualUpdates(value?: boolean): void {
        const newValue = value ?? !this.isPerformingManualUpdates$.value;
        this.isPerformingManualUpdates$.next(newValue);
    }

    applyDiscount(code: string): void {
        if (this.discountExists(code)) {
            this.removeDiscount(code, true);
        } else {
            this.addDiscount(code);
        }
    }

    addDiscount(code: string): void {
        this.snipcart.api.cart.applyDiscount(code)
            .then(({result}: any) => {
                // this.alertService.success(`Applied wallet discount of ${result.discount.value} to cart`);
            })
            .catch((err: any) => {
                console.log(err);
            });
    }

    removeDiscount(code: string, readd: boolean = false): void {
        this.snipcart.api.cart.removeDiscount(code)
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
        this.snipcart.api.theme.cart.open();
    }

    closeCart(): void {
        this.snipcart.api.theme.cart.close();
    }

    /*addToCart(product: Product, quantity?: number, customFields?: SelectedProductAttribute[]): void {
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

        this.snipcart.api.cart.items.add({
            id,
            name,
            price,
            url,
            quantity: quantity ?? 1,
            minQuantity: 1,
            customFields,
        }).then(() => {
            if (this.isCheckoutAllowed() === false) {
                this.closeCart();
            }
        });

        if ((window as any).Snipcart.store.getState().cart.discounts.items.length > 0) {
            (window as any).Snipcart.store.getState().cart.discounts.items.forEach((oneDiscount: any) => {
                this.removeDiscount(oneDiscount.code);
            });
        }
    }*/

    addingItem(item: any) {
    }

    addedItem(item: any) {
        this.updateCartMeta();

        if (this.isCheckoutAllowed() === false) {
            this.closeCart();
        }
    }

    updatedItem(item: any) {
        this.updateCartMeta();

        if (this.isCheckoutAllowed() === false) {
            this.closeCart();
        }
    }

    removedItem(item: any) {
        this.updateCartMeta();

        if (this.isCheckoutAllowed() === false) {
            this.closeCart();
        }
    }

    orderCompleted(cart: any) {
        this.pricingTierService.updateCustomerWallet(cart.email, cart.subtotal)
            .subscribe(({updated}) => {
                if (updated) {
                    this.alertService.success(
                        "Your wallet has been updated, the discount will be applied automatically on your next order!"
                    );
                }
            });

        this.shippingService.createShippingParcel(cart.shippingAddress, cart.email, cart.invoiceNumber, cart.items.items).subscribe();
    }

    updateCartMeta(total?: number, items?: any): void {
        let newCartWeight;
        let cartTotal;

        if (this.hasPerformedInitialUpdate === false) {
            newCartWeight = this.evaluateCartWeight(items);
            cartTotal = total;
            this.hasPerformedInitialUpdate = true;
        } else {
            newCartWeight = this.evaluateCartWeight(this.snipcartCartItems);
            cartTotal = this.snipcartCartTotal;
        }

        this.updateCartTotal(cartTotal);
        this.updateCartWeight(newCartWeight);
    }

    /*updateCartPricing(): void {
        const cartWeight = this.cartWeight$.value;

        if (this.pricingTierService.isPricingUpdateRequired(cartWeight) === true) {
            this.pricingTierService.updateDiscount(cartWeight);
            this.updateItemsPricingDiscount(this.snipcartCartItems).then(() => console.log("updated discounts"));
        }
    }*/

    isCheckoutAllowed(): boolean {
        return this.evaluateCartWeight(this.snipcartCartItems) >= CART_WEIGHT_THRESHOLD;
    }

    /*async updateItemsPricingDiscount(items: any): Promise<void> {
        await this.setItemsDiscount(items, this.pricingTierService.isDiscountActive).then(() => console.log("updated"));
        setTimeout(() => this.toggleManualUpdates(false), 1200);
    }*/

    private updateCartTotal(total: number): void {
        this.cartTotal$.next(total);
    }

    private updateCartWeight(weight: number): void {
        this.cartWeight$.next(weight);
    }

    private evaluateCartWeight(items: any): number {
        return items.reduce((sum: number, item: any) => sum + (item.quantity * this.getSnipcartItemWeight(item)), 0);
    }

    private getSnipcartItemWeight(item: any): number {
        const weightField = item.customFields.find((field: any) => field.name.toLowerCase() === "weight".toLowerCase());
        return weightField ? this.weightPipe.transform(weightField.value) : 0;
    }

    /*private async setItemsDiscount(items: any, hasDiscount = false): Promise<void> {
        const newDiscount = hasDiscount ? LARGE_VOLUME_DISCOUNT : NO_VOLUME_DISCOUNT;

        const updatePromises = items.map((oneItem: any) => {
            return this.setItemDiscount(oneItem, newDiscount);
        });

        await Promise.all(updatePromises);
    }*/

    /*private async setItemDiscount(item: any, newDiscount: number): Promise<void> {
        const volumeWeightField = item.customFields.find((oneField: any) => oneField.name === "volume-weight-discount");
        const volumeDiscountField = item.customFields.find((oneField: any) => oneField.name === "volume-discount");

        if (volumeWeightField != null) {
            const otherCustomFields = item.customFields.filter((oneField: any) => oneField.name !== "volume-weight-discount");
            const weightCustomField = item.customFields.find((oneField: any) => oneField.name === "weight");

            return (window as any).Snipcart.api.cart.items.update({
                uniqueId: item.uniqueId,
                customFields: [
                    ...otherCustomFields,
                    {
                        ...volumeWeightField,
                        value: `${weightCustomField.value}/${this.percentStringPipe.transform(newDiscount)}`,
                    },
                ],
            });
        } else {
            const otherCustomFields = item.customFields.filter((oneField: any) => oneField.name !== "volume-discount");

            return (window as any).Snipcart.api.cart.items.update({
                uniqueId: item.uniqueId,
                customFields: [
                    ...otherCustomFields,
                    {
                        ...volumeDiscountField,
                        value: this.percentStringPipe.transform(newDiscount),
                    },
                ],
            });
        }
    }*/

    private discountExists(code: string): any {
        const activeDiscounts = (window as any).Snipcart.store.getState().cart.discounts.items;
        return activeDiscounts.some((oneDiscount: any) => oneDiscount.code === code);
    }
}
