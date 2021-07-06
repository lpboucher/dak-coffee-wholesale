import { Component, Input } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

import { ImageService } from "@core/views/image.service";

import { Product } from "@shared/models/classes/product.class";
import { Weight } from "@shared/models/types/weight.type";
import { Roast } from "@shared/models/types/roast.type";
import { CustomOption } from "@shared/models/types/custom-option.interface";

@Component({
    selector: "app-product-detail",
    templateUrl: "./product-detail.component.html",
    styleUrls: ["./product-detail.component.scss"]
})
export class ProductDetailComponent {
    @Input() product!: Product;

    readonly weightOptions: Weight[] = ["250g", "1kg"];
    readonly defaultWeight: Weight = this.weightOptions[0];
    readonly roastOptions: Roast[] = ["Filter", "Espresso", "Both"];
    readonly defaultRoast: Roast = this.roastOptions[0];

    selectionForm = this.fb.group({
        weight: [this.defaultWeight, Validators.required],
        roast: [this.defaultRoast, Validators.required],
    });

    get imageUrl(): string {
        if (this.product?.images.main == null) { return ""; }
        return this.imageService.getProductMainUrl(this.product?.images.main);
    }

    get weight(): Weight {
        return this.selectionForm.get("weight")!.value;
    }

    get roast(): Roast {
        return this.selectionForm.get("roast")!.value;
    }

    get snipcartOptions(): CustomOption[] {
        return [
            { name: "Weight", list: this.weightOptions, selection: this.weight },
            { name: "Roast", list: this.roastOptions, selection: this.roast },
        ];
    }

    constructor(
        private imageService: ImageService,
        private fb: FormBuilder,
    ) {}
}
