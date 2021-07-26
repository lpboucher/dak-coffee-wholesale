import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

import { CartModifier } from "@shared/models/types/cart-modifier.interface";
import { Product } from "@shared/models/classes/product.class";
import { ProductAttributeOption } from "@app/shared/models/types/product-attribute-option.interface";

@Component({ template: "" })
export abstract class BaseProductComponent implements OnInit {
    @Input() product!: Product;
    optionsForm = this.fb.group({});

    get quantity(): number {
        return this.optionsForm.get("quantity")!.value;
    }

    get cartModifiers(): CartModifier[] {
        return this.product
            .attributes
            .filter(attr => attr.name != null)
            .map(
                attr => ({
                        attribute: attr,
                        selection: this.optionsForm.get(attr.name!)!.value,
                    })
            );
    }

    get totalPrice(): number {
        if (isNaN(this.product.priceAsNumber)) { return NaN; }

        const priceModifier = this.product
            .priceRelevantAttributes
            .filter(attr => attr.name != null)
            .map(attr => {
                const selection = this.optionsForm.get(attr.name!)?.value;
                return attr.options
                    ?.find(o => o.optionName === selection)
                    ?.priceModifier
                    ?? 0;
            })
            .reduce((sum, val) => sum + val, 0);

        return (this.product.priceAsNumber + priceModifier) * this.quantity;
    }

    constructor(protected fb: FormBuilder) {}

    ngOnInit(): void {
        this.optionsForm = this.fb.group({
            ...this.formConfig,
            quantity: [1, Validators.required],
        });
    }

    extractOptionNames(options: ProductAttributeOption[] | null): string[] {
        if (options == null) return [];
        return options.map(o => o.optionName);
    }

    private get formConfig() {
        return this.product
            .attributes
            .filter(attr => attr.name != null && attr.options != null)
            .reduce(
                (obj, attr) => ({
                        [attr.name!]: [attr.options![0].optionName, Validators.required],
                        ...obj
                    }), {}
            );
    }
}
