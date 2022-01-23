import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { flatten } from "@angular/compiler";
import { Observable, of, zip } from "rxjs";
import { map, tap } from "rxjs/operators";

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
        return zip(this.coffeeApiService.getCoffees(), this.merchandiseApiService.getMerchandise())
            .pipe(
                map((products: Product[][]) => flatten(products))
            );
    }

    getProduct(slug: string): Observable<Product | undefined> {
        return this.getProducts()
            .pipe(
                map(arr => arr.find(p => p.slug === slug))
            );
    }

    getFeaturedProducts(collection: string): Observable<Product[]> {
        return this.getAll("products/" + collection)
            .pipe(
                map((res: any) => res.slice(0, 2))
            );
    }

    getProductsByType(productType: ProductType): Observable<Product[]> {
        const typeToProducts: Record<ProductType, Observable<Product[]>> = {
            coffee: this.coffeeApiService.getCoffees(),
            merchandise: this.merchandiseApiService.getMerchandise(),
            all: this.getProducts(),
        };

        return typeToProducts[productType] || this.getProducts();
    }

    getCoffeesByRoast(roast: "filter" | "espresso"): Observable<Product[]> {
        return this.coffeeApiService.getCoffees()
            .pipe(
                map((arr) =>
                    arr.filter((coffee) =>
                        coffee.roastOptions.some((opt) =>
                            opt.name.toLowerCase() === roast.toLowerCase()
                        )
                    )
                )
            );
    }

    getRelatedProducts(slug: string): Observable<Product[]> {
        return this.getProducts()
            .pipe(
                map(arr => arr.filter(e => e.slug !== slug)
                    .slice(0, 4)),
            );
    }
}
