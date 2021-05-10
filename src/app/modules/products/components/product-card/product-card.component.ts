import { Component, Input, OnInit } from '@angular/core';

import { Product } from "@app/shared/models/classes/product.class";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
    @Input() product!: Product;

    get displayedDescription(): string[] {
        return this.product.displayedDescription;
    }

    get displayedDetails(): string[] {
        return this.product.displayedDetails;
    }

    constructor() { }

    ngOnInit(): void {
    }

    onClick(): void {
        console.log(this.product);
    }
}
