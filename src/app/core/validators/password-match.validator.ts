import { ValidatorFn, ValidationErrors, AbstractControl } from "@angular/forms";

export function PasswordMatch(passwordControlName: string, passwordMatchControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        return null;
    };
}
