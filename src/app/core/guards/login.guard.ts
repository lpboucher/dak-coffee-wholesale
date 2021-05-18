import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable, of } from "rxjs";

import { BaseGuardService } from "@core/abstracts/base-guard.service";
import { AuthService } from "@core/authentication/authentication.service";

@Injectable({
    providedIn: "root"
})
export class LoginGuard extends BaseGuardService implements CanActivate {

    constructor(private authService: AuthService, protected router: Router) {
        super(router);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        if (this.authService.isLoggedIn()) {
            return of(true);
        }

        this.navigateToLogin();
        return of(false);
    }
}
