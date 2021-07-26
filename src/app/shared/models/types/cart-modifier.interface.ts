import { ProductAttribute } from "@shared/models/classes/product-attribute.class";

export interface CartModifier {
    attribute: ProductAttribute;
    selection: string;
}
