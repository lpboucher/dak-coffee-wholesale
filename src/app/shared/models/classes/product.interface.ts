import { CollectionType } from "../types/collection-type.type";
import { ProductType } from "../types/product-type.type";

export interface Product {
    id: number;
    name: string;
    price: string;
    description: string;
    collection: CollectionType;
    type: ProductType;
}
