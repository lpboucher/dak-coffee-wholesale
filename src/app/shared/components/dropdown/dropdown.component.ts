import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AbstractControl, ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, Validators } from "@angular/forms";

@Component({
    selector: "app-dropdown",
    templateUrl: "./dropdown.component.html",
    styleUrls: ["./dropdown.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: DropdownComponent,
        }
    ]
})
export class DropdownComponent implements OnInit, ControlValueAccessor {
    @Input() options: string[] = [];
    @Input() defaultSelection: string | undefined;
    @Output() currentSelection: EventEmitter<string> = new EventEmitter<string>();
    showOptions: boolean = false;
    dropdownForm = this.fb.group({
        options: ["", Validators.required],
    });

    private onChange = (_: string) => {};
    private onTouched = () => {};
    private touched = false;
    private disabled = false;

    get currentlySelected(): string {
        return this.optionsControl.value;
    }

    set currentlySelected(option: string) {
        this.markAsTouched();
        if (this.disabled) { return; }

        this.optionsControl.setValue(option);
        this.onChange(this.currentlySelected);
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

    writeValue(value: string): void {
        this.currentlySelected = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(disabled: boolean): void {
        this.disabled = disabled;
    }

    onClickDropdown(): void {
        this.markAsTouched();
        if (this.disabled) { return; }

        this.showOptions = !this.showOptions;
    }

    onSelectOption(option: string, event: Event): void {
        this.currentlySelected = option;
        this.currentSelection.emit(this.currentlySelected);
        this.showOptions = false;
        event.stopPropagation();
    }

    private markAsTouched(): void {
        if (this.touched) { return; }

        this.onTouched();
        this.touched = true;
    }
}
