import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { routes } from "@modules/authentication/authentication.common";

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
