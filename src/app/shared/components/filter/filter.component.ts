import { Component, Input, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

import { FilterType } from "@shared/models/types/filter-type.type";


@Component({
    selector: "app-filter",
    templateUrl: "./filter.component.html",
    styleUrls: ["./filter.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: FilterComponent,
        },
    ]
})
export class FilterComponent implements OnInit, ControlValueAccessor {
    @Input() propertyToFilter!: FilterType;
    private selection: { [key: string]: boolean } = {};
    private onChange = (_: { [key: string]: boolean }) => {};
    private onTouched = () => {};
    private touched = false;
    private disabled = false;

    constructor() {}

    ngOnInit(): void {
        this.selection = this.propertyToFilter
            .options
            .reduce((obj, id) => {
                return { ...obj, [id]: false }
            }, {});
    }

    onClick(id: string): void {
        this.markAsTouched();
        if (this.disabled) return;

        this.selection[id] = !this.selection[id];
        this.onChange(this.selection);
    }

    isSelected(id: string): boolean {
        return this.selection[id];
    }

    writeValue(selection: { [key: string]: boolean }): void {
        if (selection != null) this.selection = selection;
    }

    registerOnChange(onChange: any): void {
        this.onChange = onChange;
    }

    registerOnTouched(onTouched: any): void {
        this.onTouched = onTouched;
    }

    setDisabledState(disabled: boolean): void {
        this.disabled = disabled;
    }

    private markAsTouched() {
        if (this.touched) return;

        this.onTouched();
        this.touched = true;
    }
}
