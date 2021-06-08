import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class CartService {
    private snipcart: any = (window as any).Snipcart;

    get cartTotal(): number {
        return this.snipcart.store.getState().cart.total;
    }

    constructor() { }
}
