import { Component } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: "app-quantity-input",
    templateUrl: "./quantity-input.component.html",
    styleUrls: ["./quantity-input.component.scss"],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: QuantityInputComponent,
    }]
})
export class QuantityInputComponent implements ControlValueAccessor {
    readonly minValue = 1;
    _quantity: number = this.minValue;

    private onChange = (_: any) => {};
    private onTouched = () => {};
    private touched = false;
    private disabled = false;

    set quantity(value: number) {
        this.markAsTouched();
        if (this.disabled) { return; }

        this._quantity = this.sanitizeValue(value);
        this.onChange(this._quantity);
    }

    get quantity(): number {
        return this._quantity;
    }

    constructor() {}

    writeValue(value: number): void {
        this.quantity = value;
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

    onIncrement(): void {
        this.quantity = this.quantity + 1;
    }

    onDecrement(): void {
        this.quantity = this.quantity - 1;
    }

    onUserChange(event: Event): void {
        const value = (event.target as HTMLInputElement).valueAsNumber;
        this.quantity = value;
    }

    private markAsTouched(): void {
        if (this.touched) { return; }

        this.onTouched();
        this.touched = true;
    }

    private sanitizeValue(value: number): number {
        return isNaN(value)
            ? this.minValue
            : Math.max(this.minValue, value);
    }
}
