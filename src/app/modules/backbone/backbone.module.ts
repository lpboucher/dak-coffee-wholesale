import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared/shared.module";

import { BackboneRoutingModule } from "./backbone-routing.module";

import { componentDeclarations, pageDeclarations } from "../backbone/backbone.common";

import { AngularSvgIconModule } from "angular-svg-icon";

@NgModule({
    declarations: [
        ...pageDeclarations,
        ...componentDeclarations,
    ],
    imports: [
        CommonModule,
        SharedModule,
        BackboneRoutingModule,
        AngularSvgIconModule,
    ]
})
export class BackboneModule { }
