import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";

import { componentDeclarations, providerDeclarations } from "@shared/shared.common";

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
        ...providerDeclarations,
    ],
    exports: [
        ...componentDeclarations,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class SharedModule { }
