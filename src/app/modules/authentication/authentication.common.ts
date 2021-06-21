import { Routes } from "@angular/router";

import { LoginPageComponent } from "@app/modules/authentication/pages/login/login.page";

import { LoginComponent } from "@app/modules/authentication/components/login/login.component";

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
        path: "login",
        component: LoginPageComponent,
    },
];
