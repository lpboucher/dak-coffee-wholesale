import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";

export function emailExists(email: string): AsyncValidatorFn {
    return (formGroup: AbstractControl): Observable<ValidationErrors | null> => {
        return new Observable();
    }
}
