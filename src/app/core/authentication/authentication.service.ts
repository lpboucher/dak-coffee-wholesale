import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { from, Observable } from "rxjs";
import { concatMap, map, switchMap, tap } from "rxjs/operators";

import { environment as config } from "@env";
import { DataApiService } from "../abstracts/data-api.service";
import { PricingTierService } from "@core/pricing/pricing-tier.service";
import { ErrorHandlerService } from "@core/errors/error-handler.service";
import { CartService } from "@core/cart/cart.service";
import { PersistenceService } from "@core/storage/persistence.service";

import { NewCustomer } from "@shared/models/classes/new-customer.class";
import { NewUser } from "@shared/models/classes/new-user.class";
import { CreatedSnipcartCustomer } from "@shared/models/interfaces/created-snipcart-customer.interface";

import { USER_ID_KEY } from "@utils/constants/storage";

const DEV = {
    user: "test@test.com",
    password: "test1234",
    token: "12345678test"
};

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
                    return this.http.post<{registered: boolean}>(this.url, userToBeCreated, this.requestOptions);
                })
            )
    }

    login(email: string, password: string ): void {
        // no API, use dummy user object for now
        console.log(email, password);
        if (email === DEV.user && password === DEV.password) {
            console.log("successfully logged in");
            this.setSession(DEV.token);
            this.router.navigate(["/"], { queryParams: { checkPricing: true } });

            this.pricingTierService.calculateWalletAmount();
            this.cartService.applyDiscount();
        }


        // TODO implement proper auth
        /*return this.http.post<User>('/api/login', {email, password}).pipe(
            tap(res => this.setSession),
            shareReplay()
        );*/
        // return of(new HttpResponse({ status: 200, body }))
    }

    logout(): void {
        this.storageService.remove(USER_ID_KEY);
        // TODO need to also remove expiry
        // localStorage.removeItem("expires_at");
        this.router.navigate(["auth", "login"]);
    }

    isLoggedIn(): boolean {
        const token = this.storageService.get(USER_ID_KEY);
        return token === DEV.token;
    }

    private setSession(id: string): void {
        this.storageService.set(USER_ID_KEY, id);
        // TODO need to also set expiry
        // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
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
