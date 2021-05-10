import { Routes } from "@angular/router";

import { ProductListComponent } from "@modules/products/components/product-list/product-list.component";
import { ProductCardComponent } from '@modules/products/components/product-card/product-card.component';
import { ProductPage } from './pages/product/product.page';

export const pageDeclarations: any[] = [
    ProductPage,
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
        component: ProductPage,
        children: []
    },
];
