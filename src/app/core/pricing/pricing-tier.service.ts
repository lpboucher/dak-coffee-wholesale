import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

import { environment as config } from "@env";
import { PersistenceService } from "@core/storage/persistence.service";

import { CART_WEIGHT_THRESHOLD } from "@utils/constants/discounts";
import { PREVIOUS_ORDER_PERCENTAGE_FOR_WALLET } from "@utils/constants/wallet";
import { WALLET_AMOUNT_KEY, DISCOUNT_ACTIVE_KEY } from "@utils/constants/storage";

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

    constructor(
        protected http: HttpClient,
        private storageService: PersistenceService,
    ) {
        this.updateWalletAmount(this.retrieveWalletAmount());

        const activeDiscount = this.storageService.get(DISCOUNT_ACTIVE_KEY);

        if (activeDiscount === "45%" || this.walletAmount !== 0) {
            this.toggleDiscount(true);
        }
    }

    toggleDiscount(value?: boolean): void {
        const newValue = value ?? !this.isVolumeDiscountActive$.value;
        this.isVolumeDiscountActive$.next(newValue);

        this.storageService.set(DISCOUNT_ACTIVE_KEY, newValue ? "45%" : "30%");
    }

    updateDiscount(cartWeight: number): void {
        if (cartWeight > CART_WEIGHT_THRESHOLD && this.storageService.get(DISCOUNT_ACTIVE_KEY) !== "45%") {
            this.toggleDiscount(true);
        }
    }

    retrieveWalletAmount(): number {
        return parseFloat(this.storageService.get(WALLET_AMOUNT_KEY) ?? "0");
    }

    updateWalletAmount(newAmount: number = 0): void {
        let newWalletAmount: number;
        const existingWalletAmount = this.retrieveWalletAmount();

        if (existingWalletAmount !== newAmount) {
            newWalletAmount = newAmount;
            this.storageService.remove(WALLET_AMOUNT_KEY);
            this.storageService.set(WALLET_AMOUNT_KEY, newWalletAmount);
        } else {
            newWalletAmount = existingWalletAmount;
        }

        this._walletAmount$.next(newWalletAmount);
    }

    updateCustomerWallet(customerEmail: string, orderTotal: number): Observable<{updated: boolean}> {
        const newWalletAmount = this.calculateWalletAmount(orderTotal);
        this.updateWalletAmount(newWalletAmount);
        return this.http.put<{updated: boolean}>(
            config.backendURL + "customers/orders/" + customerEmail,
            { walletValue: newWalletAmount },
            {
                headers: new HttpHeaders().append("Content-Type", "application/json"),
                // withCredentials: true
            }
        );
    }

    calculateWalletAmount(orderTotal: number): number {
        return orderTotal * PREVIOUS_ORDER_PERCENTAGE_FOR_WALLET;
    }

    isPricingUpdateRequired(cartWeight: number): boolean {
        return cartWeight > CART_WEIGHT_THRESHOLD && this.storageService.get(DISCOUNT_ACTIVE_KEY) !== "45%";
    }
}
