import { Routes } from "@angular/router";

import { ProductPageComponent } from "@modules/products/pages/product/product.page";
import { SingleProductPageComponent } from "@modules/products/pages/single-product/single-product.page";

import { ProductListComponent } from "@modules/products/components/product-list/product-list.component";
import { ProductCardComponent } from "@modules/products/components/product-card/product-card.component";

export const pageDeclarations: any[] = [
    ProductPageComponent,
    SingleProductPageComponent,
];

export const componentDeclarations: any[] = [
    ProductListComponent,
    ProductCardComponent,
];

export const providerDeclarations: any[] = [
];

export const routes: Routes = [
    {
        path: ":slug",
        component: SingleProductPageComponent,
        children: []
    },
    {
        path: "",
        component: ProductPageComponent,
        children: []
    },
];
