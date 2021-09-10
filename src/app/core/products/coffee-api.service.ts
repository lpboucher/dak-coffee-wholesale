import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment as config } from "@env";
import { DataApiService } from "@core/abstracts/data-api.service";

import { Coffee } from "@shared/models/classes/coffee.class";

@Injectable({
    providedIn: "root"
})
export class CoffeeApiService extends DataApiService<Coffee> {

    constructor(protected http: HttpClient) {
        super(config.backendURL + "wholesale/", http, Coffee);
    }

    getCoffees(): Observable<Coffee[]> {
        return this.getAll("coffees?isActive=true");
    }

    getCoffee(slug: string): Observable<Coffee> {
        return this.getOne(`coffee/${ slug }`);
    }
}
