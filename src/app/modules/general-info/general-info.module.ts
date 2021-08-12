import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GeneralInfoRoutingModule } from "@modules/general-info/general-info-routing.module";
import { SharedModule } from "@shared/shared.module";

import { componentDeclarations, pageDeclarations } from "@modules/general-info/general-info.common";

@NgModule({
    declarations: [
        ...pageDeclarations,
        ...componentDeclarations,
    ],
    imports: [
        CommonModule,
        SharedModule,
        GeneralInfoRoutingModule,
    ]
})
export class GeneralInfoModule { }
