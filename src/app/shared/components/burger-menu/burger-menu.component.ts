import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: "app-burger-menu",
    templateUrl: "./burger-menu.component.html",
    styleUrls: ["./burger-menu.component.scss"]
})
export class BurgerMenuComponent {
    @Output() clickEvent: EventEmitter<any> = new EventEmitter();

    onClick(): void {
        this.clickEvent.emit();
    }
}
