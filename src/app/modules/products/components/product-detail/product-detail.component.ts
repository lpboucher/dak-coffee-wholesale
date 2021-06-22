import { Component, OnInit, Input } from "@angular/core";
import { ImageService } from "@core/views/image.service";

import { Product } from "@shared/models/classes/product.class";

@Component({
    selector: "app-product-detail",
    templateUrl: "./product-detail.component.html",
    styleUrls: ["./product-detail.component.scss"]
})
export class ProductDetailComponent implements OnInit {
    @Input() product!: Product;

    get imageUrl(): string {
        if (this.product.images.main == null) { return ""; }
        return this.imageService.getProductMainUrl(this.product.images.main);
    }

    constructor(private imageService: ImageService) { }

    ngOnInit(): void {
    }
}
