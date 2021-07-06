import { Component } from "@angular/core";

@Component({
    selector: "app-quantity-input",
    templateUrl: "./quantity-input.component.html",
    styleUrls: ["./quantity-input.component.scss"]
})
export class QuantityInputComponent {
    readonly minValue = 1;
    _quantity: number = this.minValue;

    set quantity(value: number) {
        value = isNaN(value) ? this.minValue : value;
        value = Math.max(this.minValue, value);

        this._quantity = value;
    }

    get quantity(): number {
        return this._quantity;
    }

    constructor() {}

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
}
