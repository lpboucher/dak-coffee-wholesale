import { Injectable } from "@angular/core";

import { CartService } from "@core/cart/cart.service";
import { SnipcartEventType } from "@shared/models/types/snipcart-events.type";

@Injectable({
    providedIn: "root"
})
export class SnipcartService {

    constructor(private cartService: CartService) {}

    initialiseCartService(): () => {} {
        return this.registerSnipcartEvent("snipcart.initialized", (_) => this.cartService.update());
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
