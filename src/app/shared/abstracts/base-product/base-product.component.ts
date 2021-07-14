import { Component, Input } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

import { Product } from "@shared/models/classes/product.class";
import { Coffee } from "@shared/models/classes/coffee.class";
import { Roast } from "@shared/models/types/roast.type";
import { Weight } from "@shared/models/types/weight.type";
import { CustomOption } from "@shared/models/types/custom-option.interface";

import { ROAST_OPTIONS, WEIGHT_OPTIONS } from "@utils/constants/form-options";

@Component({ template: "" })
export abstract class BaseProductComponent {
    @Input() product!: Product;

    private readonly _weightOptions = WEIGHT_OPTIONS;
    readonly defaultWeight: Weight = this._weightOptions[0];

    private readonly _roastOptions = ROAST_OPTIONS;
    readonly defaultRoast: Roast = this._roastOptions[0];

    optionsForm = this.fb.group({
        weight: [this.defaultWeight, Validators.required],
        roast: [this.defaultRoast, Validators.required],
        quantity: [1, Validators.required],
    });

    get weight(): string {
        return this.optionsForm.get("weight")!.value;
    }

    get roast(): string {
        return this.optionsForm.get("roast")!.value;
    }

    get quantity(): number {
        return this.optionsForm.get("quantity")!.value;
    }

    get roastOptions(): string[] {
        return this._roastOptions.map(r => r as string);
    }

    get weightOptions(): string[] {
        return this._weightOptions.map(w => w as string);
    }

    get snipcartOptions(): CustomOption[] {
        if (this.product.productType !== "coffee") return [];

        return [
            {
                name: "Weight",
                list: this.weightOptions,
                priceModifiers: this.getWeightPriceModifiers(),
                selection: this.weight,
            },
            {
                name: "Roast",
                list: this.roastOptions,
                selection: this.roast,
            },
        ];
    }

    get totalPrice(): number {
        if (isNaN(this.product.priceAsNumber)) { return NaN; }

        return this.product.priceAsNumber * this.quantity;
    }

    constructor(protected fb: FormBuilder) {}

    private getWeightPriceModifiers(): number[] {
        const coffee = this.product as Coffee;
        return [0, coffee.kgPriceAsNumber - coffee.priceAsNumber];
    }
}
