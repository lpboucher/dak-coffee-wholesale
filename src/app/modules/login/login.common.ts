import { Routes } from "@angular/router";

import { LoginPageComponent } from "@modules/login/pages/login/login.page";

import { LoginComponent } from "@modules/login/components/login/login.component";

export const pageDeclarations: any[] = [
    LoginPageComponent,
];

export const componentDeclarations: any[] = [
    LoginComponent
];

export const providerDeclarations: any[] = [
];

export const routes: Routes = [
    {
        path: "",
        component: LoginPageComponent,
        children: [
            { path: "login", component: LoginComponent },
        ]
    },
];
