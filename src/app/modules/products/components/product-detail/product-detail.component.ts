import { Component, OnInit, Input } from "@angular/core";

import { Cloudinary } from "@cloudinary/base";

import { Product } from "@shared/models/classes/product.class";

@Component({
    selector: "app-product-detail",
    templateUrl: "./product-detail.component.html",
    styleUrls: ["./product-detail.component.scss"]
})
export class ProductDetailComponent implements OnInit {
    @Input() product!: Product;

    get imageUrl(): string {
        const cloud = new Cloudinary({
            cloud: {
                cloudName: "dak-coffee-roasters"
            }
        });

        return cloud.image(`/Products/Mains/${ this.product.images.main }`).toURL();
    }

    constructor() { }

    ngOnInit(): void {
    }
}
