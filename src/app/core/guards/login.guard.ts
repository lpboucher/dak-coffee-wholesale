import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "@core/authentication/authentication.service";

@Injectable({
    providedIn: "root"
})
export class LoginGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.authService.isLoggedIn()) {
            return true;
        }

        this.router.navigate(["auth"]);
        return false;
    }
}
