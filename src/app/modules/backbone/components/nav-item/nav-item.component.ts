import { Component, Input, OnInit } from "@angular/core";

import { NavigationItemType } from "@utils/constants/navigation";

@Component({
    selector: "app-nav-item",
    templateUrl: "./nav-item.component.html",
    styleUrls: ["./nav-item.component.scss"]
})
export class NavItemComponent implements OnInit {
    @Input() label: string = "";
    @Input() link: string = "";
    @Input() children: NavigationItemType[] = [];

    constructor() { }

    ngOnInit(): void {
    }
}
