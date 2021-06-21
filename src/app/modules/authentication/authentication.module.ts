import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthenticationRoutingModule } from "@app/modules/authentication/authentication-routing.module";
import { SharedModule } from "@shared/shared.module";

import { componentDeclarations, pageDeclarations } from "@app/modules/authentication/authentication.common";

@NgModule({
  declarations: [
      ...pageDeclarations,
      ...componentDeclarations,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
