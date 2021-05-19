import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { take, map } from "rxjs/operators";

import { Coffee } from "@shared/models/classes/coffee.class";
import { Product } from "@shared/models/classes/product.class";
import { ProductType } from "@shared/models/types/product-type.type";
import { Merchandise } from "@shared/models/classes/merchandise.class";

@Injectable({
    providedIn: "root"
})
export class ProductService {
    products: Product[] = [
        new Coffee({
            id: "0",
            name: "The Alchemist",
            price: "$15.00",
            slug: "alchemist",
            collection: "featured",
            origin: "Rawanda",
            tastingNotes: "Mango, Pineapple, Kiwi, Honey, Dark Chocolate",
            process: "Experimental Natural",
            varietal: "Bourbon",
        }),
        new Coffee({
            id: "1",
            name: "La Terraza",
            price: "$24.00",
            slug: "terraza",
            collection: "featured",
            origin: "Colombia",
            tastingNotes: "White Flower, Pomegranate, Honeycomb, Raspberry",
            process: "Honey",
            varietal: "Geisha",
        }),
        new Coffee({
            id: "2",
            name: "La Dalia",
            price: "$15.00",
            slug: "dalia",
            collection: "featured",
            origin: "Salvador",
            tastingNotes: "Green Apple, Red Currant, Strawberry",
            process: "48hrs Anaerobic",
            varietal: "Pacamara",
        }),
        new Coffee({
            id: "3",
            name: "El Diviso",
            price: "$16.00",
            slug: "diviso",
            collection: "upcoming",
            origin: "Colombia",
            tastingNotes: "Grapefruit, Orange, Peach, Sugar",
            process: "Washed",
            varietal: "Pink Bourbon",
        }),
        new Coffee({
            id: "4",
            name: "Rusatira",
            price: "$15.90",
            slug: "rusatira",
            origin: "Rwanda",
            tastingNotes: "Red Grapes, Peach, Nougat, Green Tea",
            process: "Wet Natural Anaerobic",
            varietal: "Red Bourbon",
        }),
        new Coffee({
            id: "5",
            name: "Aurora",
            price: "$11.00",
            slug: "aurora",
            origin: "Nicaragua",
            tastingNotes: "Hazelnut, Honey, Lime, Rose Hips, Stone Fruit",
            process: "Natural",
            varietal: "Paraneima",
        }),
        new Coffee({
            id: "6",
            name: "Nuna II",
            price: "$14.00",
            slug: "nuna-ii",
            origin: "Colombia",
            tastingNotes: "Black Cherry, Guava, Sugar",
            process: "Natural",
            varietal: "Castillo",
        }),
        new Coffee({
            id: "7",
            name: "Orange Cream",
            price: "$11.75",
            slug: "orange-cream",
            origin: "Colombia",
            process: "Washed",
            varietal: "Caturra",
            tastingNotes: "Orange, Marshmallow, Pear, Cane Sugar",
        }),
        new Merchandise({
            id: "7",
            name: "Dak Tote Bag",
            price: "$14.00",
            collection: undefined,
            description: "Premium quality: 300 gr./m2",
            slug: "tote",
            dimensions: "41 x 42 cm",
            material: "Cotton",
        })
    ];

    constructor() { }

    getProducts(): Observable<Product[]> {
        return of(this.products);
    }

    getOne(slug: string): Observable<Product | undefined> {
        return of(this.products)
            .pipe(
                map(arr => arr.find(p => p.slug === slug))
            );
    }

    getFeaturedProducts(): Observable<Product[]> {
        return this.getProducts()
            .pipe(
                map(arr =>
                    arr.filter(p => p.collection === "featured")
                        .slice(0, 2)),
                take(2)
            );
    }

    getProductsByType(productType?: ProductType | "all"): Observable<Product[]> {
        if (productType === undefined || productType === "all") {
            return this.getProducts();
        }

        return this.getProducts()
            .pipe(
                map(arr => arr.filter(p => p.productType === productType))
            );
    }
}
