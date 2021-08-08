import { Component } from "@angular/core";
import { AbstractControl, FormBuilder, Validators } from "@angular/forms";
import { BusinessExists } from "@core/validators/business-exists.validator";

import { AuthService } from "@core/authentication/authentication.service";
import { PasswordMatch } from "@core/validators/password-match.validator";
import { EmailExists } from "@core/validators/email-exists.validator";

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
            email: [
                "",
                {
                    validators: [Validators.required, Validators.email],
                    asyncValidators: [EmailExists()],
                    updateOn: "blur",
                }
            ],
            password: ["", [Validators.required, Validators.minLength(8)]],
            passwordConfirm: ["", Validators.required],
            contactName: ["", Validators.required],
            businessName: [
                "",
                {
                    validators: [Validators.required],
                    asyncValidators: [BusinessExists()],
                    updateOn: "blur",
                }
            ],
            sector: ["", Validators.required],
            vatNumber: [""],
        },
        {
            validators: [PasswordMatch("password", "passwordConfirm")],
        }
    );

    get hasUnmatchedPasswords(): boolean {
        return this.requestAccessForm.errors?.notMatching === true
            && this.shouldShowErrors(this.passwordConfirmControl);
    }

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

    private shouldShowErrors(control: AbstractControl): boolean {
        return control.dirty || control.touched || this.submissionAttempted;
    }
}
