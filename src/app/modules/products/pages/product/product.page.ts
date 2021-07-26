import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, combineLatest, Observable, Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";

import { ProductApiService } from "@core/products/product-api.service";

import { Product } from "@shared/models/classes/product.class";
import { ProductType } from "@shared/models/types/product-type.type";
import { FilterType } from "@shared/models/types/filter-type.type";
import { ActiveFilters } from "@shared/models/types/active-filters.type";
import { ProductsToFiltersPipe } from "@shared/pipes/products-to-filters.pipe";

@Component({
    selector: "app-product",
    templateUrl: "./product.page.html",
    styleUrls: ["./product.page.scss"]
})
export class ProductPageComponent implements OnInit, OnDestroy {
    private subscriptions = new Subscription();
    private products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
    featuredProducts$: Observable<Product[]> = new Observable();
    filterableProperties: FilterType[] | undefined;
    activeFilters: ActiveFilters | undefined;
    filterForm = this.fb.group({});

    get products$(): Observable<Product[]> {
        return this.products.asObservable();
    }

    constructor(
        private productService: ProductApiService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private productsToFiltersPipe: ProductsToFiltersPipe,
    ) {}

    ngOnInit(): void {
        this.featuredProducts$ = this.productService.getFeaturedProducts();

        this.subscriptions.add(
            combineLatest([
                this.route.params,
                this.route.params
                    .pipe(
                        switchMap(({ productType }) => this.productService.getProductsByType(productType))
                    )
            ])
            .subscribe(
                ([{ productType }, products]) => {
                    this.products.next(products);
                    this.updateFilterForm(products, productType);
                }
            )
        );

        this.subscriptions.add(
            this.filterForm.valueChanges.subscribe(
                changes => this.updateActiveFilters(changes)
            )
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    private updateFilterForm(products: Product[], productType: ProductType): void {
        this.filterForm.reset({});

        this.filterableProperties = this.productsToFiltersPipe.transform(products, productType);
        this.filterableProperties
            .forEach(p => this.filterForm.addControl(p.key, new FormControl()));
    }

    private updateActiveFilters(changes: any): void {
        this.activeFilters = Object.keys(changes)
            .filter(key => changes[key] != null)
            .map(key => {
                const active = [...changes[key]];
                return active.length == 0 ? {} : { [key]: active };
            })
            .reduce((union, obj) => {
                return { ...union, ...obj }
            }, {});
    }
}
