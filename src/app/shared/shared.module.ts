import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";

import { componentDeclarations } from "@shared/shared.common";
import { ClampPipe } from "@shared/pipes/clamp.pipe";

@NgModule({
    declarations: [
        ...componentDeclarations,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgMultiSelectDropDownModule.forRoot(),
    ],
    providers: [
        ClampPipe,
    ],
    exports: [
        ...componentDeclarations,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class SharedModule { }
