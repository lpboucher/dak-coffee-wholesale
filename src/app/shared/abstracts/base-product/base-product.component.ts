import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

import { CartModifier } from "@shared/models/types/cart-modifier.interface";
import { Product } from "@shared/models/classes/product.class";

@Component({ template: "" })
export abstract class BaseProductComponent implements OnInit {
    @Input() product!: Product;
    optionsForm = this.fb.group({});

    get quantity(): number {
        return this.optionsForm.get("quantity")!.value;
    }

    get productAttributes() {
        return this.product
            .attributes
            .map(attr => attr.name);
    }

    get cartModifiers(): CartModifier[] {
        return this.product
            .attributes
            .map(
                attr => ({
                    attribute: attr,
                    selection: this.optionsForm.get(attr.name)!.value,
                })
            );
    }

    get totalPrice(): number {
        if (isNaN(this.product.priceAsNumber)) { return NaN; }

        return this.product.priceAsNumber * this.quantity;
    }

    constructor(protected fb: FormBuilder) {}

    ngOnInit(): void {
        this.optionsForm = this.fb.group({
            ...this.formConfig,
            quantity: [1, Validators.required],
        });
    }

    private get formConfig() {
        return this.product
            .attributes
            .reduce(
                (obj, attr) => ({
                    ...obj,
                    [attr.name]: [attr.options[0].optionName, Validators.required]
                }), {}
            );
    }

    getAttributeOptions(attribute: string): string[] {
        const attr = this.product
            .attributes
            .find(attr => attr.name === attribute);

        if (attr == null) return [];

        return attr.options
            .map(o => o.optionName);
    }

}
