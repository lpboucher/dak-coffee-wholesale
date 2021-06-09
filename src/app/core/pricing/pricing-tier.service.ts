import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class PricingTierService {
    private isVolumeDiscountActive$ = new BehaviorSubject(false);
    toggleDiscount = () => this.isVolumeDiscountActive$.next(!this.isVolumeDiscountActive$.value);

    get isDiscountActive(): Observable<boolean> {
        return this.isVolumeDiscountActive$.asObservable();
    }

    constructor() {}
}
