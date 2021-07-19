import { Routes } from "@angular/router";

import { BackbonePageComponent } from "@modules/backbone/pages/backbone/backbone.page";

import { SidebarComponent } from "@modules/backbone/components/sidebar/sidebar.component";
import { FooterComponent } from "@modules/backbone/components/footer/footer.component";
import { NavItemComponent } from "@modules/backbone/components/nav-item/nav-item.component";
import { FloatingActionComponent } from "@modules/backbone/components/floating-action/floating-action.component";
import { HeaderComponent } from "@modules/backbone/components/header/header.component";

export const pageDeclarations: any[] = [
    BackbonePageComponent,
];

export const componentDeclarations: any[] = [
    SidebarComponent,
    FooterComponent,
    NavItemComponent,
    FloatingActionComponent,
    HeaderComponent,
];

export const routes: Routes = [
    {
        path: "",
        component: BackbonePageComponent,
        children: [
            {
                path: "",
                redirectTo: "products",
                children: [],
                pathMatch: "full"
            },
            {
                path: "products",
                loadChildren: () => import("@modules/products/products.module").then(m => m.ProductsModule),
            },
            {
                path: "general-information",
                loadChildren: () => import("@modules/general-info/general-info.module").then(m => m.GeneralInfoModule),
            }
        ]
    },
];
