import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";

import { ImageService } from "@core/views/image.service";
import { PricingTierService } from "@core/pricing/pricing-tier.service";

import { BaseProductComponent } from "@shared/abstracts/base-product/base-product.component";

@Component({
    selector: "app-product-card",
    templateUrl: "./product-card.component.html",
    styleUrls: ["./product-card.component.scss"]
})
export class ProductCardComponent extends BaseProductComponent {
    readonly limitedNumberOfFlavors: number = 3;

    get imageUrl(): string {
        if (this.product.images.thumb == null) { return ""; }
        return this.imageService.getProductThumbUrl(this.product.images.thumb);
    }

    get cardHighlights(): {text: string, class: string}[] {
        const highlights = [];
        if (this.product.isNewProduct) {
            highlights.push({text: "New", class: "product-card-body-highlight--new"});
        }

        if (this.product.isLowStock) {
            highlights.push({text: "Low Stock", class: "product-card-body-highlight--low-stock"});
        }

        return highlights;
    }

    constructor(
        private imageService: ImageService,
        protected fb: FormBuilder,
        protected pricingTierService: PricingTierService,
    ) {
        super(fb, pricingTierService);
    }
}
