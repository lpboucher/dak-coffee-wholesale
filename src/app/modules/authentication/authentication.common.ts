import { Routes } from "@angular/router";

import { LoginPageComponent } from "@modules/authentication/pages/login/login.page";
import { RequestAccessPageComponent } from "@modules/authentication/pages/request-access/request-access.page";
import { RegistrationSuccessPage } from "@modules/authentication/pages/registration-success/registration-success.page";

import { LoginComponent } from "@modules/authentication/components/login/login.component";
import { RequestAccessFormComponent } from "@modules/authentication/components/request-access-form/request-access-form.component";
import { RequestAccessStepsComponent } from "@modules/authentication/components/request-access-steps/request-access-steps.component";

export const pageDeclarations: any[] = [
    LoginPageComponent,
    RequestAccessPageComponent,
    RegistrationSuccessPage,
];

export const componentDeclarations: any[] = [
    LoginComponent,
    RequestAccessFormComponent,
    RequestAccessStepsComponent,
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
        pathMatch: "full",
    },
    {
        path: "register/success",
        component: RegistrationSuccessPage,
    }
];
