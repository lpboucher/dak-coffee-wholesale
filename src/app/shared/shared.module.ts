import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { componentDeclarations } from "@shared/shared.common";

@NgModule({
    declarations: [
        ...componentDeclarations
    ],
    imports: [
        CommonModule,
    ],
    providers: [
    ],
    exports: [
        ...componentDeclarations,
    ],
})
export class SharedModule { }
