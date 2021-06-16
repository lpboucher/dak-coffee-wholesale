import { Component, OnInit, Input } from "@angular/core";

import { CloudinaryImage } from "@cloudinary/base";

import { Product } from "@shared/models/classes/product.class";

@Component({
    selector: "app-featured-product-card",
    templateUrl: "./featured-product-card.component.html",
    styleUrls: ["./featured-product-card.component.scss"]
})
export class FeaturedProductCardComponent implements OnInit {
    @Input() product!: Product;

    get imageUrl(): string {
        const url = `/Products/Thumbs/${ this.product.images.thumb }`;
        const cloudName = { cloudName: "dak-coffee-roasters" };

        return new CloudinaryImage(url, cloudName).toURL();
    }

    constructor() { }

    ngOnInit(): void {
    }

    onClick(): void {
        console.log(this.product);
    }
}
