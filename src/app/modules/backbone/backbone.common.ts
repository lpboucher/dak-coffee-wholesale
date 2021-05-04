import { Routes } from "@angular/router";

import { BackbonePageComponent } from "@modules/backbone/pages/backbone/backbone.page";
import { SidebarComponent } from "./components/sidebar/sidebar.component";

export const pageDeclarations: any[] = [
    BackbonePageComponent,
];

export const componentDeclarations: any[] = [
    SidebarComponent
];

export const providerDeclarations: any[] = [
];

export const routes: Routes = [
    {
        path: "",
        component: BackbonePageComponent,
        children: [
            {
                path: "products",
                loadChildren: () => import("@modules/products/products.module").then(m => m.ProductsModule)
            },
        ]
    },
];
