import { ProductImages } from "@shared/models/interfaces/product-images.interface";
import { CollectionType } from "@shared/models/types/collection-type.type";
import { ProductType } from "@shared/models/types/product-type.type";
import { FilterableAttribute } from "@shared/models/types/filterable-attribute.type";
import { ProductAttribute } from "@shared/models/classes/product-attribute.class";

import { environment as config } from "@env";

export abstract class Product {
    abstract productType: ProductType;
    abstract attributes: ProductAttribute[];
    id: string | null = null;
    name: string | null = null;
    price: string | null = null;
    collection: CollectionType | null = null;
    description: string | null = null;
    shortDescription: string | null = null;
    slug: string | null = null;
    filterableAttributes: FilterableAttribute[] = [];
    images: ProductImages = { main: null, thumb: null };
    releasedOn: Date | null = null;
    isLowStock: boolean = false;

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

            if (productShape.shortDescription != null) {
                this.shortDescription = productShape.shortDescription;
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

            if (productShape.releasedOn != null) {
                this.releasedOn = new Date(productShape.releasedOn);
            }

            if (productShape.isLowStock != null) {
                this.isLowStock = productShape.isLowStock;
            }
        }
    }

    get displayedDescription(): string[] {
        return [this.description ?? ""];
    }

    get displayedDetails(): string[] {
        return [];
    }

    get priceAsNumber(): number {
        if (this.price == null) { return NaN; }
        return Number.parseFloat(this.price);
    }

    get filterKeys(): string[] {
        return [...new Set(this.filterableAttributes.map((filter) => filter.key))];
    }

    get attributesWithModifiers(): ProductAttribute[] {
        return this.attributes.filter((attribute) => attribute.options?.some(o => o.priceModifier));
    }

    get selectableAttributes(): ProductAttribute[] {
        return this.attributes.filter((attribute) => attribute.name !== "volume-discount");
    }

    get isNewProduct(): boolean {
        const today = new Date();
        return this.releasedOn != null && (today.getTime() - config.newProductLapse <= this.releasedOn.getTime());
    }
}
