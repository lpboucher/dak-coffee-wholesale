import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "@core/products/product.service";
import { Observable } from "rxjs";

import { Product } from "@shared/models/classes/product.class";

@Component({
    selector: "app-single-product",
    templateUrl: "./single-product.page.html",
    styleUrls: ["./single-product.page.scss"]
})
export class SingleProductPageComponent implements OnInit {
    product?: Observable<Product | undefined>;

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
    ) { }

    ngOnInit(): void {
        this.route.paramMap
            .subscribe(params => {
                const slug = params.get("slug");
                if (slug === null) {
                    return;
                }

                this.product = this.productService.getOne(slug);
            });
    }
}
