import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";

@Component({
    selector: "app-toggle-widget",
    templateUrl: "./toggle-widget.component.html",
    styleUrls: ["./toggle-widget.component.scss"]
})
export class ToggleWidgetComponent {
    @Input() header: string = "";
    @Input() uncheckedOption: string = "";
    @Input() checkedOption: string = "";
    @Input() toggleCallback: () => void = () => {};
    @Input() isChecked$: Observable<boolean> = new Observable();

    constructor() { }
}
