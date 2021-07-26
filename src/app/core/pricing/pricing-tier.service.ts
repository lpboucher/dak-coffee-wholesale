import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { CART_WEIGHT_THRESHOLD } from "@utils/constants/discounts";
import { PREVIOUS_ORDER_PERCENTAGE_FOR_WALLET } from "@app/utils/constants/wallet";

const DUMMY_ORDER = { previousWalletBallance: 200, previousOrderTotal: 50 };

@Injectable({
    providedIn: "root"
})
export class PricingTierService {
    private isVolumeDiscountActive$ = new BehaviorSubject(false);
    private walletAmount = new BehaviorSubject(0);

    get isDiscountActive$(): Observable<boolean> {
        return this.isVolumeDiscountActive$.asObservable();
    }

    get isDiscountActive(): boolean {
        return this.isVolumeDiscountActive$.value;
    }

    get walletAmount$(): Observable<number> {
        return this.walletAmount.asObservable();
    }

    calculateWalletAmount(): void {
        this.walletAmount.next(
            DUMMY_ORDER.previousWalletBallance
                + (DUMMY_ORDER.previousOrderTotal * PREVIOUS_ORDER_PERCENTAGE_FOR_WALLET)
        );
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
