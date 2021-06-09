import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class PricingTierService {
    private isVolumeDiscountActive$ = new BehaviorSubject(false);

    get isDiscountActive(): Observable<boolean> {
        return this.isVolumeDiscountActive$.asObservable();
    }

    constructor() { }

    toggleDiscount(): void {
        this.isVolumeDiscountActive$.next(!this.isVolumeDiscountActive$.value);
    }
}
