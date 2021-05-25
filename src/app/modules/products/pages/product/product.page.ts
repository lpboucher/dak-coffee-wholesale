import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, Subscription } from "rxjs";

import { ProductService } from "@core/products/product.service";
import { Product } from "@shared/models/classes/product.class";
import { ProductType } from "@shared/models/types/product-type.type";

@Component({
    selector: "app-product",
    templateUrl: "./product.page.html",
    styleUrls: ["./product.page.scss"]
})
export class ProductPageComponent implements OnInit, OnDestroy {
    featuredProducts$: Observable<Product[]> = new Observable;
    products$: Observable<Product[]> = new Observable();
    paramMapSubscription$: Subscription;

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute,
    ) {
        this.paramMapSubscription$ = this.route.paramMap.subscribe(
            paramMap => {
                const productsToShow = paramMap.get("productType") as ProductType;
                this.products$ = this.productService.getProductsByType(productsToShow);
            }
        );
    }

    ngOnInit(): void {
        this.featuredProducts$ = this.productService.getFeaturedProducts();
    }

    ngOnDestroy(): void {
        this.paramMapSubscription$.unsubscribe();
    }
}
