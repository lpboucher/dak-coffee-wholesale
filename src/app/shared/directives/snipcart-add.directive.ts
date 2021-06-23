import { Directive, ElementRef, Input, OnInit } from "@angular/core";

import { Product } from "@shared/models/classes/product.class";

@Directive({
    selector: "[snipcartAdd]"
})
export class SnipcartAddDirective implements OnInit {
    @Input() snipcartAdd!: Product;

    constructor(private el: ElementRef) {}

    ngOnInit(): void {
        this.el.nativeElement.className += " snipcart-add-item";

        const { id, productType, slug, name, price } = this.snipcartAdd;
        const url = `/products/${ productType }/${ slug }`;

        this.el.nativeElement.setAttribute("data-item-id", id);
        this.el.nativeElement.setAttribute("data-item-url", url);
        this.el.nativeElement.setAttribute("data-item-name", name);
        this.el.nativeElement.setAttribute("data-item-price", price);
    }
}
