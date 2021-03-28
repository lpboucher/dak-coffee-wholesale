import { Component, OnInit } from "@angular/core";

import { AuthService } from "@core/authentication/authentication.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    title = "dak-wholesale";
    logString: string = "";

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        console.log(this.authService.isLoggedIn());
    }
}
