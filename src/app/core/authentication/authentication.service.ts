import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { from, Observable } from "rxjs";
import { shareReplay, switchMap, tap } from "rxjs/operators";

import { environment as config } from "@env";
import { DataApiService } from "@core/abstracts/data-api.service";
import { PricingTierService } from "@core/pricing/pricing-tier.service";
import { ErrorHandlerService } from "@core/errors/error-handler.service";
import { CartService } from "@core/cart/cart.service";
import { PersistenceService } from "@core/storage/persistence.service";

import { NewCustomer } from "@shared/models/classes/new-customer.class";
import { NewUser } from "@shared/models/classes/new-user.class";
import { ExistingUser } from "@shared/models/classes/existing-customer.class";
import { CreatedSnipcartCustomer } from "@shared/models/interfaces/created-snipcart-customer.interface";

import { USER_ID_KEY, USER_EXPIRY, WALLET_AMOUNT_KEY } from "@utils/constants/storage";

@Injectable({
  providedIn: "root"
})
export class AuthService extends DataApiService<NewUser> {

    constructor(
        protected http: HttpClient,
        private router: Router,
        private pricingTierService: PricingTierService,
        private cartService: CartService,
        private errorService: ErrorHandlerService,
        private storageService: PersistenceService,
    ) {
        super(config.backendURL + "customers/", http, NewUser);
    }

    register(newCustomer: NewCustomer): Observable<{registered: boolean}> {
        return this.createSnipcartCustomer(newCustomer.email, newCustomer.password)
            .pipe(
                switchMap(({snipcartCustomerId, snipcartSessionToken}: CreatedSnipcartCustomer) => {
                    const userToBeCreated = new NewUser({...newCustomer, snipcartCustomerId, snipcartSessionToken});
                    return this.http.post<{registered: boolean}>(this.url + "register/", userToBeCreated, this.requestOptions);
                })
            );
    }

    login(email: string, password: string ): Observable<Partial<ExistingUser & {loggedIn: boolean}>> {
        return this.http.post<Partial<ExistingUser & {loggedIn: boolean}>>(this.url + "login/", { email, password })
            .pipe(
                tap(({ loggedIn, walletValue, walletDiscountCode }) => {
                    if (loggedIn) {
                        (window as any).Snipcart.api.customer.signin(email, password)
                            .then((snip: any) => {
                                this.setSession(snip.sessionToken);
                                this.pricingTierService.toggleDiscount(walletValue !== 0);
                                this.pricingTierService.updateWalletAmount(walletValue);
                                this.cartService.applyDiscount(walletDiscountCode);
                            });
                    }
                }),
                shareReplay()
            );
    }

    logout(): void {
        this.storageService.remove(USER_ID_KEY);
        this.storageService.remove(WALLET_AMOUNT_KEY);
        // TODO need to also remove expiry
        // localStorage.removeItem(USER_EXPIRY);
        this.router.navigate(["auth", "login"]);
    }

    isLoggedIn(): boolean {
        // TODO need to also check expiry
        return this.storageService.get(USER_ID_KEY) != null;
        //const token = this.storageService.get(USER_ID_KEY);
        //return token === DEV.token;
    }

    private setSession(id: string): void {
        this.storageService.set(USER_ID_KEY, id);
        // TODO need to also set expiry
        // localStorage.setItem(USER_EXPIRY, JSON.stringify(expiresAt.valueOf()) );
    }

    private createSnipcartCustomer(email: string, password: string): Observable<any> {
        return from((window as any).Snipcart.api.customer.register(email, password, password)
            .then((res: any): CreatedSnipcartCustomer => {
                return {
                    snipcartCustomerId: res.customer.id,
                    snipcartSessionToken: res.sessionToken
                };
            })
            .catch((err: any): void => {
                this.errorService.processError(err, "Unable to create customer");
            })
        );
    }
}
