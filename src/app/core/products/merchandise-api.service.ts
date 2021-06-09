import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment as config } from "@env";
import { Merchandise } from "@shared/models/classes/merchandise.class";
import { DataApiService } from "@core/abstracts/data-api.service";

@Injectable({
    providedIn: "root"
})
export class MerchandiseApiService extends DataApiService<Merchandise> {

    constructor(protected http: HttpClient) {
        super(config.backendURL + "wholesale/", http, Merchandise);
    }

    getMerchandise(): Observable<Merchandise[]> {
        return this.getAll("merchandises?isActive=true");
    }

    getMerchandiseItem(slug: string): Observable<Merchandise | undefined> {
        return this.getOne(`merchandise/${ slug }`);
    }
}
