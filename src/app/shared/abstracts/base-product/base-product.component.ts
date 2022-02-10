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
    @Input() initialValue?: { [key: string]: string };
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

    get activePricing(): string {
        return this.pricingTierService.isDiscountActive === true ? "45%" : "30%";
    }

    get newDiscountValue(): string {
        return `${this.optionsForm.get("weight")!.value}/${this.activePricing}`;
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

        // TODO reactivate discount subscriptions when pricing is fixed
        /*
        this.subscriptions.add(this.pricingTierService.isDiscountActive$
            .subscribe((_) => {
                if (this.product.productType === "coffee") {
                    this.optionsForm.get("volume-weight-discount")?.setValue(this.newDiscountValue);
                } else {
                    this.optionsForm.get("volume-discount")?.setValue(this.activePricing);
                }
            })
        );
        */

        // TODO reactivate weight subscriptions when sdk fixed
        /*
        this.subscriptions.add(this.optionsForm.get("weight")?.valueChanges
            .subscribe(
                (_) => {
                    if (this.product.productType === "coffee") {
                        this.optionsForm.get("volume-weight-discount")?.setValue(this.newDiscountValue);
                    }
                }
            )
        );
        */
    }

    private get formConfig() {
        return this.product.attributes.reduce((obj, attr) => {
            const initialValue = this.initialValue?.[attr.name!] ?? attr.options![0].name;
            return {
                [attr.name!]: [initialValue, Validators.required],
                ...obj
            };
        }, {});
    }
}
