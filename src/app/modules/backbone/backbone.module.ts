import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackboneRoutingModule } from './backbone-routing.module';

import { componentDeclarations, pageDeclarations } from '../backbone/backbone.common';

@NgModule({
  declarations: [
      ...pageDeclarations,
      ...componentDeclarations,
  ],
  imports: [
    CommonModule,
    BackboneRoutingModule
  ]
})
export class BackboneModule { }
