import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { AuthService } from "@core/authentication/authentication.service";

@Component({
    selector: "app-login-page",
    templateUrl: "./login.page.html",
    styleUrls: ["./login.page.scss"],
})
export class LoginPageComponent implements OnInit {
    loginForm = this.fb.group({
        email: ["", [Validators.required, Validators.email]],
        password: ["", Validators.required],
    });

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
    }

    onSubmitLogin() {
        if (this.loginForm.valid) {
            this.authService.login(this.email, this.password);
        }
    }

    get email(): string {
        return this.loginForm.get("email")?.value;
    }

    get password(): string {
        return this.loginForm.get("password")?.value;
    }
}
