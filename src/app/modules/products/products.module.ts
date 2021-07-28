import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared/shared.module";

import { ProductsRoutingModule } from "./products-routing.module";

import { componentDeclarations, pageDeclarations } from "@modules/products/products.common";

import { AngularSvgIconModule } from "angular-svg-icon";

@NgModule({
    declarations: [
        ...pageDeclarations,
        ...componentDeclarations,
    ],
    imports: [
        CommonModule,
        SharedModule,
        ProductsRoutingModule,
        AngularSvgIconModule,
    ]
})
export class ProductsModule { }
