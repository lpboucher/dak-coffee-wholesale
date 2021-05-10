import { ProductType } from "../types/product-type.type";

export interface Product {
    id: number;
    name: string;
    price: string;
    description: string;
    type: ProductType;
    slug: string;
}
