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

    get productAttributes() {
        return this.product
            .attributes
            .map(attr => attr.name);
    }

    get cartModifiers(): CartModifier[] {
        return this.product
            .attributes
            .map(
                attr => {
                    return {
                        attribute: attr,
                        selection: this.optionsForm.get(attr.name)!.value,
                    }
                }
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

    extractOptionNames(options: ProductAttributeOption[]): string[] {
        return options.map(o => o.optionName);
    }

    private get formConfig() {
        return this.product
            .attributes
            .reduce(
                (obj, attr) => {
                    return {
                        [attr.name]: [attr.options[0].optionName, Validators.required],
                        ...obj
                    }
                }, {}
            );
    }
}
