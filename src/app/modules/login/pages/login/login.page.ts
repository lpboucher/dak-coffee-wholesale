import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, AbstractControl } from "@angular/forms";
import { AuthService } from "@core/authentication/authentication.service";

@Component({
    selector: "app-login-page",
    templateUrl: "./login.page.html",
    styleUrls: ["./login.page.scss"],
})
export class LoginPageComponent implements OnInit {
    readonly minPasswordCharacters = 8;

    loginForm = this.fb.group({
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(this.minPasswordCharacters)]],
    });

    submissionAttempted = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
    }

    onSubmitLogin() {
        this.submissionAttempted = true;

        const VALID_FORM_STATUS = "VALID";
        if (this.loginForm.status !== VALID_FORM_STATUS) {
            return;
        }

        const input = this.loginForm.value;
        this.authService.login(input.email, input.password);
    }

    get emailControl(): AbstractControl {
        return this.control("email")!;
    }

    get passwordControl(): AbstractControl {
        return this.control("password")!;
    }

    shouldDisplayEmailError(): boolean {
        return this.shouldDisplayError(this.emailControl);
    }

    shouldDisplayPasswordError(): boolean {
        return this.shouldDisplayError(this.passwordControl);
    }

    shouldDisplayEmailMissing(): boolean {
        return this.shouldDisplayMissing(this.emailControl);
    }

    shouldDisplayPasswordMissing(): boolean {
        return this.shouldDisplayMissing(this.passwordControl);
    }

    shouldDisplayLoginFailed(): boolean {
        return this.submissionAttempted
            && this.loginForm.valid
            && !this.authService.isLoggedIn();
    }

    formEntryTouched(): void {
        this.submissionAttempted = false;
    }

    private control(name: string): AbstractControl | null {
        return this.loginForm.get(name);
    }

    private shouldDisplayError(control: AbstractControl): boolean {
        return this.submissionAttempted
            && control.invalid
            && !this.controlIsEmpty(control);
    }

    private shouldDisplayMissing(control: AbstractControl): boolean {
        return this.submissionAttempted
            && this.controlIsEmpty(control);
    }

    private controlIsEmpty(control: AbstractControl): boolean {
        return control.pristine;
    }
}
