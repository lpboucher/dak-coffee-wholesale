import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";

import { ImageService } from "@core/views/image.service";

import { BaseProductComponent } from "@shared/abstracts/base-product/base-product.component";

@Component({
    selector: "app-product-detail",
    templateUrl: "./product-detail.component.html",
    styleUrls: ["./product-detail.component.scss"]
})
export class ProductDetailComponent extends BaseProductComponent {
    get imageUrl(): string {
        if (this.product?.images.main == null) { return ""; }
        return this.imageService.getProductMainUrl(this.product?.images.main);
    }

    get totalPrice(): number {
        if (isNaN(this.product.priceAsNumber)) { return NaN; }

        return this.product.priceAsNumber * this.quantity;
    }

    constructor(
        private imageService: ImageService,
        protected fb: FormBuilder,
    ) {
        super(fb);
    }
}
