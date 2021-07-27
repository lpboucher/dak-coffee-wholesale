import { Directive, ElementRef, Input, OnChanges, OnInit } from "@angular/core";

import { Product } from "@shared/models/classes/product.class";
import { CustomOption } from "@shared/models/types/custom-option.interface";

@Directive({
    selector: "[snipcartAdd]"
})
export class SnipcartAddDirective implements OnInit, OnChanges {
    @Input("snipcartAdd") product!: Product;
    @Input() modifiers: CustomOption[] = [];
    @Input() quantity: number = 1;

    constructor(private el: ElementRef) {}

    ngOnInit(): void {
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
        this.modifiers.forEach((option, index) => {
            const basename = `data-item-custom${ index + 1 }`;
            const optionList = this.rawListToSnipcartList(option.list);

            this.el.nativeElement.setAttribute(basename + "-name", option.name);
            this.el.nativeElement.setAttribute(basename + "-options", optionList);
            this.el.nativeElement.setAttribute(basename + "-value", option.selection);
        });
    }

    private rawListToSnipcartList(raw: string[]): string {
        return raw.reduce((prev, curr) => prev + "|" + curr);
    }
}
