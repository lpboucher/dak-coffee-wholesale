import { Component } from "@angular/core";
import { Observable } from "rxjs";

import { CartService } from "@core/cart/cart.service";

@Component({
    selector: "app-cart-widget",
    templateUrl: "./cart-widget.component.html",
    styleUrls: ["./cart-widget.component.scss"]
})
export class CartWidgetComponent {
    get cartTotal(): Observable<number> {
        return this.cartService.currentCartTotal$;
    }

    get cartWeight(): Observable<number> {
        return this.cartService.currentCartWeight$;
    }

    constructor(private cartService: CartService) { }

    onCartWidgetClick(): void {
        this.cartService.openCart();
    }
}
