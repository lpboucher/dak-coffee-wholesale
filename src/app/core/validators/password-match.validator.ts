import { ValidatorFn, ValidationErrors, AbstractControl } from "@angular/forms";

export function PasswordMatch(passwordControlName: string, passwordMatchControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        const passwordControlValue = formGroup.get(passwordControlName)?.value;
        const passwordConfirmControlValue = formGroup.get(passwordMatchControlName)?.value;

        if (passwordControlValue == null || passwordConfirmControlValue == null) { return null; }

        const passwordsMatch = passwordControlValue === passwordConfirmControlValue;
        return passwordsMatch ? null : { notMatching: true };
    };
}
