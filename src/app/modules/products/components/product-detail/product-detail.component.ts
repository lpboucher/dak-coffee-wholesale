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
    currentWeight: Weight = this.defaultWeight;

    readonly roastOptions: Roast[] = ["Filter", "Espresso", "Both"];
    readonly defaultRoast: Roast = this.roastOptions[0];
    currentRoast: Roast = this.defaultRoast;

    snipcartOptions: CustomOption[] = this.makeSnipcartOptions();

    selectionForm = this.fb.group({
        weightSelection: [this.defaultWeight, Validators.required],
        roastSelection: [this.defaultRoast, Validators.required],
    });

    get imageUrl(): string {
        if (this.product?.images.main == null) { return ""; }
        return this.imageService.getProductMainUrl(this.product?.images.main);
    }

    constructor(
        private imageService: ImageService,
        private fb: FormBuilder,
    ) {}

    onSelectWeight(weight: Weight): void {
        this.currentWeight = weight;
        this.snipcartOptions = this.makeSnipcartOptions();
    }

    onSelectRoast(roast: Roast): void {
        this.currentRoast = roast;
        this.snipcartOptions = this.makeSnipcartOptions();
    }

    private makeSnipcartOptions(): CustomOption[] {
        return [
            {name: "Weight", list: this.weightOptions, selection: this.currentWeight},
            {name: "Roast", list: this.roastOptions, selection: this.currentRoast},
        ];
    }
}
