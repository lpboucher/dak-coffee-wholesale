import { Component, Input } from "@angular/core";
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from "@angular/forms";

import { ClampPipe } from "@shared/pipes/clamp.pipe";

@Component({
    selector: "app-quantity-input",
    templateUrl: "./quantity-input.component.html",
    styleUrls: ["./quantity-input.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: QuantityInputComponent,
        },
        {
            provide: NG_VALIDATORS,
            multi: true,
            useExisting: QuantityInputComponent,
        }
    ]
})
export class QuantityInputComponent implements ControlValueAccessor, Validator {
    private touched = false;
    private disabled = false;
    @Input() label: string = "";
    @Input() maxValue: number = 20;
    @Input() minValue: number = 1;
    quantity: number = this.minValue;

    constructor(private clampPipe: ClampPipe) {}

    writeValue(value: number): void {
        this.markAsTouched();
        if (this.disabled) { return; }

        this.quantity = this.clampPipe.transform(value, this.minValue, this.maxValue);
        this.onChange(this.quantity);
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
        this.writeValue(this.quantity + 1);
    }

    onDecrement(): void {
        this.writeValue(this.quantity - 1);
    }

    validate(control: AbstractControl): ValidationErrors | null {
        const value = control.value;

        if (value < this.minValue) {
            return { mustBeAtLeastMin: value };
        }

        if (value > this.maxValue) {
            return { mustBeLessThanMax: value };
        }

        return null;
    }

    private markAsTouched(): void {
        if (this.touched) { return; }

        this.onTouched();
        this.touched = true;
    }

    private onChange = (_: any) => {};
    private onTouched = () => {};
}
