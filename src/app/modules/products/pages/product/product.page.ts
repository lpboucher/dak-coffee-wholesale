import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { ProductService } from "@app/core/products/product.service";

import { Product } from "@app/shared/models/classes/product.class";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-product",
    templateUrl: "./product.page.html",
    styleUrls: ["./product.page.scss"]
})
export class ProductPageComponent implements OnInit {
    products$: Observable<Product[]> = new Observable();

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        const productsToShow = this.route.snapshot.data["productType"];
        this.products$ = this.productService.getProductsByType(productsToShow);
    }
}
