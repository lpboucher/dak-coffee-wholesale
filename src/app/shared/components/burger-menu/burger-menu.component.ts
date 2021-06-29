import { Component, Input } from "@angular/core";

@Component({
    selector: "app-burger-menu",
    templateUrl: "./burger-menu.component.html",
    styleUrls: ["./burger-menu.component.scss"]
})
export class BurgerMenuComponent {
    @Input() onBurgerMenuClick: () => void = () => {};
}
