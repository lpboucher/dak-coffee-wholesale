import { Routes } from "@angular/router";

import { BackbonePageComponent } from "@modules/backbone/pages/backbone/backbone.page";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { LoginGuard } from "@core/guards/login.guard";

export const pageDeclarations: any[] = [
    BackbonePageComponent,
];

export const componentDeclarations: any[] = [
    SidebarComponent,
    FooterComponent
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
