import { Routes } from "@angular/router";

import { LoginPageComponent } from "@modules/authentication/pages/login/login.page";
import { RequestAccessPageComponent } from "@modules/authentication/pages/request-access/request-access.page";

import { LoginComponent } from "@modules/authentication/components/login/login.component";
import { RequestAccessFormComponent } from "@modules/authentication/components/request-access-form/request-access-form.component";

export const pageDeclarations: any[] = [
    LoginPageComponent,
    RequestAccessPageComponent,
];

export const componentDeclarations: any[] = [
    LoginComponent,
    RequestAccessFormComponent,
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
    {
        path: "register",
        component: RequestAccessPageComponent,
    }
];
