import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private snipcart: any = (window as any).Snipcart;
    private _userToken?: string = undefined;

    constructor() {
        // TODO: not waiting on the `document.snipcart.ready` event is a race condition
        this.checkForOldCart();
        this.watchForNewCarts();
    }

    get cartTotal(): number {
        if (this._userToken == undefined) { return 0; }

        return this.snipcart.store.getState().cart.total;
    }

    private checkForOldCart(): void {
        this.snipcart.events.on("snipcart.initialized", (snipcartState: any) => {
            if (snipcartState?.cart?.token == null) { return; }

            console.log("Using cart from previous session.")
            this.userToken = snipcartState.cart.token;
        });
    }

    private watchForNewCarts(): void {
        this.snipcart.events.on("cart.created", (cartState: any) => {
            if (cartState?.token == null) { return; }

            console.log("New cart created.");
            this.userToken = cartState.token;
        });
    }

    private set userToken(token: string) {
        if (this._userToken != undefined) {
            console.log(`Replacing old cart token: ${ this._userToken }`);
        }

        this._userToken = token;
        console.log(`Cart token: ${ this._userToken }`);
    }
}
