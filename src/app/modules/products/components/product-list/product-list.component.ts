import { Component, OnInit } from '@angular/core';
import { Observable, of } from "rxjs";

import { Product } from "@app/shared/models/classes/product.class";
import { Coffee } from "@app/shared/models/classes/coffee.class";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
    products$: Observable<Product[]> = new Observable();
    products: Product[] = [
        new Coffee(
            0,
            "The Alchemist",
            "$15.00",
            "",

            "Rawanda",
            "Mango, Pineapple, Kiwi, Honey, Dark Chocolate",
            "Experimental Natural",
            "Bourbon"
        ),
        new Coffee(
            1,
            "La Terraza",
            "$24.00",
            "Honey, Geisha",

            "Colombia",
            "White Flower, Pomegranate, Honeycomb, Raspberry",
            "Honey",
            "Geisha",
        ),
        new Coffee(
            2,
            "La Dalia",
            "$15.00",
            "48hrs Anaerobic, Pacamara",

            "Salvador",
            "Green Apple, Red Currant, Strawberry",
            "48hrs Anaerobic",
            "Pacamara",
        ),
        new Coffee(
            3,
            "El Diviso",
            "$16.00",
            "Washed, Pink Bourbon",

            "Colombia",
            "Grapefruit, Orange, Peach, Sugar",
            "Washed",
            "Pink Bourbon",
        ),
        new Coffee(
            4,
            "Rusatira",
            "$15.90",
            "Wet Natural Anaerobic, Red Bourbon",

            "Rwanda",
            "Red Grapes, Peach, Nougat, Green Tea",
            "Wet Natural Anaerobic",
            "Red Bourbon",
        ),
        new Coffee(
            5,
            "Aurora",
            "$11.00",
            "Natural, Paraneima",

            "Nicaragua",
            "Hazelnut, Honey, Lime, Rose Hips, Stone Fruit",
            "Natural",
            "Paraneima",
        ),
        new Coffee(
            6,
            "Nuna II",
            "$14.00",
            "Natural, Castillo",

            "Colombia",
            "Black Cherry, Guava, Sugar",
            "Natural",
            "Castillo",
        ),
        new Coffee(
            7,
            "Orange Cream",
            "$11.75",
            "Colombia",

            "Washed",
            "Washed, Caturra",
            "Caturra",
            "Orange, Marshmallow, Pear, Cane Sugar",
        ),
    ];

  constructor() { }

  ngOnInit(): void {
      this.products$ = of(this.products);
  }

}
