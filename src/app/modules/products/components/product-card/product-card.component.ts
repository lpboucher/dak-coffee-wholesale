import { Component, Input } from "@angular/core";

import { ImageService } from "@core/views/image.service";

import { Product } from "@shared/models/classes/product.class";
import { CustomOption } from "@shared/models/types/custom-option.type";
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
    currentWeight: Weight = this.defaultWeight;

    readonly roastOptions: Roast[] = ["Filter", "Espresso", "Both"];
    readonly defaultRoast: Roast = this.roastOptions[0];
    currentRoast: Roast = this.defaultRoast;

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
            {name: "Weight", list: this.weightOptions, selection: this.currentWeight},
            {name: "Roast", list: this.roastOptions, selection: this.currentRoast},
        ];
    }
}
