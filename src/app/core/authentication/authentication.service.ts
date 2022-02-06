import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { combineLatest, from, Observable, of } from "rxjs";
import { concatMap, map, shareReplay, switchMap } from "rxjs/operators";

import { environment as config } from "@env";
import { DataApiService } from "@core/abstracts/data-api.service";
import { ErrorHandlerService } from "@core/errors/error-handler.service";
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

    get userEmail(): string {
        const snipcartState = (window as any).Snipcart.store.getState();
        return snipcartState.cart.email;
    }

    constructor(
        protected http: HttpClient,
        private router: Router,
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

    login(email: string, password: string ): Observable<Partial<ExistingUser & {loggedIn: boolean, expires: Date}>> {
        return this.loginSnipcartCustomer(email, password)
            .pipe(
                concatMap((res) => {
                    return combineLatest(
                        this.http.post<Partial<ExistingUser & { loggedIn: boolean, expires: Date }>>(
                            this.url + "login/",
                            { email, password, sessionToken: res.sessionToken }
                        ),
                        of(res),
                    );
                }),
                map(([backendRes, frontendRes]) => {
                    if (backendRes.loggedIn && frontendRes.loggedIn) {
                        console.log(backendRes);
                        this.setSession(frontendRes.sessionToken, new Date(backendRes.expires!));
                        return { ...backendRes, snipcartSessionToken: frontendRes.sessionToken };
                    } else {
                        throw new Error("Error during authentication");
                    }
                }),
                shareReplay()
            );
    }

    logout(): void {
        this.storageService.remove(USER_ID_KEY);
        this.storageService.remove(WALLET_AMOUNT_KEY);
        this.storageService.remove(USER_EXPIRY);
        this.router.navigate(["auth", "login"]);
    }

    isLoggedIn(): boolean {
        const now = new Date();
        const expiry = this.storageService.get(USER_EXPIRY);
        const sessionIsSet = this.storageService.get(USER_ID_KEY) != null;
        const isNotExpired = +expiry?.valueOf()! > now.valueOf();
        return sessionIsSet && isNotExpired;
    }

    userExists(value: string, type: string = "email"): Observable<{valueTaken: boolean}> {
        const queryParam = type != null ? `?type=${type}` : "";
        return this.http.get<{valueTaken: boolean}>(`${this.url}validate/${value}${queryParam}`);
    }

    private setSession(id: string, expiresAt: Date): void {
        this.storageService.set(USER_ID_KEY, id);
        this.storageService.set(USER_EXPIRY, expiresAt.valueOf());
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

    private loginSnipcartCustomer(email: string, password: string): Observable<any> {
        return from((window as any).Snipcart.api.customer.signin(email, password)
            .then((snip: any) => {
                return { loggedIn: true, sessionToken: snip.sessionToken };
            })
            .catch((err: any): void => {
                this.errorService.processError(err, "Unable to login customer");
            }));
    }
}
