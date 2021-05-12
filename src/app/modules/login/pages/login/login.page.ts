import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
    selector: "app-login-page",
    templateUrl: "./login.page.html",
    styleUrls: ["./login.page.scss"],
})
export class LoginPageComponent implements OnInit {
    loginForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
    });

    constructor() { }

    ngOnInit(): void {
    }

    onSubmitLogin() {
        console.log(this.loginForm.value);
    }
}
