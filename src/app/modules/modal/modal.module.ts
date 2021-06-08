import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { componentDeclarations, pageDeclarations } from "@modules/modal/modal.common";


@NgModule({
    declarations: [
        ...pageDeclarations,
        ...componentDeclarations,
    ],
    imports: [
        CommonModule,
    ]
})
export class ModalModule { }
