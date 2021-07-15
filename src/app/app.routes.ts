import { Routes } from "@angular/router";

import { LoginGuard } from "@core/guards/login.guard";

export const routes: Routes = [
    {
        path: "",
        loadChildren: () => import("@modules/backbone/backbone.module").then(m => m.BackboneModule),
        canActivate: [LoginGuard],
    },
    {
        path: "auth",
        loadChildren: () => import("@modules/authentication/authentication.module").then(m => m.AuthenticationModule)
    },
];
