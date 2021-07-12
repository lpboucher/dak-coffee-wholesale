import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

const CART_WEIGHT_THRESHOLD: number = 7.5;

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
        this.toggleDiscount(cartWeight > CART_WEIGHT_THRESHOLD);
    }
}
