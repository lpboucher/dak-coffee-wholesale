import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";
import { delay, map } from "rxjs/operators";

const KNOWN_BUSINESSES: string[] = ["business1", "business2", "business3"];

function dummyCheckBusinessRemoteCall(businessName: string): Observable<boolean> {
    return of(KNOWN_BUSINESSES.includes(businessName))
        .pipe(delay(2000));
}

export function BusinessExists(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        if (control.value == null) return of(null);

        return dummyCheckBusinessRemoteCall(control.value)
            .pipe(
                map(res => res ? { businessNameInUse: true } : null)
            );
    }
}
