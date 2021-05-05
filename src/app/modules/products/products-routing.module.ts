import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { routes } from "@modules/products/products.common";

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }
