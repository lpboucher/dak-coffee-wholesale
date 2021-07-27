import { Directive, ElementRef, HostListener, Input, OnChanges, OnInit } from "@angular/core";
import { CartService } from "@app/core/cart/cart.service";

import { Product } from "@shared/models/classes/product.class";
import { CustomOption } from "@shared/models/types/custom-option.interface";
import { SnipcartCustomField } from "@shared/models/types/snipcart-custom-field.type";
import { CartModifier } from "../models/types/cart-modifier.interface";

@Directive({
    selector: "[snipcartAdd]"
})
export class SnipcartAddDirective {
    @Input("snipcartAdd") product!: Product;
    @Input() modifiers: CartModifier[] = [];
    @Input() quantity: number = 1;

    private get snipcartCustomFields(): SnipcartCustomField[] {
        return this.modifiers
            .map(mod => ({
                name: mod.name,
                options: mod.list.map(element => ({ name: element })),
                required: false,
                type: "dropdown",
                value: mod.selection,
            }));
    }

    constructor(private cartService: CartService) {}

    @HostListener("click", ["$event"])
    onClick(event: Event): void {
        event.stopPropagation();

        this.cartService.addToCart(this.product, this.quantity, this.snipcartCustomFields);
    }
}
