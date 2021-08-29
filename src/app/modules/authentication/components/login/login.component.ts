import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, AbstractControl } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "@core/authentication/authentication.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
    readonly minPasswordCharacters = 8;
    submissionAttempted = false;
    asyncErrorMessage = "";
    loginForm = this.fb.group({
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(this.minPasswordCharacters)]],
    });

    get emailControl(): AbstractControl {
        return this.control("email")!;
    }

    get passwordControl(): AbstractControl {
        return this.control("password")!;
    }

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
    ) { }

    ngOnInit(): void {
    }

    onSubmitLogin(): void {
        if (this.loginForm.valid) {
            this.authService.login(this.emailControl.value, this.passwordControl.value)
                .subscribe(
                    ({ loggedIn, walletValue }) => {
                        if (loggedIn) {
                            const routeExtension = walletValue === 0 ? { queryParams: { checkPricing: true } } : {};
                            this.router.navigate(["/"], routeExtension);
                        }
                    },
                    (err) => {
                        this.submissionAttempted = true;
                        const errDict: {[code: number]: string} = {
                            401: "Incorrect combination of email/password.",
                            403: "Account is still locked, please wait for confirmation.",
                            404: "Email does not exist, are you registered?.",
                        };
                        this.asyncErrorMessage = errDict[err.status] || "It looks like we were not able to log you in, please try again.";
                    },
                );
        }
    }

    hasErrors(controlName: string): boolean {
        return (this.control(controlName)?.invalid
            && (this.control(controlName)?.dirty || this.control(controlName)?.touched))
            ?? false;
    }

    private control(name: string): AbstractControl | null {
        return this.loginForm.get(name);
    }
}

