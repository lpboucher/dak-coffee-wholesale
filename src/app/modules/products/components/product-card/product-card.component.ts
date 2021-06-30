import { Component, Input } from "@angular/core";
import { AbstractControl, FormBuilder, Validators } from "@angular/forms";

import { ImageService } from "@core/views/image.service";

import { Product } from "@shared/models/classes/product.class";
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
    readonly roastOptions: Roast[] = ["Filter", "Espresso", "Both"];
    selectionForm = this.fb.group({
        weight: [this.weightOptions[0], Validators.required],
        roast: [this.roastOptions[0], Validators.required]
    });
    showWeightOptions: boolean = false;
    showRoastOptions: boolean = false;

    get weightSelection(): Weight {
        return this.weightControl.value;
    }

    set weightSelection(weight: Weight) {
        this.weightControl.setValue(weight);
    }

    get weightControl(): AbstractControl {
        return this.selectionForm.get("weight")!;
    }

    get roastSelection(): Roast {
        return this.roastControl.value;
    }

    set roastSelection(roast: Roast) {
        this.roastControl.setValue(roast);
    }

    get roastControl(): AbstractControl {
        return this.selectionForm.get("roast")!;
    }

    get imageUrl(): string {
        if (this.product.images.thumb == null) { return ""; }
        return this.imageService.getProductThumbUrl(this.product.images.thumb);
    }

    constructor(
        private imageService: ImageService,
        private fb: FormBuilder,
    ) {}

    onClickWeightSelection(): void {
        this.showWeightOptions = !this.showWeightOptions;
    }

    onSelectWeight(weight: Weight, event: Event): void {
        this.weightSelection = weight;
        this.showWeightOptions = false;
        event.stopPropagation();
    }

    onClickRoastSelection(): void {
        this.showRoastOptions = !this.showRoastOptions;
    }

    onSelectRoast(roast: Roast, event: Event): void {
        this.roastSelection = roast;
        this.showRoastOptions = false;
        event.stopPropagation();
    }
}
