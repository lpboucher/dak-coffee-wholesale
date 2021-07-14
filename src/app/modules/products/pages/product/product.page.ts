import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, Subscription } from "rxjs";

import { ProductApiService } from "@core/products/product-api.service";

import { Product } from "@shared/models/classes/product.class";
import { ProductType } from "@shared/models/types/product-type.type";
import { FilterType } from "@shared/models/types/filter-type.type";

import { getFilterableProperties } from "@utils/factories/filters";

@Component({
    selector: "app-product",
    templateUrl: "./product.page.html",
    styleUrls: ["./product.page.scss"]
})
export class ProductPageComponent implements OnInit, OnDestroy {
    private subscriptions = new Subscription();
    featuredProducts$: Observable<Product[]> = new Observable();
    products$: Observable<Product[]> = new Observable();
    productType: ProductType | undefined;

    constructor(
        private productService: ProductApiService,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.featuredProducts$ = this.productService.getFeaturedProducts();

        this.subscriptions.add(
            this.route.params.subscribe(
                ({productType}) => {
                    this.productType = productType;
                    this.products$ = this.productService.getProductsByType(productType);
                }
            )
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    getFilterableProperties(products: Product[] | null): FilterType {
        if (products == null || this.productType == null) return {};
        return getFilterableProperties(products, this.productType);
    }
}
