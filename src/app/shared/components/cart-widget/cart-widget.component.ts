import { Component, OnInit } from "@angular/core";
import { CartService } from "@core/cart/cart.service";
import { Observable } from "rxjs";

@Component({
    selector: "app-cart-widget",
    templateUrl: "./cart-widget.component.html",
    styleUrls: ["./cart-widget.component.scss"]
})
export class CartWidgetComponent implements OnInit {
    cartTotal$: Observable<number> = new Observable();
    cartWeight$: Observable<number> = new Observable();

    constructor(private cartService: CartService) {}

    ngOnInit(): void {
        this.cartTotal$ = this.cartService.currentCartTotal$;
        this.cartWeight$ = this.cartService.currentCartWeight$;
    }
}
