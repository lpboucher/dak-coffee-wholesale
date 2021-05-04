import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: "",
        loadChildren: () => import("@modules/backbone/backbone.module").then(m => m.BackboneModule)
    },
    {
        path: "auth",
        loadChildren: () => import("@modules/login/login.module").then(m => m.LoginModule)
    },
];
