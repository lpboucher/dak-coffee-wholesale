import { Component, Input } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

import { ImageService } from "@core/views/image.service";

import { Product } from "@shared/models/classes/product.class";
import { CustomOption } from "@shared/models/types/custom-option.interface";
import { Roast } from "@shared/models/types/roast.type";
import { Weight } from "@shared/models/types/weight.type";

@Component({
    selector: "app-product-card",
    templateUrl: "./product-card.component.html",
    styleUrls: ["./product-card.component.scss"]
})
export class ProductCardComponent {
    @Input() product!: Product;

    readonly weightOptions: Weight[] = ["250g", "1kg"];
    readonly defaultWeight: Weight = this.weightOptions[0];
    readonly roastOptions: Roast[] = ["Filter", "Espresso", "Both"];
    readonly defaultRoast: Roast = this.roastOptions[0];
    readonly defaultQuantity: number = 1;

    productOptionsForm = this.fb.group({
        weight: [this.defaultWeight, Validators.required],
        roast: [this.defaultRoast, Validators.required],
        quantity: [this.defaultQuantity, Validators.required],
    });


    get imageUrl(): string {
        if (this.product.images.thumb == null) { return ""; }
        return this.imageService.getProductThumbUrl(this.product.images.thumb);
    }

    get weight(): string {
        return this.productOptionsForm.get("weight")!.value;
    }

    get roast(): string {
        return this.productOptionsForm.get("roast")!.value;
    }

    get quantity(): number {
        return this.productOptionsForm.get("quantity")!.value;
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
