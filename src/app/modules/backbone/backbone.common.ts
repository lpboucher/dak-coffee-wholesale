import { Routes } from "@angular/router";

import { LoginGuard } from "@core/guards/login.guard";

import { BackbonePageComponent } from "@modules/backbone/pages/backbone/backbone.page";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { NavItemComponent } from "./components/nav-item/nav-item.component";

export const pageDeclarations: any[] = [
    BackbonePageComponent,
];

export const componentDeclarations: any[] = [
    SidebarComponent,
    FooterComponent,
    NavItemComponent,
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
        ]
    },
];
