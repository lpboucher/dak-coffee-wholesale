import { Component, Input } from "@angular/core";

@Component({
    selector: "app-slide-open-menu",
    templateUrl: "./slide-open-menu.component.html",
    styleUrls: ["./slide-open-menu.component.scss"]
})
export class SlideOpenMenuComponent {
    @Input() title = "";
    showContent: boolean = false;

    onClickHeader(): void {
        this.showContent = !this.showContent;
    }
}
