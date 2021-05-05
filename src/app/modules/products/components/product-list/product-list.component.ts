import { Component, OnInit } from '@angular/core';
import { Observable, of } from "rxjs";

import { Product } from "@modules/products/product.interface";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
    products$: Observable<Product[]> = new Observable();
    products: Product[] = [
        {
            id: 0,
            name: "The Alchemist",
            origin: "Rawanda",
            price: "$15.00",
            description: "Experimental Natural, Bourbon",
            tastingNotes: "Mango, Pineapple, Kiwi, Honey, Dark Chocolate"
        },
        {
            id: 1,
            name: "La Terraza",
            origin: "Colombia",
            price: "$24.00",
            description: "Honey, Geisha",
            tastingNotes: "White Flower, Pomegranate, Honeycomb, Raspberry"
        },
        {
            id: 2,
            name: "La Dalia",
            origin: "Salvador",
            price: "$15.00",
            description: "48hrs Anaerobic, Pacamara",
            tastingNotes: "Green Apple, Red Currant, Strawberry"
        },
        {
            id: 3,
            name: "El Diviso",
            origin: "Colombia",
            price: "$16.00",
            description: "Washed, Pink Bourbon",
            tastingNotes: "Grapefruit, Orange, Peach, Sugar"
        },
        {
            id: 4,
            name: "Rusatira",
            origin: "Rwanda",
            price: "$15.90",
            description: "Wet Natural Anaerobic, Red Bourbon",
            tastingNotes: "Red Grapes, Peach, Nougat, Green Tea"
        },
        {
            id: 5,
            name: "Aurora",
            origin: "Nicaragua",
            price: "$11.00",
            description: "Natural, Paraneima",
            tastingNotes: "Hazelnut, Honey, Lime, Rose Hips, Stone Fruit"
        },
        {
            id: 6,
            name: "Nuna II",
            origin: "Colombia",
            price: "$14.00",
            description: "Natural, Castillo",
            tastingNotes: "Black Cherry, Guava, Sugar"
        },
        {
            id: 7,
            name: "Orange Cream",
            origin: "Colombia",
            price: "$11.75",
            description: "Washed, Caturra",
            tastingNotes: "Orange, Marshmallow, Pear, Cane Sugar"
        },
        {
            id: 8,
            name: "Espresso",
            origin: "Dak Monthly Subscription",
            price: "$26.00",
            description: "",
            tastingNotes: ""
        },
        {
            id: 9,
            name: "Filter",
            origin: "Dak Monthly Subscription",
            price: "$26.00",
            description: "",
            tastingNotes: ""
        },
    ];

  constructor() { }

  ngOnInit(): void {
      this.products$ = of(this.products);
  }

}
