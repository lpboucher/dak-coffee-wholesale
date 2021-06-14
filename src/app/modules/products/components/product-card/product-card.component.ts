import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

import { Product } from "@shared/models/classes/product.class";

@Component({
    selector: "app-product-card",
    templateUrl: "./product-card.component.html",
    styleUrls: ["./product-card.component.scss"]
})
export class ProductCardComponent implements OnInit {
    @ViewChild("addToCartButton") addToCartButton!: ElementRef;
    @Input() product!: Product;

    constructor(private router: Router) { }

    ngOnInit(): void {
    }

    onClick(event: Event): void {
        const elementUnderClick = event.target as HTMLElement;
        const addToCartButtonElement = this.addToCartButton.nativeElement as HTMLElement;
        if (elementUnderClick == addToCartButtonElement) { return; }

        this.router.navigate(["products", this.product.productType, this.product.slug]);
    }
}
