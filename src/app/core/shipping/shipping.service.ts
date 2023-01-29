import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment as config } from "@env";
import { DataApiService } from "@core/abstracts/data-api.service";

import { Parcel } from "@shared/models/classes/parcel.class";
import { ShippingAddress } from "@shared/models/interfaces/shipping-address.interface";
import { CartItem } from "@shared/models/interfaces/cart-item.interface";

@Injectable({
    providedIn: "root"
})
export class ShippingApiService extends DataApiService<Parcel> {

    constructor(
        protected http: HttpClient,
    ) {
        super(config.backendURL + "webhooks/shipping/labels", http, Parcel);
    }

    createShippingParcel(shippingAddress: ShippingAddress, email: string, invoiceNumber: string, items: CartItem[]): Observable<Parcel> {
        return this.create(new Parcel({ address: shippingAddress, email, invoiceNumber, items }));
    }
}
