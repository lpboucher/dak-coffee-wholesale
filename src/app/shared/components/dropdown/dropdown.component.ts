import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AbstractControl, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: "app-dropdown",
    templateUrl: "./dropdown.component.html",
    styleUrls: ["./dropdown.component.scss"]
})
export class DropdownComponent implements OnInit {
    @Input() options: string[] = [];
    @Input() defaultSelection: string | undefined;
    @Output() currentSelection: EventEmitter<string> = new EventEmitter<string>();
    showOptions: boolean = false;
    dropdownForm = this.fb.group({
        options: ["", Validators.required],
    });

    get currentlySelected(): string {
        return this.optionsControl.value;
    }

    set currentlySelected(option: string) {
        this.optionsControl.setValue(option);
    }

    get optionsControl(): AbstractControl {
        return this.dropdownForm.get("options")!;
    }

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        if (this.defaultSelection != null) {
            this.optionsControl.setValue(this.defaultSelection);
        }
    }

    onClickDropdown(): void {
        this.showOptions = !this.showOptions;
    }

    onSelectOption(option: string, event: Event): void {
        this.currentlySelected = option;
        this.currentSelection.emit(this.currentlySelected);
        this.showOptions = false;
        event.stopPropagation();
    }
}
