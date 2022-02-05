import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";

import { Observable } from "rxjs";

import { USER_ID_KEY } from "@utils/constants/storage";

@Injectable({
    providedIn: "root"
})
export class HttpTokenInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log("intercepted");
        const idToken = localStorage.getItem(USER_ID_KEY);

        if (idToken) {
            /*const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + idToken)
            });

            return next.handle(cloned);*/
            return next.handle(req);
        }
        else {
            return next.handle(req);
        }
    }
}
