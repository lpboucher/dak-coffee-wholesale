import { ProductImages } from "@shared/models/types/product-images.interface";
import { CollectionType } from "@shared/models/types/collection-type.type";
import { ProductType } from "@shared/models/types/product-type.type";
import { FilterableAttribute } from "@shared/models/types/filterable-attribute.type";

export abstract class Product {
    abstract productType: ProductType;
    id: string | null = null;
    name: string | null = null;
    price: string | null = null;
    collection: CollectionType | null = null;
    description: string | null = null;
    slug: string | null = null;
    filterableAttributes: FilterableAttribute[] = [];
    images: ProductImages = { main: null, thumb: null };

    constructor(productShape?: Partial<Product>) {
        if (productShape != null) {
            if (productShape.id != null) {
                this.id = productShape.id;
            }

            if (productShape.name != null) {
                this.name = productShape.name;
            }

            if (productShape.price != null) {
                this.price = productShape.price;
            }

            if (productShape.collection != null) {
                this.collection = productShape.collection;
            }

            if (productShape.description != null) {
                this.description = productShape.description;
            }

            if (productShape.slug != null) {
                this.slug = productShape.slug;
            }

            if (productShape.images != null) {
                if (productShape.images.main != null) {
                    this.images.main = productShape.images.main;
                }

                if (productShape.images.thumb != null) {
                    this.images.thumb = productShape.images.thumb;
                }
            }
        }
    }

    get displayedDescription(): string[] {
        return [this.description ?? ""];
    }

    get displayedDetails(): string[] {
        return [this.description ?? ""];
    }

    get priceAsNumber(): number {
        if (this.price == null) { return NaN; }
        return Number.parseFloat(this.price);
    }

    get filterKeys(): string[] {
        return [...new Set(this.filterableAttributes.map((filter) => filter.key))];
    }
}
