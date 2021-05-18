import { Component, Input, OnInit } from "@angular/core";

import { NavigationItemType } from "@utils/constants/navigation";

@Component({
    selector: "app-nav-item",
    templateUrl: "./nav-item.component.html",
    styleUrls: ["./nav-item.component.scss"]
})
export class NavItemComponent implements OnInit {
    @Input() rawNavData!: NavigationItemType;
    @Input() parentLink: string = "";

    label: string = "";
    link: string = "";
    children: NavigationItemType[] = [];
    isOpen = false;

    constructor() { }

    ngOnInit(): void {
        this.label = this.rawNavData.label;
        this.link = this.parentLink + this.rawNavData.link;
        this.children = this.rawNavData.children;
    }

    onClick(): void {
        this.isOpen = !this.isOpen;
    }

    onBlur(): void {
        this.isOpen = false;
    }

    onClickChild(): void {
        this.isOpen = false;
    }
}
