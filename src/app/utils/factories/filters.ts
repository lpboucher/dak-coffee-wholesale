import { Coffee } from "@shared/models/classes/coffee.class";
import { FilterType } from "@shared/models/types/filter-type.type";
import { Merchandise } from "@shared/models/classes/merchandise.class";
import { Product } from "@shared/models/classes/product.class";
import { ProductType } from "@app/shared/models/types/product-type.type";

export function getFilterableProperties(products: Product[], productType: ProductType): FilterType {
    switch (productType) {
        case "all": return {
            name: {
                displayName: "Name",
                key: "name",
                options: extractOptions(products, p => p.name),
            },
            price: {
                displayName: "Price",
                key: "price",
                options: extractOptions(products, p => p.price),
            },
            collection: {
                displayName: "Collection",
                key: "collection",
                options: ["featured", "upcoming"]
            }
        };
        case "coffee": return {
            origin: {
                displayName: "Origin",
                key: "origin",
                options: extractOptions(products, p => (p as Coffee).origin),
            },
            tastingNotes: {
                displayName: "Tasting Notes",
                key: "tastingNotes",
                options: extractOptions(products, p => (p as Coffee).tastingNotes),
            },
            process: {
                displayName: "Process",
                key: "process",
                options: extractOptions(products, p => (p as Coffee).process),
            },
            varietal: {
                displayName: "Varietal",
                key: "varietal",
                options: extractOptions(products, p => (p as Coffee).varietal),
            },
        };
        case "merchandise": return {
            dimensions: {
                displayName: "Dimensions",
                key: "dimensions",
                options: extractOptions(products, p => (p as Merchandise).dimensions),
            },
            material: {
                displayName: "Material",
                key: "material",
                options: extractOptions(products, p => (p as Merchandise).material),
            }
        };
    }
}

function extractOptions(products: Product[], extract: (p: Product) => string | null): string[] {
    const options = products
        .map(extract)
        .filter((s): s is string => s != null);

    return [...new Set(options)];
}
