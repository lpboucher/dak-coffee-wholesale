import { Routes } from "@angular/router";

import { ProductPageComponent } from '@modules/products/pages/product/product.page';

import { ProductListComponent } from "@modules/products/components/product-list/product-list.component";
import { ProductCardComponent } from '@modules/products/components/product-card/product-card.component';

export const pageDeclarations: any[] = [
    ProductPageComponent,
];

export const componentDeclarations: any[] = [
    ProductListComponent,
    ProductCardComponent,
];

export const providerDeclarations: any[] = [
];

export const routes: Routes = [
    {
        path: "",
        component: ProductPageComponent,
        children: []
    },
];
