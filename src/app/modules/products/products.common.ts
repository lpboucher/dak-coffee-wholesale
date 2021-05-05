import { Routes } from "@angular/router";

import { ProductListComponent } from "@modules/products/components/product-list/product-list.component";

export const pageDeclarations: any[] = [
];

export const componentDeclarations: any[] = [
    ProductListComponent
];

export const providerDeclarations: any[] = [
];

export const routes: Routes = [
    {
        path: "",
        component: ProductListComponent,
        children: []
    },
];
