import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductApiService } from "@core/products/product-api.service";
import { Observable } from "rxjs";

import { Product } from "@shared/models/classes/product.class";

@Component({
    selector: "app-single-product",
    templateUrl: "./single-product.page.html",
    styleUrls: ["./single-product.page.scss"]
})
export class SingleProductPageComponent implements OnInit {
    product$!: Observable<Product | undefined>;
    relatedProducts$?: Observable<Product[]>;
   
    constructor(
        private route: ActivatedRoute,
        private productService: ProductApiService,
    ) { }

    ngOnInit(): void {
        const slug = this.route.snapshot.paramMap.get("slug");
        if (slug === null) {
            return;
        }

        this.product$ = this.productService.getProduct(slug);
        this.relatedProducts$ = this.productService.getRelatedProducts(slug);
    }
}
