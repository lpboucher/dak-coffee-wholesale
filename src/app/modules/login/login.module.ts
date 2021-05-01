import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LoginRoutingModule } from "@modules/login/login-routing.module";
import { SharedModule } from "@shared/shared.module";

import { componentDeclarations, pageDeclarations } from "@modules/login/login.common";

@NgModule({
  declarations: [
      ...pageDeclarations,
      ...componentDeclarations,
  ],
  imports: [
    CommonModule,
    SharedModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
