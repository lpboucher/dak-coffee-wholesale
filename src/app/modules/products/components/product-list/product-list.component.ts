import { Component, OnInit, Input } from "@angular/core";

import { Product } from "@shared/models/classes/product.class";

@Component({
    selector: "app-product-list",
    templateUrl: "./product-list.component.html",
    styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
    @Input() products: Product[] = [];

    constructor() { }

    ngOnInit(): void {
    }
}
