import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, Subscription } from "rxjs";

import { ProductService } from "@core/products/product.service";
import { Product } from "@shared/models/classes/product.class";

@Component({
    selector: "app-product",
    templateUrl: "./product.page.html",
    styleUrls: ["./product.page.scss"]
})
export class ProductPageComponent implements OnInit, OnDestroy {
    private subscriptions = new Subscription();
    featuredProducts$: Observable<Product[]> = new Observable();
    products$: Observable<Product[]> = new Observable();

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.featuredProducts$ = this.productService.getFeaturedProducts();

        this.subscriptions.add(this.route.params
            .subscribe(
                ({productType}) => {
                    this.products$ = this.productService.getProductsByType(productType);
                }
            )
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
