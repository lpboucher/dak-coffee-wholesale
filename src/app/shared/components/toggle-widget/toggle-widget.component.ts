import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-toggle-widget",
    templateUrl: "./toggle-widget.component.html",
    styleUrls: ["./toggle-widget.component.scss"]
})
export class ToggleWidgetComponent {
    @Input() header: string = "";
    @Input() uncheckedOption: string = "";
    @Input() checkedOption: string = "";
    @Input() isChecked: boolean = false;
    @Output() toggle: EventEmitter<boolean> =  new EventEmitter();


    constructor() { }

    doToggle(): void {
        this.isChecked = !this.isChecked;
        this.toggle.emit(this.isChecked);
    }
}
