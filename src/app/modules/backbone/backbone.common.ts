import { Routes } from "@angular/router";

import { BackbonePageComponent } from "@modules/backbone/pages/backbone/backbone.page";
import { FooterComponent } from "./components/footer/footer.component";

export const pageDeclarations: any[] = [
    BackbonePageComponent,
];

export const componentDeclarations: any[] = [
    FooterComponent
];

export const providerDeclarations: any[] = [
];

export const routes: Routes = [
    {
        path: "",
        component: BackbonePageComponent,
        children: []
    },
];
