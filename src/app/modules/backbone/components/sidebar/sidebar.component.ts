import { Component, OnInit } from "@angular/core";

import { AuthService } from "@core/authentication/authentication.service";

import { NAVIGATION } from "@app/utils/constants/navigation";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
    navigation = NAVIGATION;
    openLabel = "";

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
    }

    onLogoutClicked(): void {
        this.authService.logout();
    }
}
