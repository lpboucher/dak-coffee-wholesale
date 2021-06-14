import { Directive, ElementRef, Input, OnInit } from "@angular/core";

import { Product } from "@shared/models/classes/product.class";

@Directive({
    selector: "[appSnipcartAdd]"
})
export class SnipcartAddDirective implements OnInit {
    @Input() appSnipcartAdd!: Product;

    constructor(private el: ElementRef) {}

    ngOnInit(): void {
        this.el.nativeElement.className += " snipcart-add-item";

        this.el.nativeElement.setAttribute("data-item-id", `${ this.appSnipcartAdd.id }`);
        this.el.nativeElement.setAttribute("data-item-url", `/products/${ this.appSnipcartAdd.productType }/${ this.appSnipcartAdd.slug }`);
        this.el.nativeElement.setAttribute("data-item-name", `${ this.appSnipcartAdd.name }`);
        this.el.nativeElement.setAttribute("data-item-price", `${ this.appSnipcartAdd.price }`);
    }
}
