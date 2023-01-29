import { ShippingAddress } from "@shared/models/interfaces/shipping-address.interface";
import { CartItem } from "@shared/models/interfaces/cart-item.interface";

export class Parcel {
    address!: ShippingAddress;
    email!: string;
    invoiceNumber!: string;
    items!: CartItem[];

    constructor(newParcelShape?: Partial<Parcel>) {
        if (newParcelShape != null) {
            if (newParcelShape.address != null) {
                this.address = newParcelShape.address;
            }

            if (newParcelShape.email != null) {
                this.email = newParcelShape.email;
            }

            if (newParcelShape.invoiceNumber != null) {
                this.invoiceNumber = newParcelShape.invoiceNumber;
            }

            if (
                (newParcelShape.items != null) &&
                (Array.isArray(newParcelShape.items) === true) &&
                (newParcelShape.items.length > 0)
            ) {
                this.items = newParcelShape.items;
            } else {
                this.items = [];
            }
        }
    }
}
