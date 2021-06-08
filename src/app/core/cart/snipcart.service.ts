import { Injectable } from "@angular/core";

import { CartService } from "@core/cart/cart.service";
import { SnipcartEventType } from "@shared/models/types/snipcart-events.type";

@Injectable({
    providedIn: "root"
})
export class SnipcartService {

    constructor(private cartService: CartService) {}

    addItemAddingListener(): () => {} {
        return this.registerSnipcartEvent("item.adding", (cartItem: any) => this.cartService.addItem(cartItem));
    }

    private registerSnipcartEvent(eventName: SnipcartEventType, callback: (param: any) => void): () => {} {
        return (window as any).Snipcart.events.on(eventName, (param: any) => callback(param));
    }
}
