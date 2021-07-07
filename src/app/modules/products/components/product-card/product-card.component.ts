import { Component, Input } from "@angular/core";

import { ImageService } from "@core/views/image.service";

import { Product } from "@shared/models/classes/product.class";
import { CustomOption } from "@app/shared/models/types/custom-option.interface";
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

    readonly weightOptions = WEIGHT_OPTIONS;
    currentWeight: Weight = this.weightOptions[0];

    readonly roastOptions = ROAST_OPTIONS;
    currentRoast: Roast = this.roastOptions[0];

    snipcartOptions: CustomOption[] = this.makeSnipcartOptions();


    get imageUrl(): string {
        if (this.product.images.thumb == null) { return ""; }
        return this.imageService.getProductThumbUrl(this.product.images.thumb);
    }

    constructor(private imageService: ImageService) {}

    changeWeightSelection(weight: string): void {
        if (this.weightOptions.find(w => w == weight) == null) { return; }

        this.currentWeight = weight as Weight;
        this.snipcartOptions = this.makeSnipcartOptions();
    }

    changeRoastSelection(roast: string): void {
        if (this.roastOptions.find(r => r == roast) == null) { return; }

        this.currentRoast = roast as Roast;
        this.snipcartOptions = this.makeSnipcartOptions();
    }

    private makeSnipcartOptions(): CustomOption[] {
        return [
            {
                name: "Weight",
                list: this.weightOptions.map(w => w as string),
                selection: this.currentWeight
            },
            {
                name: "Roast",
                list: this.roastOptions.map(r => r as string),
                selection: this.currentRoast
            },
        ];
    }
}
