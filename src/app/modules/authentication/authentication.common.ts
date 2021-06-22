import { Routes } from "@angular/router";

import { LoginPageComponent } from "@app/modules/authentication/pages/login/login.page";
import { RequestAccessPage } from "@app/modules/authentication/pages/request-access/request-access.page";

import { LoginComponent } from "@app/modules/authentication/components/login/login.component";
import { RequestAccessFormComponent } from "@app/modules/authentication/components/request-access-form/request-access-form.component";
import { RequestAccessStepsComponent } from "@app/modules/authentication/components/request-access-steps/request-access-steps.component";

export const pageDeclarations: any[] = [
    LoginPageComponent,
    RequestAccessPage,
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
        path: "login",
        component: LoginPageComponent,
    },
    {
        path: "register",
        component: RequestAccessPage,
    }
];
