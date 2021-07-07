import { Component, Input } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

import { ImageService } from "@core/views/image.service";

import { Product } from "@shared/models/classes/product.class";
import { CustomOption } from "@shared/models/types/custom-option.interface";
import { Roast } from "@shared/models/types/roast.type";
import { Weight } from "@shared/models/types/weight.type";

import { ROAST_OPTIONS, WEIGHT_OPTIONS } from "@utils/constants/form-options";

@Component({
    selector: "app-product-card",
    templateUrl: "./product-card.component.html",
    styleUrls: ["./product-card.component.scss"]
})
export class ProductCardComponent {
    @Input() product!: Product;

    private readonly _weightOptions = WEIGHT_OPTIONS;
    readonly defaultWeight: Weight = this._weightOptions[0];

    private readonly _roastOptions = ROAST_OPTIONS;
    readonly defaultRoast: Roast = this._roastOptions[0];

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

    get roastOptions(): string[] {
        return this._roastOptions.map(r => r as string);
    }

    get weightOptions(): string[] {
        return this._weightOptions.map(w => w as string);
    }

    get snipcartOptions(): CustomOption[] {
        return [
            {
                name: "Weight",
                list: this.weightOptions,
                selection: this.weight,
            },
            {
                name: "Roast",
                list: this.roastOptions,
                selection: this.roast,
            },
        ];
    }

    constructor(
        private imageService: ImageService,
        private fb: FormBuilder,
    ) {}
}
