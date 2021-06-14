import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class PricingTierService {
    private static ITEM_COUNT_THRESHOLD: number = 4;

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
        if (itemCount > PricingTierService.ITEM_COUNT_THRESHOLD) {
            this.toggleDiscount(true);
        }
    }
}
