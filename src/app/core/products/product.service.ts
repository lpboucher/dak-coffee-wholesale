import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";

import { Coffee } from "@app/shared/models/classes/coffee.interface";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private products: Coffee[] = [
        {
            id: 0,
            name: "The Alchemist",
            origin: "Rawanda",
            price: "$15.00",
            process: "Experimental Natural",
            varietal: "Bourbon",
            description: "",
            tastingNotes: "Mango, Pineapple, Kiwi, Honey, Dark Chocolate",
            type: "coffee"
        },
        {
            id: 1,
            name: "La Terraza",
            origin: "Colombia",
            price: "$24.00",
            process: "Honey",
            varietal: "Geisha",
            description: "Honey, Geisha",
            tastingNotes: "White Flower, Pomegranate, Honeycomb, Raspberry",
            type: "coffee"
        },
        {
            id: 2,
            name: "La Dalia",
            origin: "Salvador",
            price: "$15.00",
            process: "48hrs Anaerobic",
            varietal: "Pacamara",
            description: "48hrs Anaerobic, Pacamara",
            tastingNotes: "Green Apple, Red Currant, Strawberry",
            type: "coffee"
        },
        {
            id: 3,
            name: "El Diviso",
            origin: "Colombia",
            price: "$16.00",
            process: "Washed",
            varietal: "Pink Bourbon",
            description: "Washed, Pink Bourbon",
            tastingNotes: "Grapefruit, Orange, Peach, Sugar",
            type: "coffee"
        },
        {
            id: 4,
            name: "Rusatira",
            origin: "Rwanda",
            price: "$15.90",
            process: "Wet Natural Anaerobic",
            varietal: "Red Bourbon",
            description: "Wet Natural Anaerobic, Red Bourbon",
            tastingNotes: "Red Grapes, Peach, Nougat, Green Tea",
            type: "coffee"
        },
        {
            id: 5,
            name: "Aurora",
            origin: "Nicaragua",
            price: "$11.00",
            process: "Natural",
            varietal: "Paraneima",
            description: "Natural, Paraneima",
            tastingNotes: "Hazelnut, Honey, Lime, Rose Hips, Stone Fruit",
            type: "coffee"
        },
        {
            id: 6,
            name: "Nuna II",
            origin: "Colombia",
            price: "$14.00",
            process: "Natural",
            varietal: "Castillo",
            description: "Natural, Castillo",
            tastingNotes: "Black Cherry, Guava, Sugar",
            type: "coffee"
        },
        {
            id: 7,
            name: "Orange Cream",
            origin: "Colombia",
            price: "$11.75",
            process: "Washed",
            varietal: "Caturra",
            description: "Washed, Caturra",
            tastingNotes: "Orange, Marshmallow, Pear, Cane Sugar",
            type: "coffee"
        },
    ];


    constructor() { }

    ngOnInit() {
    }

    getProducts(): Observable<Coffee[]> {
        return of(this.products);
    }
}
