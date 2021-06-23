import { Injectable, OnDestroy } from "@angular/core";

import { CartService } from "@core/cart/cart.service";
import { SnipcartEventType } from "@shared/models/types/snipcart-events.type";
import { Subscription } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class SnipcartService implements OnDestroy {
    private subscriptions: Subscription = new Subscription();

    constructor(private cartService: CartService) {}

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    initialiseCartService(): void {
        const snipcart = (window as any).Snipcart;

        this.subscriptions.add(
            snipcart.store.subscribe(() => {
                const state = snipcart.store.getState();

                this.cartService.updateCart(
                    state.cart.total,
                    state.cart.items.items
                );
            })
        );
    }

    addItemAddingListener(): () => {} {
        return this.registerSnipcartEvent("item.adding", (cartItem: any) => this.cartService.addingItem(cartItem));
    }

    addItemAddedListener(): () => {} {
        return this.registerSnipcartEvent("item.added", (cartItem: any) => this.cartService.addedItem(cartItem));
    }

    addItemUpdatedListener(): () => {} {
        return this.registerSnipcartEvent("item.updated", (cartItem: any) => this.cartService.updatedItem(cartItem));
    }

    addItemRemovedListener(): () => {} {
        return this.registerSnipcartEvent("item.removed", (cartItem: any) => this.cartService.removedItem(cartItem));
    }

    addOrderCompletedListener(): () => {} {
        return this.registerSnipcartEvent("cart.confirmed", (cart: any) => this.cartService.orderCompleted(cart));
    }

    private registerSnipcartEvent(eventName: SnipcartEventType, callback: (param: any) => void): () => {} {
        return (window as any).Snipcart.events.on(eventName, (param: any) => callback(param));
    }
}
