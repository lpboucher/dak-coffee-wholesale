import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";

import { ImageService } from "@core/views/image.service";
import { PricingTierService } from "@core/pricing/pricing-tier.service";

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

    constructor(
        private imageService: ImageService,
        protected fb: FormBuilder,
        protected pricingTierService: PricingTierService,
    ) {
        super(fb, pricingTierService);
    }
}
