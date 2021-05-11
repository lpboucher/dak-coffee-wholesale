import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { ProductService } from "@core/products/product.service";

import { Product } from "@shared/models/classes/product.class";
import { Coffee } from "@shared/models/classes/coffee.class";

@Component({
    selector: "app-product-list",
    templateUrl: "./product-list.component.html",
    styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
    products$: Observable<Product[]> = new Observable();
    products: Product[] = [
        new Coffee({
            id: "0",
            name: "The Alchemist",
            price: "$15.00",
            description: "",
            origin: "Rawanda",
            tastingNotes: "Mango, Pineapple, Kiwi, Honey, Dark Chocolate",
            process: "Experimental Natural",
            varietal: "Bourbon"
        }),
        new Coffee({
            id: "1",
            name: "La Terraza",
            price: "$24.00",
            origin: "Colombia",
            tastingNotes: "White Flower, Pomegranate, Honeycomb, Raspberry",
            process: "Honey",
            varietal: "Geisha",
        }),
        new Coffee({
            id: "2",
            name: "La Dalia",
            price: "$15.00",

            origin: "Salvador",
            tastingNotes: "Green Apple, Red Currant, Strawberry",
            process: "48hrs Anaerobic",
            varietal: "Pacamara",
        }),
        new Coffee({
            id: "3",
            name: "El Diviso",
            price: "$16.00",
            origin: "Colombia",
            tastingNotes: "Grapefruit, Orange, Peach, Sugar",
            process: "Washed",
            varietal: "Pink Bourbon",
        }),
        new Coffee({
            id: "4",
            name: "Rusatira",
            price: "$15.90",

            origin: "Rwanda",
            tastingNotes: "Red Grapes, Peach, Nougat, Green Tea",
            process: "Wet Natural Anaerobic",
            varietal: "Red Bourbon",
        }),
        new Coffee({
            id: "5",
            name: "Aurora",
            price: "$11.00",
            origin: "Nicaragua",
            tastingNotes: "Hazelnut, Honey, Lime, Rose Hips, Stone Fruit",
            process: "Natural",
            varietal: "Paraneima",
        }),
        new Coffee({
            id: "6",
            name: "Nuna II",
            price: "$14.00",

            origin: "Colombia",
            tastingNotes: "Black Cherry, Guava, Sugar",
            process: "Natural",
            varietal: "Castillo",
        }),
        new Coffee({
            id: "7",
            name: "Orange Cream",
            price: "$11.75",
            origin: "Colombia",

            process: "Washed",
            varietal: "Caturra",
            tastingNotes: "Orange, Marshmallow, Pear, Cane Sugar",
        }),
    ];

    constructor(private productService: ProductService) { }

    ngOnInit(): void {
        this.products$ = this.productService.getProducts();
    }

}
