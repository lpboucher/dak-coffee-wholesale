import { Component, OnInit } from "@angular/core";

import { NAVIGATION } from "@app/utils/constants/navigation";

@Component({
    selector: "app-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
    navigation = NAVIGATION;

    constructor() { }

    ngOnInit(): void {
    }

}
