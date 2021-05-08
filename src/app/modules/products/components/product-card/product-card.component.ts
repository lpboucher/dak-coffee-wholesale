import { Component, Input, OnInit } from '@angular/core';

import { Coffee } from "@app/shared/models/classes/coffee.interface";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
    @Input() product!: Coffee;

    get displayedDescription(): string[] {
        return this.product.type === "coffee" ? [this.product.process, this.product.varietal] : [this.product.description];
    }

    get displayedDetails(): string[] {
        return this.product.type === "coffee" ? [this.product.origin, this.product.tastingNotes] : [this.product.description];
    }

    constructor() { }

    ngOnInit(): void {
    }

    onClick(): void {
        console.log(this.product);
    }
}
