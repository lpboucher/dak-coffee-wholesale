import { Product } from "./product.interface"

export interface Coffee extends Product {
    origin: string;
    tastingNotes: string;
    process: string;
    varietal: string;
}
