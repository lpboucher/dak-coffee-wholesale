import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment as config } from "@env";
import { DataApiService } from "@core/abstracts/data-api.service";
import { Coffee } from "@shared/models/classes/coffee.class";
import { Product } from "@shared/models/classes/product.class";
import { ProductType } from "@shared/models/types/product-type.type";
import { Merchandise } from "@shared/models/classes/merchandise.class";
import { CoffeeApiService } from "./coffee-api.service";

@Injectable({
    providedIn: "root"
})
export class ProductApiService extends DataApiService<Product> {
    products: Product[] = [
        new Merchandise({
            id: "7",
            name: "Dak Tote Bag",
            price: "14.00",
            collection: undefined,
            description: "Premium quality: 300 gr./m2",
            slug: "tote",
            dimensions: "41 x 42 cm",
            material: "Cotton",
        })
    ];

    constructor(
        protected http: HttpClient,
        private coffeeApiService: CoffeeApiService,
    ) {
        super(config.backendURL + "wholesale/", http, Coffee);
    }

    getProducts(): Observable<Product[]> {
        return (this.coffeeApiService.getCoffees() as Observable<Product[]>)
            .pipe(
                map(arr => { arr.push(...this.products); return arr; })
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
}
