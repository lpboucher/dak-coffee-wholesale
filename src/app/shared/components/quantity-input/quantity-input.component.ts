import { Component } from "@angular/core";
import { AbstractControl, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: "app-quantity-input",
    templateUrl: "./quantity-input.component.html",
    styleUrls: ["./quantity-input.component.scss"]
})
export class QuantityInputComponent {
    private readonly minValue = 1;
    quantityForm = this.fb.group({
        quantity: [this.minValue, [Validators.required, Validators.min(this.minValue)]],
    });

    set quantity(value: number) {
        value = isNaN(value) ? this.minValue : value;
        value = Math.max(this.minValue, value);

        this.quantityControl().setValue(value);
    }

    get quantity(): number {
        return this.quantityControl().value;
    }

    constructor(private fb: FormBuilder) {}

    onIncrement(): void {
        this.quantity = this.quantity + 1;
    }

    onDecrement(): void {
        this.quantity = this.quantity - 1;
    }

    onChange(event: Event): void {
        const value = (event.target as HTMLInputElement).valueAsNumber;
        this.quantity = value;
    }

    private quantityControl(): AbstractControl {
        return this.quantityForm.get("quantity")!;
    }
}
