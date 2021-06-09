import { Component, OnInit } from "@angular/core";
import { CartService } from "@core/cart/cart.service";
import { Observable } from "rxjs";

@Component({
    selector: "app-cart-widget",
    templateUrl: "./cart-widget.component.html",
    styleUrls: ["./cart-widget.component.scss"]
})
export class CartWidgetComponent implements OnInit {
    cartTotal$: Observable<number>;

    constructor(private cartService: CartService) {
        this.cartTotal$ = this.cartService.currentCartTotal$;
    }

    ngOnInit(): void {
    }

    get cartWeight$(): Observable<number> {
        return this.cartService.cartWeight$;
    }
}
