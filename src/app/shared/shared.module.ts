import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { componentDeclarations } from "@shared/shared.common";

@NgModule({
    declarations: [
        ...componentDeclarations,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [
    ],
    exports: [
        ...componentDeclarations,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class SharedModule { }
