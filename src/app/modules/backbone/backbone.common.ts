import { Routes } from "@angular/router";

import { AppComponent } from "@app/app.component";
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
            { path: "", component: AppComponent },
            { path: "backbone", component: BackboneComponent },
        ]
    },
];
