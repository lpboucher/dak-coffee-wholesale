import { Routes } from "@angular/router";

import { ProductPageComponent } from "@modules/products/pages/product/product.page";
import { SingleProductPageComponent } from "@modules/products/pages/single-product/single-product.page";

import { ProductCardComponent } from "@modules/products/components/product-card/product-card.component";
import { ProductDetailComponent } from "@modules/products/components/product-detail/product-detail.component";
import { FeaturedProductCardComponent } from "@modules/products/components/featured-product-card/featured-product-card.component";
import { FeaturedProductCardLoaderComponent } from "@modules/products/components/featured-product-card-loader/featured-product-card-loader.component";
import { ProductCardLoaderComponent } from "@modules/products/components/product-card-loader/product-card-loader.component";
import { ProductDetailLoaderComponent } from "@modules/products/components/product-detail-loader/product-detail-loader.component";

export const pageDeclarations: any[] = [
    ProductPageComponent,
    SingleProductPageComponent,
];

export const componentDeclarations: any[] = [
    ProductCardComponent,
    ProductDetailComponent,
    FeaturedProductCardComponent,
    FeaturedProductCardLoaderComponent,
    ProductCardLoaderComponent,
    ProductDetailLoaderComponent,
];

export const providerDeclarations: any[] = [
];

export const routes: Routes = [
    {
        path: ":productType",
        component: ProductPageComponent,
        children: []
    },
    {
        path: ":productType/:slug",
        component: SingleProductPageComponent,
        children: []
    },
    {
        path: "",
        redirectTo: "all",
        children: [],
        pathMatch: "full"
    },
];
