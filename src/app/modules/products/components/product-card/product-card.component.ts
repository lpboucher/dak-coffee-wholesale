import { Component, Input, OnInit } from "@angular/core";
import { ImageService } from "@core/views/image.service";

import { Product } from "@shared/models/classes/product.class";

@Component({
    selector: "app-product-card",
    templateUrl: "./product-card.component.html",
    styleUrls: ["./product-card.component.scss"]
})
export class ProductCardComponent implements OnInit {
    @Input() product!: Product;

    get imageUrl(): string {
        if (this.product.images.thumb == null) { return ""; }
        return this.imageService.getProductThumbUrl(this.product.images.thumb);
    }

    constructor(private imageService: ImageService) { }

    ngOnInit(): void {
    }
}
