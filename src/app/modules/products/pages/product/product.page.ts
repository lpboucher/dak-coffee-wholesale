import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";

import { ProductApiService } from "@core/products/product-api.service";

import { Product } from "@shared/models/classes/product.class";
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
    filterableProperties: FilterType[] = [];
    activeFilters: ActiveFilters = {};
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
        this.featuredProducts$ = this.productService.getFeaturedProducts("upcoming");

        this.subscriptions.add(this.route.params
            .pipe(
                switchMap(({ productType }) => this.productService.getProductsByType(productType))
            )
            .subscribe(
                (products) => {
                    this.products.next(products);
                    this.updateFilterForm(products);
                }
            )
        );

        this.subscriptions.add(this.route.queryParamMap
            .subscribe(
                (queryParams) => console.log(queryParams)
            )
        );

        this.subscriptions.add(this.filterForm.valueChanges
            .subscribe(
                (changes) => this.updateActiveFilters(changes)
            )
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    private updateFilterForm(products: Product[]): void {
        this.filterForm.reset({});

        this.filterableProperties = this.productsToFiltersPipe.transform(products);

        this.filterableProperties.forEach(p => this.filterForm.addControl(p.key, new FormControl()));
    }

    private updateActiveFilters(changes: any): void {
        this.activeFilters = Object.keys(changes)
            .map(key => {
                const active = [...(changes[key] ?? [])];
                return active.length === 0 ? {} : { [key]: active };
            })
            .reduce((union, obj) => {
                return { ...union, ...obj };
            }, {});
    }
}
