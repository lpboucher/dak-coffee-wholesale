import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

import { PricingTierService } from "@core/pricing/pricing-tier.service";

import { Product } from "@shared/models/classes/product.class";
import { Coffee } from "@shared/models/classes/coffee.class";

@Component({ template: "" })
export abstract class BaseProductComponent implements OnInit {
    private subscriptions: Subscription = new Subscription();
    @Input() product!: Product;
    optionsForm = this.fb.group({});

    get quantity(): number {
        return this.optionsForm.get("quantity")!.value;
    }

    get formValue(): any {
        return this.optionsForm.value;
    }

    get flavours(): string[] {
        return this.product.productType === "coffee"
            ? (this.product as Coffee).tastingNotes ?? []
            : [];
    }

    get linkParams(): string[] {
        return ["/products", this.product.productType, "detail", this.product.slug!];
    }

    constructor(
        protected fb: FormBuilder,
        protected pricingTierService: PricingTierService,
    ) {}

    ngOnInit(): void {
        this.optionsForm = this.fb.group({
            ...this.formConfig,
            quantity: [1, Validators.required],
        });

        this.subscriptions.add(this.pricingTierService.isDiscountActive$
            .subscribe((isActive) => {
                const discount = isActive ? "45%" : "30%";
                this.optionsForm.get("volume-discount")?.setValue(discount);
            })
        );
    }

    private get formConfig() {
        return this.product.attributes.reduce((obj, attr) => ({
            [attr.name!]: [attr.options![0].name, Validators.required],
            ...obj
        }), {});
    }
}
