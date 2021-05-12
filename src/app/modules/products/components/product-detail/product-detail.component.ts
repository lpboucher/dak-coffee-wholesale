import { Component, OnInit, Input } from "@angular/core";
import { Product } from "@shared/models/classes/product.class";

@Component({
    selector: "app-product-detail",
    templateUrl: "./product-detail.component.html",
    styleUrls: ["./product-detail.component.scss"]
})
export class ProductDetailComponent implements OnInit {
    @Input() product!: Product;

    constructor() { }

    ngOnInit(): void {
    }
}
