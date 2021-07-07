import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";

import { ImageService } from "@core/views/image.service";

import { Product } from "@shared/models/classes/product.class";
import { Weight } from "@shared/models/types/weight.type";
import { Roast } from "@shared/models/types/roast.type";
import { CustomOption } from "@shared/models/types/custom-option.interface";

@Component({
    selector: "app-product-detail",
    templateUrl: "./product-detail.component.html",
    styleUrls: ["./product-detail.component.scss"]
})
export class ProductDetailComponent implements OnInit, OnDestroy {
    @Input() product!: Product;

    readonly weightOptions: Weight[] = ["250g", "1kg"];
    readonly defaultWeight: Weight = this.weightOptions[0];
    readonly roastOptions: Roast[] = ["Filter", "Espresso", "Both"];
    readonly defaultRoast: Roast = this.roastOptions[0];
    readonly defaultQuantity: number = 1;

    private subscriptions: Subscription = new Subscription();

    selectionForm = this.fb.group({
        weight: [this.defaultWeight, Validators.required],
        roast: [this.defaultRoast, Validators.required],
        quantity: [this.defaultQuantity, Validators.required],
    });

    get imageUrl(): string {
        if (this.product?.images.main == null) { return ""; }
        return this.imageService.getProductMainUrl(this.product?.images.main);
    }

    get weight(): Weight {
        return this.weightControl.value;
    }

    set weight(weight: Weight) {
        this.weightControl.setValue(weight);
    }

    get roast(): Roast {
        return this.roastControl.value;
    }

    set roast(roast: Roast) {
        this.roastControl.setValue(roast);
    }

    get quantity(): number {
        return this.quantityControl.value;
    }

    set quantity(quantity: number) {
        this.quantityControl.setValue(quantity);
    }

    get snipcartOptions(): CustomOption[] {
        return [
            { name: "Weight", list: this.weightOptions, selection: this.weight },
            { name: "Roast", list: this.roastOptions, selection: this.roast },
        ];
    }

    constructor(
        private imageService: ImageService,
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.subscriptions.add(this.parseQueryParams());
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    private get weightControl(): AbstractControl {
        return this.selectionForm.get("weight")!;
    }

    private get roastControl(): AbstractControl {
        return this.selectionForm.get("roast")!;
    }

    private get quantityControl(): AbstractControl {
        return this.selectionForm.get("quantity")!;
    }

    private parseQueryParams(): Subscription {
        return this.activatedRoute.queryParamMap.subscribe(
            (queryParams) => {
                this.parseWeight(queryParams);
                this.parseRoast(queryParams);
                this.parseQuantity(queryParams);
            }
        );
    }

    private parseWeight(queryParams: ParamMap): void {
        const weight = queryParams.get("weight");
        if (this.isValidWeight(weight)) {
            this.weight = weight as Weight;
        }
    }

    private parseRoast(queryParams: ParamMap): void {
        const roast = queryParams.get("roast");
        if (this.isValidRoast(roast)) {
            this.roast = roast as Roast;
        }
    }

    private parseQuantity(queryParams: ParamMap): void {
        const quantity = queryParams.get("quantity");
        if (quantity != null) {
            this.quantity = Number.parseInt(quantity);
        }
    }

    private isValidRoast(roast: string | null): boolean {
        return roast != null
            && this.roastOptions.includes(roast as Roast);
    }

    private isValidWeight(weight: string | null): boolean {
        return weight != null
            && this.weightOptions.includes(weight as Weight);
    }
}
