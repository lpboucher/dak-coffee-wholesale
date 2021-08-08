import { Directive, ElementRef, Input, OnChanges, OnInit } from "@angular/core";

import { Product } from "@shared/models/classes/product.class";
import { CartModifier } from "@shared/models/types/cart-modifier.interface";
import { PriceModifierPipe } from "@app/shared/pipes/price-modifier.pipe";

@Directive({
    selector: "[snipcartAdd]"
})
export class SnipcartAddDirective implements OnInit, OnChanges {
    @Input("snipcartAdd") product!: Product;
    @Input() modifiers: CartModifier[] = [];
    @Input() quantity: number = 1;

    constructor(
        private el: ElementRef,
        private priceModifierPipe: PriceModifierPipe,
    ) {}

    ngOnInit(): void {
        this.el.nativeElement.className += " snipcart-add-item";

        const { id, productType, slug, name, price } = this.product;
        const url = `/products/${ productType }/${ slug }`;

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
        this.modifiers
            .forEach(
                (modifier, index) => {
                    const basename = `data-item-custom${ index + 1}`;
                    const attributeOptions = this.priceModifierPipe.transform(modifier.attribute.options);

                    this.el.nativeElement.setAttribute(basename + "-name", modifier.attribute.name);
                    this.el.nativeElement.setAttribute(basename + "-options", attributeOptions);
                    this.el.nativeElement.setAttribute(basename + "-value", modifier.selection);
                }
            )
    }
}
