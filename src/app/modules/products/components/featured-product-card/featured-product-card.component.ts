import { Component, OnInit, Input } from "@angular/core";

import { Product } from "@shared/models/classes/product.class";

@Component({
    selector: "app-featured-product-card",
    templateUrl: "./featured-product-card.component.html",
    styleUrls: ["./featured-product-card.component.scss"]
})
export class FeaturedProductCardComponent implements OnInit {
    @Input() product!: Product;

    constructor() { }

    ngOnInit(): void {
    }

    onClick(): void {
        console.log(this.product);
    }
}
