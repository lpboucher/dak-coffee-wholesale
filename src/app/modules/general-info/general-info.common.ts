import { Routes } from "@angular/router";

import { GeneralInfoPageComponent } from "@modules/general-info/pages/general-info/general-info.page";

export const pageDeclarations: any[] = [
    GeneralInfoPageComponent,
];

export const componentDeclarations: any[] = [
];

export const providerDeclarations: any[] = [
];

export const routes: Routes = [
    {
        path: "",
        component: GeneralInfoPageComponent,
    },
];
