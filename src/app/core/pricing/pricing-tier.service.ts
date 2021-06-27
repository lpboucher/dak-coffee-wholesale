import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

const ITEM_COUNT_THRESHOLD: number = 4;

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

    updateDiscount(itemCount: number): void {
        this.toggleDiscount(itemCount > ITEM_COUNT_THRESHOLD);
    }
}
