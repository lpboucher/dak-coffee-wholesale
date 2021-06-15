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

        this.el.nativeElement.setAttribute("data-item-id", `${ this.snipcartAdd.id }`);
        this.el.nativeElement.setAttribute("data-item-url", `/products/${ this.snipcartAdd.productType }/${ this.snipcartAdd.slug }`);
        this.el.nativeElement.setAttribute("data-item-name", `${ this.snipcartAdd.name }`);
        this.el.nativeElement.setAttribute("data-item-price", `${ this.snipcartAdd.price }`);
    }
}
