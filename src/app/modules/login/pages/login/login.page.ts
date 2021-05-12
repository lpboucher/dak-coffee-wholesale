import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";

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

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
    }

    onSubmitLogin() {
        console.log(this.loginForm.value);
        console.log(this.loginForm.status);
    }
}
