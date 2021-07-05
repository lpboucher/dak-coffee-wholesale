import { Component, Input } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

import { ImageService } from "@core/views/image.service";

import { Product } from "@shared/models/classes/product.class";
import { Weight } from "@shared/models/types/weight.type";
import { Roast } from "@app/shared/models/types/roast.type";

@Component({
    selector: "app-product-detail",
    templateUrl: "./product-detail.component.html",
    styleUrls: ["./product-detail.component.scss"]
})
export class ProductDetailComponent {
    @Input() product!: Product;
    weightOptions: Weight[] = ["250g", "1kg"];
    roastOptions: Roast[] = ["Filter", "Espresso", "Both"];
    selectionForm = this.fb.group({
        weightSelection: [this.weightOptions[0], Validators.required],
        roastSelection: [this.roastOptions[0], Validators.required],
    });

    get imageUrl(): string {
        if (this.product?.images.main == null) { return ""; }
        return this.imageService.getProductMainUrl(this.product?.images.main);
    }

    constructor(
        private imageService: ImageService,
        private fb: FormBuilder,
    ) {}
}
