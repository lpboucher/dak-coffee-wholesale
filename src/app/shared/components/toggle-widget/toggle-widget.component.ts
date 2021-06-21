import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";

@Component({
    selector: "app-toggle-widget",
    templateUrl: "./toggle-widget.component.html",
    styleUrls: ["./toggle-widget.component.scss"]
})
export class ToggleWidgetComponent implements OnInit {
    @Input() header: string = "";
    @Input() uncheckedOption: string = "";
    @Input() checkedOption: string = "";
    @Input() initialCheckboxState: boolean = false;
    @Output() toggle: EventEmitter<boolean> =  new EventEmitter();

    toggleForm = this.fb.group({
        toggle: new FormControl(),
    });

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.toggleForm.patchValue({
            toggle: this.initialCheckboxState
        });
    }

    doToggle(): void {
        const toggleElement = this.toggleForm.get("toggle")!;
        toggleElement.setValue(!toggleElement.value);

        this.toggle.emit(toggleElement.value);
    }
}
