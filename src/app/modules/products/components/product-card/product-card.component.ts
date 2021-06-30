import { Component, Input } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

import { ImageService } from "@core/views/image.service";

import { Product } from "@shared/models/classes/product.class";

@Component({
    selector: "app-product-card",
    templateUrl: "./product-card.component.html",
    styleUrls: ["./product-card.component.scss"]
})
export class ProductCardComponent {
    @Input() product!: Product;
    readonly weightOptions = ["250g", "1kg"];
    readonly roastOptions = ["Filter", "Espresso", "Omni"];
    selectionForm = this.fb.group({
        weight: [this.weightOptions[0], Validators.required],
        roast: [this.roastOptions[0], Validators.required]
    });

    get imageUrl(): string {
        if (this.product.images.thumb == null) { return ""; }
        return this.imageService.getProductThumbUrl(this.product.images.thumb);
    }

    constructor(
        private imageService: ImageService,
        private fb: FormBuilder,
    ) {}

    onSelectionFormSubmit(): void {}
}
