import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { routes } from "@modules/general-info/general-info.common";

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GeneralInfoRoutingModule { }
