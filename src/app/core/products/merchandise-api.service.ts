import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

import { Merchandise } from "@shared/models/classes/merchandise.class";

@Injectable({
    providedIn: "root"
})
export class MerchandiseApiService {
    merchandise: Merchandise[] = [
        new Merchandise({
            id: "7",
            name: "Dak Tote Bag",
            price: "14.00",
            collection: undefined,
            description: "Premium quality: 300 gr./m2",
            slug: "tote",
            dimensions: "41 x 42 cm",
            material: "Cotton",
        })
    ];

    constructor() {}

    getMerchandise(): Observable<Merchandise[]> {
        return of(this.merchandise);
    }

    getMerchandiseItem(slug: string): Observable<Merchandise | undefined> {
        return this.getMerchandise()
            .pipe(
                map(arr => arr.find(p => p.slug === slug))
            );
    }
}
