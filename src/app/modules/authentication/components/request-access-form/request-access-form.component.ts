import { Component } from "@angular/core";
import { AbstractControl, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AlertService } from "@core/alerts/alert.service";
import { AuthService } from "@core/authentication/authentication.service";
import { PasswordMatch } from "@core/validators/password-match.validator";
import { EmailExistsValidator } from "@core/validators/email-exists.validator";
import { BusinessExistsValidator } from "@core/validators/business-exists.validator";

import { NewCustomer } from "@shared/models/classes/new-customer.class";

import { SECTORS } from "@utils/constants/sectors";

@Component({
    selector: "app-request-access-form",
    templateUrl: "./request-access-form.component.html",
    styleUrls: ["./request-access-form.component.scss"]
})
export class RequestAccessFormComponent {
    private submissionAttempted = false;
    isSubmitting = false;
    sectorOptions = SECTORS;

    requestAccessForm = this.fb.group(
        {
            email: [
                "",
                {
                    validators: [Validators.required, Validators.email],
                    asyncValidators: [this.emailValidator.validate.bind(this.emailValidator)],
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
                    asyncValidators: [this.businessValidator.validate.bind(this.businessValidator)],
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

    get isSubmissionDisabled(): boolean {
        return this.requestAccessForm.invalid || this.requestAccessForm.pristine;
    }

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
        private router: Router,
        private alertService: AlertService,
        private emailValidator: EmailExistsValidator,
        private businessValidator: BusinessExistsValidator,
    ) {}

    onSubmitRegistration(): void {
        this.isSubmitting = true;
        this.submissionAttempted = true;

        if (this.requestAccessForm.invalid) {
            this.isSubmitting = false;
            return;
        }

        this.authService.register(new NewCustomer(this.requestAccessForm.value))
            .subscribe(
                (_) => this.router.navigate(["auth", "register", "success"]),
                (_) => {
                    this.isSubmitting = false;
                    this.alertService.error("It looks like we were not able to register you, check with info@dakcoffeeroasters.com")
                },
            );
    }

    hasErrors(control: AbstractControl): boolean {
        return control.invalid && this.shouldShowErrors(control);
    }

    private shouldShowErrors(control: AbstractControl): boolean {
        return control.dirty || control.touched || this.submissionAttempted;
    }
}
