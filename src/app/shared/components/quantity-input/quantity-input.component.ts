import { Component } from "@angular/core";
import { AbstractControl, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: "app-quantity-input",
    templateUrl: "./quantity-input.component.html",
    styleUrls: ["./quantity-input.component.scss"]
})
export class QuantityInputComponent {
    quantityForm = this.fb.group({
        quantity: [1, [Validators.required, Validators.min(1)]],
    });

    constructor(private fb: FormBuilder) {}

    onIncrement(): void {
        const control = this.quantityControl();
        this.verifyQuantity(control.value + 1);
    }

    onDecrement(): void {
        const control = this.quantityControl();
        this.verifyQuantity(control.value - 1);
    }

    verifyQuantity(value?: number): void {
        const control = this.quantityControl();
        const newValue = Math.max(1, value ?? control.value);
        control.setValue(newValue);
    }

    private quantityControl(): AbstractControl {
        return this.quantityForm.get("quantity")!;
    }
}
