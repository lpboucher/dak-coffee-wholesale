import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { tap, shareReplay } from "rxjs/operators";

const DEV = {
    user: "test@test.com",
    password: "test1234",
    token: "12345678test"
};

@Injectable({
  providedIn: "root"
})
export class AuthService {

    constructor(private http: HttpClient) {
    }

    login(email: string, password: string ): void {
        if (email === DEV.user && password === DEV.password) {
            console.log("successfully logged in");
            this.setSession(DEV.token);
        }
        // no API, use dummy user object for now
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
