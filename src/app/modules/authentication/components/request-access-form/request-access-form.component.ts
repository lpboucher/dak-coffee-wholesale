import { Component } from "@angular/core";
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

import { AuthService } from "@core/authentication/authentication.service";

import { SECTORS } from "@utils/constants/sectors";

@Component({
    selector: "app-request-access-form",
    templateUrl: "./request-access-form.component.html",
    styleUrls: ["./request-access-form.component.scss"]
})
export class RequestAccessFormComponent {
    private submissionAttempted = false;
    sectorOptions = SECTORS;

    requestAccessForm = this.fb.group(
        {
            email: ["", [Validators.required, Validators.email]],
            password: ["", [Validators.required, Validators.minLength(8)]],
            passwordConfirm: ["", Validators.required],
            contactName: ["", Validators.required],
            businessName: ["", Validators.required],
            sector: ["", Validators.required],
            vatNumber: [""],
        },
        {
            validators: [this.matchPasswordsValidator()],
        }
    );

    get contactNameControl(): AbstractControl {
        return this.requestAccessForm.get("contactName")!;
    }

    get businessNameControl(): AbstractControl {
        return this.requestAccessForm.get("businessName")!;
    }

    get emailControl(): AbstractControl {
        return this.requestAccessForm.get("email")!;
    }

    get passwordControl(): AbstractControl {
        return this.requestAccessForm.get("password")!;
    }

    get passwordConfirmControl(): AbstractControl {
        return this.requestAccessForm.get("passwordConfirm")!;
    }

    get sectorControl(): AbstractControl {
        return this.requestAccessForm.get("sector")!;
    }

    get vatNumberControl(): AbstractControl {
        return this.requestAccessForm.get("vatNumber")!;
    }

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
    ) {}

    onSubmitRegistration(): void {
        this.submissionAttempted = true;

        if (this.requestAccessForm.invalid) { return; }

        this.authService.register({
            contactName: this.contactNameControl.value,
            businessName: this.businessNameControl.value,
            email: this.emailControl.value,
            password: this.passwordControl.value,
            sector: this.sectorControl.value,
            vatNumber: this.vatNumberControl.value,
        });
    }

    hasErrors(control: AbstractControl): boolean {
        return control.invalid && this.shouldShowErrors(control);
    }

    hasUnmatchedPasswords(): boolean {
        const errors = this.requestAccessForm.errors;
        return errors != null
            && errors.hasOwnProperty("notMatching")
            && errors.notMatching === true
            && this.shouldShowErrors(this.passwordConfirmControl);
    }

    private shouldShowErrors(control: AbstractControl): boolean {
        return control.dirty || control.touched || this.submissionAttempted;
    }

    private matchPasswordsValidator(): ValidatorFn {
        return (formGroup: AbstractControl): ValidationErrors | null => {
            const passwordControlValue = formGroup.get("password")?.value;
            const passwordConfirmControlValue = formGroup.get("passwordConfirm")?.value;

            if (passwordControlValue == null || passwordConfirmControlValue == null) { return null; }

            const passwordsMatch = passwordControlValue === passwordConfirmControlValue;
            return passwordsMatch ? null : { notMatching: true };
        };
    }
}