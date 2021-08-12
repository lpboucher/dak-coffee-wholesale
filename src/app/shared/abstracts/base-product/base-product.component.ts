import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

import { Product } from "@shared/models/classes/product.class";

@Component({ template: "" })
export abstract class BaseProductComponent implements OnInit {
    @Input() product!: Product;
    optionsForm = this.fb.group({});

    get quantity(): number {
        return this.optionsForm.get("quantity")!.value;
    }

    get formValue(): any {
        return this.optionsForm.value;
    }

    constructor(protected fb: FormBuilder) {}

    ngOnInit(): void {
        this.optionsForm = this.fb.group({
            ...this.formConfig,
            quantity: [1, Validators.required],
        });
    }

    private get formConfig() {
        return this.product.attributes.reduce((obj, attr) => ({
            [attr.name!]: [attr.options![0].name, Validators.required],
            ...obj
        }), {});
    }
}
