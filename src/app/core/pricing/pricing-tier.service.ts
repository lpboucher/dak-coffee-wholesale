import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { CART_WEIGHT_THRESHOLD } from "@utils/constants/discounts";
import { PREVIOUS_ORDER_PERCENTAGE_FOR_WALLET } from "@utils/constants/wallet";

const DUMMY_ORDER = { previousWalletBallance: 200, previousOrderTotal: 50 };

@Injectable({
    providedIn: "root"
})
export class PricingTierService {
    private isVolumeDiscountActive$ = new BehaviorSubject(false);
    private _walletAmount$ = new BehaviorSubject(0);

    get isDiscountActive$(): Observable<boolean> {
        return this.isVolumeDiscountActive$.asObservable();
    }

    get isDiscountActive(): boolean {
        return this.isVolumeDiscountActive$.value;
    }

    get walletAmount$(): Observable<number> {
        return this._walletAmount$.asObservable();
    }

    get walletAmount(): number {
        return this._walletAmount$.value;
    }

    calculateWalletAmount(): void {
        const { previousWalletBallance, previousOrderTotal } = DUMMY_ORDER;
        const newWalletAmount = previousWalletBallance + (previousOrderTotal * PREVIOUS_ORDER_PERCENTAGE_FOR_WALLET);
        this._walletAmount$.next(newWalletAmount);
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
