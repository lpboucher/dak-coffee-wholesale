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
            name: "The Alchemist",
            origin: "Rawanda",
            price: "$15.00",
            description: "Experimental Natural, Bourbon",
            tastingNotes: "Mango, Pineapple, Kiwi, Honey, Dark Chocolate"
        },
        {
            name: "La Terraza",
            origin: "Colombia",
            price: "$20.00",
            description: "Honey, Geisha",
            tastingNotes: "White Flower, Pomegranate, Honeycomb, Raspberry"
        },
        {
            name: "La Dalia",
            origin: "Salvador",
            price: "$17.00",
            description: "48hrs Anaerobic, Pacamara",
            tastingNotes: "Green Apple, Red Currant, Strawberry"
        },
        {
            name: "El Diviso",
            origin: "Colombia",
            price: "$15.00",
            description: "Washed, Pink Bourbon",
            tastingNotes: "Grapefruit, Orange, Peach, Sugar"
        },
        {
            name: "Rusatira",
            origin: "Rwanda",
            price: "$20.00",
            description: "Wet Natural Anaerobic, Red Bourbon",
            tastingNotes: "Red Grapes, Peach, Nougat, Green Tea"
        },
        {
            name: "Aurora",
            origin: "Nicaragua",
            price: "$17.00",
            description: "Natural, Paraneima",
            tastingNotes: "Hazelnut, Honey, Lime, Rose Hips, Stone Fruit"
        },
        {
            name: "Nuna II",
            origin: "Colombia",
            price: "$15.00",
            description: "Natural, Castillo",
            tastingNotes: "Black Cherry, Guava, Sugar"
        },
        {
            name: "Orange Cream",
            origin: "Colombia",
            price: "$20.00",
            description: "Washed, Caturra",
            tastingNotes: "Orange, Marshmallow, Pear, Cane Sugar"
        },
        {
            name: "Espresso",
            origin: "Dak Monthly Subscription",
            price: "$17.00",
            description: "",
            tastingNotes: ""
        },
        {
            name: "Filter",
            origin: "Dak Monthly Subscription",
            price: "$15.00",
            description: "",
            tastingNotes: ""
        },
    ];

  constructor() { }

  ngOnInit(): void {
      this.products$ = of(this.products);
  }

}
