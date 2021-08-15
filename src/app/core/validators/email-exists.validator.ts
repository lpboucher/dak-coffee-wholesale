import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";
import { delay, map } from "rxjs/operators";

const TAKEN_EMAILS: string[] = ["taken1@test.com", "taken2@test.com", "taken3@test.com"];

function dummyCheckEmailRemoteCall(email: string): Observable<boolean> {
    return of(TAKEN_EMAILS.includes(email)).pipe(delay(2000));
}

export function EmailExists(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        if (control.value == null) return of(null);

        // TODO check both backend and snipcart for existing email
        return dummyCheckEmailRemoteCall(control.value)
            .pipe(
                map(res => res ? { emailTaken: true } : null)
            );
    }
}
