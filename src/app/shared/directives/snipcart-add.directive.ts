import { Directive, ElementRef, Input, OnChanges, OnInit } from "@angular/core";

import { environment as config } from "@env";

import { Product } from "@shared/models/classes/product.class";
import { CartModifierPipe } from "@shared/pipes/cart-modifier.pipe";

@Directive({
    selector: "[snipcartAdd]"
})
export class SnipcartAddDirective implements OnInit, OnChanges {
    @Input("snipcartAdd") product!: Product;
    @Input() quantity: number = 1;
    @Input() selection: any;

    constructor(
        private el: ElementRef,
        private cartModifierPipe: CartModifierPipe,
    ) {}

    ngOnInit(): void {
        this.el.nativeElement.className += " snipcart-add-item";

        const { id, name, price } = this.product;

        const url = `${config.backendURL}wholesale/snipcartParser`;

        this.el.nativeElement.setAttribute("data-item-id", id);
        this.el.nativeElement.setAttribute("data-item-url", url);
        this.el.nativeElement.setAttribute("data-item-name", name);
        this.el.nativeElement.setAttribute("data-item-price", price);
        this.el.nativeElement.setAttribute("data-item-min-quantity", 1);
        this.setCustomAttributes();
    }

    ngOnChanges(): void {
        this.setChangingAttributes();
    }

    private setChangingAttributes(): void {
        this.el.nativeElement.setAttribute("data-item-quantity", this.quantity);
        this.setCustomAttributes();
    }

    private setCustomAttributes(): void {
        this.product.attributes
            .forEach(
                (modifier, index) => {
                    const basename = `data-item-custom${ index + 1}`;
                    const attributeOptions = this.cartModifierPipe.transform(modifier);

                    this.el.nativeElement.setAttribute(basename + "-name", modifier.name);
                    this.el.nativeElement.setAttribute(basename + "-options", attributeOptions);
                    this.el.nativeElement.setAttribute(basename + "-value", this.selection[modifier.name!]);
                }
            );
    }
}
