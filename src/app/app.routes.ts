import { Routes } from "@angular/router";

import { AppComponent } from "@app/app.component";

export const routes: Routes = [
    {
        path: "",
        component: AppComponent,
    },
    {
        path: "",
        loadChildren: () => import("@modules/backbone/backbone.module").then(m => m.BackboneModule)
    },
    {
        path: "auth",
        loadChildren: () => import("@modules/login/login.module").then(m => m.LoginModule)
    },
];
