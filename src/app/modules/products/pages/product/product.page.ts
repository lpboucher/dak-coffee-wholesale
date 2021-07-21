import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Observable, Subscription } from "rxjs";

import { ProductApiService } from "@core/products/product-api.service";

import { Product } from "@shared/models/classes/product.class";
import { FilterType } from "@shared/models/types/filter-type.type";
import { ActiveFilters } from "@shared/models/types/active-filters.type";

import { getUniqueValuesOfKey } from "@app/utils/helper";

@Component({
    selector: "app-product",
    templateUrl: "./product.page.html",
    styleUrls: ["./product.page.scss"]
})
export class ProductPageComponent implements OnInit, OnDestroy {
    private subscriptions = new Subscription();
    featuredProducts$: Observable<Product[]> = new Observable();
    products$: Observable<Product[]> = new Observable();
    filterableProperties: FilterType[] | undefined;
    activeFilters: ActiveFilters | undefined;
    filterForm = this.fb.group({});

    constructor(
        private productService: ProductApiService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.featuredProducts$ = this.productService.getFeaturedProducts();

        this.subscriptions.add(
            this.route.params.subscribe(
                ({productType}) => this.products$ = this.productService.getProductsByType(productType)
            )
        );

        this.subscriptions.add(
            this.products$.subscribe(
                products => {
                    this.filterableProperties
                        ?.forEach(p => this.filterForm.removeControl(p.key));

                    this.filterableProperties = this.getFilterableProperties(products);

                    this.filterableProperties
                        .forEach(p => this.filterForm.addControl(p.key, new FormControl()));
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

    getFilterableProperties(products: Product[]): FilterType[] {
        const filters = products
            .map(p => p.filterableAttributes)
            .reduce((arr, fa) => arr.concat(fa))
            .map(fa => {
                return {
                    [fa.attribute]: {
                        displayName: fa.displayName,
                        key: fa.attribute,
                        options: getUniqueValuesOfKey(products, fa.attribute),
                    }
                }
            })
            .reduce((union, obj) => {
                return { ...union, ...obj }
            });

        return Object.values(filters);
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
