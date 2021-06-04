import { Routes } from "@angular/router";

import { LoginGuard } from "@core/guards/login.guard";

import { BackbonePageComponent } from "@modules/backbone/pages/backbone/backbone.page";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { NavItemComponent } from "./components/nav-item/nav-item.component";
import { FloatingActionComponent } from "./components/floating-action/floating-action.component";

export const pageDeclarations: any[] = [
    BackbonePageComponent,
];

export const componentDeclarations: any[] = [
    SidebarComponent,
    FooterComponent,
    NavItemComponent,
    FloatingActionComponent,
];

export const routes: Routes = [
    {
        path: "",
        component: BackbonePageComponent,
        children: [
            {
                path: "products",
                loadChildren: () => import("@modules/products/products.module").then(m => m.ProductsModule),
                canActivate: [LoginGuard],
            },
            {
                path: "general-information",
                loadChildren: () => import("@modules/general-info/general-info.module").then(m => m.GeneralInfoModule),
            }
        ]
    },
];
