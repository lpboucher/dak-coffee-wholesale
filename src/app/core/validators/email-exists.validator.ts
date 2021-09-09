import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { AuthService } from "@core/authentication/authentication.service";

import { isEmptyInputValue } from "@utils/helper";

@Injectable({
    providedIn: "root"
})
export class EmailExistsValidator implements AsyncValidator {
    constructor(private authService: AuthService) {}

    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        if (isEmptyInputValue(control.value)) {
            return of(null);
        }

        return this.authService.userExists(control.value)
            .pipe(
                map(({valueTaken}) => {
                    return valueTaken ? { emailTaken: true} : null;
                }),
                catchError(() => of(null))
            );
    }
}
