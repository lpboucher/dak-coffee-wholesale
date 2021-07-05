import { Component } from "@angular/core";

@Component({
    selector: "app-backbone",
    templateUrl: "./backbone.page.html",
    styleUrls: ["./backbone.page.scss"]
})
export class BackbonePageComponent {
    showSidebar: boolean = false;

    constructor() {}

    onShowSidebar(): void {
        this.showSidebar = true;
    }

    onHideSidebar(): void {
        this.showSidebar = false;
    }
}
