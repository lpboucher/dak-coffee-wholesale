import { Component, Input, OnInit } from "@angular/core";

import { Cloudinary } from "@cloudinary/base";

import { Product } from "@shared/models/classes/product.class";

@Component({
    selector: "app-product-card",
    templateUrl: "./product-card.component.html",
    styleUrls: ["./product-card.component.scss"]
})
export class ProductCardComponent implements OnInit {
    @Input() product!: Product;

    get imageUrl(): string {
        const cloud = new Cloudinary({
            cloud: {
                cloudName: "dak-coffee-roasters"
            }
        });

        return cloud.image(`/Products/Thumbs/${ this.product.images.thumb }`).toURL();
    }

    constructor() { }

    ngOnInit(): void {
    }
}
