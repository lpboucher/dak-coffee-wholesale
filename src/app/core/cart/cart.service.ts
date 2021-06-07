import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private snipcart: any = (window as any).Snipcart;

    constructor() { }

    get cartTotal(): number {
        return this.snipcart.store.getState().cart.total;
    }

    get cartWeight(): number {
        const cartItems = this.snipcart.store.getState().cart.items.items;
        return cartItems.reduce((sum: number, item: any) => sum + (item.dimensions.weight * item.quantity), 0);
    }
}
