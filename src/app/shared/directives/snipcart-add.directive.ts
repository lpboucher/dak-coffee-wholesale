import { Directive, HostListener, Input } from "@angular/core";
import { CartService } from "@app/core/cart/cart.service";

import { Product } from "@shared/models/classes/product.class";
import { SelectedProductAttribute } from "@app/shared/models/classes/product-attribute.class";

@Directive({
    selector: "[snipcartAdd]"
})
export class SnipcartAddDirective {
    @Input("snipcartAdd") product!: Product;
    @Input() modifiers: SelectedProductAttribute[] = [];
    @Input() quantity: number = 1;

    constructor(private cartService: CartService) {}

    @HostListener("click", ["$event"])
    onClick(event: Event): void {
        event.stopPropagation();

        this.cartService.addToCart(this.product, this.quantity, this.modifiers);
    }
}
