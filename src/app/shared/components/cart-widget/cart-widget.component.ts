import { Component, OnInit } from "@angular/core";
import { CartService } from "@core/cart/cart.service";
import { Observable } from "rxjs";

@Component({
    selector: "app-cart-widget",
    templateUrl: "./cart-widget.component.html",
    styleUrls: ["./cart-widget.component.scss"]
})
export class CartWidgetComponent implements OnInit {

    constructor(private cartService: CartService) { }

    ngOnInit(): void {
    }

    get cartTotal(): Observable<number> {
        return this.cartService.cartTotal$;
    }

    get cartWeight(): Observable<number> {
        return this.cartService.cartWeight$;
    }

    onClick(): void {
        console.log("Cart widget clicked.");
    }
}
