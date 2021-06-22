import { Component, OnInit, Input } from "@angular/core";
import { ImageService } from "@core/views/image.service";

import { Product } from "@shared/models/classes/product.class";

@Component({
    selector: "app-featured-product-card",
    templateUrl: "./featured-product-card.component.html",
    styleUrls: ["./featured-product-card.component.scss"]
})
export class FeaturedProductCardComponent implements OnInit {
    @Input() product!: Product;

    get imageUrl(): string {
        if (this.product.images.thumb == null) { return ""; }
        return this.imageService.getProductThumbUrl(this.product.images.thumb);
    }

    constructor(private imageService: ImageService) { }

    ngOnInit(): void {
    }

    onClick(): void {
        console.log(this.product);
    }
}
