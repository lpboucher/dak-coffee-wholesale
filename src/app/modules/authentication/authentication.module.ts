import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthenticationRoutingModule } from "@modules/authentication/authentication-routing.module";
import { SharedModule } from "@shared/shared.module";

import { componentDeclarations, pageDeclarations } from "@modules/authentication/authentication.common";

import { AngularSvgIconModule } from "angular-svg-icon";

@NgModule({
  declarations: [
      ...pageDeclarations,
      ...componentDeclarations,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthenticationRoutingModule,
    AngularSvgIconModule,
  ]
})
export class AuthenticationModule { }
