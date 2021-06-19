import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { flatten } from "@angular/compiler";
import { forkJoin, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment as config } from "@env";
import { DataApiService } from "@core/abstracts/data-api.service";
import { Coffee } from "@shared/models/classes/coffee.class";
import { Product } from "@shared/models/classes/product.class";
import { ProductType } from "@shared/models/types/product-type.type";
import { CoffeeApiService } from "@core/products/coffee-api.service";
import { MerchandiseApiService } from "@core/products/merchandise-api.service";

@Injectable({
    providedIn: "root"
})
export class ProductApiService extends DataApiService<Product> {

    constructor(
        protected http: HttpClient,
        private coffeeApiService: CoffeeApiService,
        private merchandiseApiService: MerchandiseApiService,
    ) {
        super(config.backendURL + "wholesale/", http, Coffee);
    }

    getProducts(): Observable<Product[]> {
        return forkJoin([
            this.coffeeApiService.getCoffees(),
            this.merchandiseApiService.getMerchandise(),
        ]).pipe(
            map((products: Product[][]) => flatten(products)),
        );
    }

    getProduct(slug: string): Observable<Product | undefined> {
        return this.getProducts()
            .pipe(
                map(arr => arr.find(p => p.slug === slug))
            );
    }

    getFeaturedProducts(): Observable<Product[]> {
        return this.getProducts()
            .pipe(
                map(arr =>
                    arr.filter(p => p.collection === "featured")
                        .slice(0, 2)),
            );
    }

    getProductsByType(productType?: ProductType | "all"): Observable<Product[]> {
        if (!productType || productType === "all") {
            return this.getProducts();
        }

        return this.getProducts()
            .pipe(
                map(arr => arr.filter(p => p.productType === productType))
            );
    }

    getRelatedProducts(slug: string): Observable<Product[]> {
        return this.getProducts()
            .pipe(
                map(arr => arr.filter(e => e.slug !== slug)
                    .slice(0, 3)),
            );
    }
}
