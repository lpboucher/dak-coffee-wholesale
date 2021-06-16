import { Component, Input, OnInit } from "@angular/core";

import { CloudinaryImage } from "@cloudinary/base";

import { Product } from "@shared/models/classes/product.class";

@Component({
    selector: "app-product-card",
    templateUrl: "./product-card.component.html",
    styleUrls: ["./product-card.component.scss"]
})
export class ProductCardComponent implements OnInit {
    @Input() product!: Product;

    get imageUrl(): string {
        const url = `/Products/Thumbs/${ this.product.images.thumb }`;
        const cloudName = { cloudName: "dak-coffee-roasters" };

        return new CloudinaryImage(url, cloudName).toURL();
    }

    constructor() { }

    ngOnInit(): void {
    }
}
