import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, AbstractControl } from "@angular/forms";
import { AuthService } from "@core/authentication/authentication.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
    readonly minPasswordCharacters = 8;
    submissionAttempted = false;
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
    ) { }

    ngOnInit(): void {
    }

    onSubmitLogin(): void {
        this.submissionAttempted = true;

        if (this.loginForm.valid) {
            this.authService.login(this.emailControl.value, this.passwordControl.value);
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

