import { Component, OnInit, Input } from "@angular/core";

import { Cloudinary } from "@cloudinary/base";

import { Product } from "@shared/models/classes/product.class";

@Component({
    selector: "app-featured-product-card",
    templateUrl: "./featured-product-card.component.html",
    styleUrls: ["./featured-product-card.component.scss"]
})
export class FeaturedProductCardComponent implements OnInit {
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

    onClick(): void {
        console.log(this.product);
    }
}
