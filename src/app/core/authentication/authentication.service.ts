import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { PricingTierService } from "@core/pricing/pricing-tier.service";
import { CartService } from "@core/cart/cart.service";

import { NewCustomer } from "@shared/models/classes/new-customer.class";

const DEV = {
    user: "test@test.com",
    password: "test1234",
    token: "12345678test"
};

@Injectable({
  providedIn: "root"
})
export class AuthService {

    constructor(
        private http: HttpClient,
        private router: Router,
        private pricingTierService: PricingTierService,
        private cartService: CartService,
    ) {}

    register(newCustomer: NewCustomer): void {
        console.log(newCustomer);
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
        localStorage.removeItem("id_token");
        // TODO need to also remove expiry
        // localStorage.removeItem("expires_at");
        this.router.navigate(["auth", "login"]);
    }

    isLoggedIn(): boolean {
        const token = localStorage.getItem("id_token");
        return token === DEV.token;
    }

    private setSession(id: string): void {

        localStorage.setItem("id_token", id);
        // TODO need to also set expiry
        // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }
}
