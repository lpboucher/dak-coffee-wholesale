import { Component, Input } from "@angular/core";
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
export class FilterComponent implements ControlValueAccessor {
    @Input() propertyToFilter!: FilterType;
    private onChange = (_: {}) => {};
    private onTouched = () => {};
    private touched = false;
    private disabled = false;

    writeValue(obj: any): void {}

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
