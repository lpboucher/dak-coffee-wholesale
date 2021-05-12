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
        const VALID_FORM_STATUS = "VALID";
        if (this.loginForm.status !== VALID_FORM_STATUS) {
            return;
        }

        const input = this.loginForm.value;
        this.authService.login(input.email, input.password);
    }
}
