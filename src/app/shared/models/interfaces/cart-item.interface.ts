import { CartCustomField } from "./cart-custom-fields.interface";

export interface CartItem {
    uniqueId?: string;
    id: string;
    name: string;
    url: string;
    unitPrice?: number;
    description?: string;
    image?: string;
    quantity: number;
    minQuantity: number;
    maxQuantity: number;
    quantityStep: number;
    customFields: CartCustomField[];
    hasTaxesIncluded: boolean;
    taxable: boolean;
}
