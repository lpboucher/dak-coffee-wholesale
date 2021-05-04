import { Routes } from "@angular/router";

import { BackbonePageComponent } from "@modules/backbone/pages/backbone/backbone.page";

import { BackboneComponent } from "@modules/backbone/components/backbone/backbone.component";

export const pageDeclarations: any[] = [
    BackbonePageComponent,
];

export const componentDeclarations: any[] = [
    BackboneComponent
];

export const providerDeclarations: any[] = [
];

export const routes: Routes = [
    {
        path: "",
        component: BackbonePageComponent,
        children: [
            { path: "backbone", component: BackboneComponent },
        ]
    },
];
