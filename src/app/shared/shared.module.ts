import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";

import { componentDeclarations, providerDeclarations } from "@shared/shared.common";

@NgModule({
    declarations: [
        ...componentDeclarations,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSkeletonLoaderModule,
    ],
    providers: [
        ...providerDeclarations,
    ],
    exports: [
        ...componentDeclarations,
        FormsModule,
        ReactiveFormsModule,
        NgxSkeletonLoaderModule,
    ],
})
export class SharedModule { }
