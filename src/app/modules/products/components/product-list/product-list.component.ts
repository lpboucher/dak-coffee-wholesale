import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { ProductService } from "@core/products/product.service";

import { Product } from "@shared/models/classes/product.class";

@Component({
    selector: "app-product-list",
    templateUrl: "./product-list.component.html",
    styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
    products$: Observable<Product[]> = new Observable();

    constructor(private productService: ProductService) { }

    ngOnInit(): void {
        this.products$ = this.productService.getProducts();
    }
}
