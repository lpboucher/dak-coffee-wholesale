import { Component, OnInit, Input } from "@angular/core";

import { CloudinaryImage } from "@cloudinary/base";

import { Product } from "@shared/models/classes/product.class";

@Component({
    selector: "app-product-detail",
    templateUrl: "./product-detail.component.html",
    styleUrls: ["./product-detail.component.scss"]
})
export class ProductDetailComponent implements OnInit {
    @Input() product!: Product;

    get imageUrl(): string {
        const url = `/Products/Mains/${ this.product.images.main }`;
        const cloudName = { cloudName: "dak-coffee-roasters" };

        return new CloudinaryImage(url, cloudName).toURL();
    }

    constructor() { }

    ngOnInit(): void {
    }
}
