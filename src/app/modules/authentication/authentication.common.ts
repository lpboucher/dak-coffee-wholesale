import { Routes } from "@angular/router";

import { LoginPageComponent } from "@modules/authentication/pages/login/login.page";

import { LoginComponent } from "@modules/authentication/components/login/login.component";

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
        redirectTo: "login",
        pathMatch: "full"
    },
    {
        path: "login",
        component: LoginPageComponent,
    },
];
