import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { CART_WEIGHT_THRESHOLD } from "@utils/constants/discounts";

@Injectable({
    providedIn: "root"
})
export class PricingTierService {
    private isVolumeDiscountActive$ = new BehaviorSubject(false);

    get isDiscountActive$(): Observable<boolean> {
        return this.isVolumeDiscountActive$.asObservable();
    }

    get isDiscountActive(): boolean {
        return this.isVolumeDiscountActive$.value;
    }

    constructor() {}

    toggleDiscount(value?: boolean): void {
        this.isVolumeDiscountActive$.next(value ?? !this.isVolumeDiscountActive$.value);
    }

    updateDiscount(cartWeight: number): void {
        if (cartWeight > CART_WEIGHT_THRESHOLD) {
            this.toggleDiscount(true);
        }
    }
}
