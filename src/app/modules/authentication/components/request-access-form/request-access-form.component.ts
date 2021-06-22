import { Component } from "@angular/core";
import { AbstractControl, FormBuilder, Validators } from "@angular/forms";

import { AuthService } from "@core/authentication/authentication.service";

@Component({
    selector: "app-request-access-form",
    templateUrl: "./request-access-form.component.html",
    styleUrls: ["./request-access-form.component.scss"]
})
export class RequestAccessFormComponent {

    requestAccessForm = this.fb.group({
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(8)]],
        passwordConfirm: ["", Validators.required],
        contactName: ["", Validators.required],
        businessName: ["", Validators.required],
        sector: ["", Validators.required],
        vatNumber: [""],
    });

    get contactNameControl(): AbstractControl {
        return this.control("contactName")!;
    }

    get businessNameControl(): AbstractControl {
        return this.control("businessName")!;
    }

    get emailControl(): AbstractControl {
        return this.control("email")!;
    }

    get passwordControl(): AbstractControl {
        return this.control("password")!;
    }

    get passwordConfirmControl(): AbstractControl {
        return this.control("passwordConfirm")!;
    }

    get sectorControl(): AbstractControl {
        return this.control("sector")!;
    }

    get vatNumberControl(): AbstractControl {
        return this.control("vatNumber")!;
    }

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
    ) {}

    onSubmitRegistration(): void {
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
        return control.invalid && (control.dirty || control.touched);
    }

    private control(name: string): AbstractControl | null {
        return this.requestAccessForm.get(name);
    }
}
