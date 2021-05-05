import { Component, OnInit } from '@angular/core';
import { Observable, of } from "rxjs";

interface Product {
    name: string;
    price: string;
    category: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
    products$: Observable<Product[]> = new Observable();
    products: Product[] = [
        {name: "Nuna", price: "$15.00", category: "coffee"},
        {name: "Terraza", price: "$20.00", category: "coffee"},
        {name: "Vargem", price: "$17.00", category: "coffee"},
    ];

  constructor() { }

  ngOnInit(): void {
      this.products$ = of(this.products);
  }

}
