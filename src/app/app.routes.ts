import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: "",
        loadChildren: () => import("@modules/backbone/backbone.module").then(m => m.BackboneModule)
    },
    {
        path: "auth",
        loadChildren: () => import("@modules/authentication/authentication.module").then(m => m.AuthenticationModule)
    },
];
