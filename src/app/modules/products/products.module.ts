import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared/shared.module";

import { ProductsRoutingModule } from "./products-routing.module";

import { componentDeclarations, pageDeclarations } from "@modules/products/products.common";

@NgModule({
    declarations: [
        ...pageDeclarations,
        ...componentDeclarations,
    ],
    imports: [
        CommonModule,
        SharedModule,
        ProductsRoutingModule,
    ]
})
export class ProductsModule { }
