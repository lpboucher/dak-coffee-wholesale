import { Routes } from "@angular/router";

import { AppComponent } from "@app/app.component";

export const routes: Routes = [
    {
        path: "",
        component: AppComponent,
    },
    {
        path: "auth",
        loadChildren: () => import("@modules/login/login.module").then(m => m.LoginModule)
    },
];
