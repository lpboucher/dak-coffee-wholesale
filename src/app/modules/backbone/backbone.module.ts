import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackboneRoutingModule } from './backbone-routing.module';

import { componentDeclarations, pageDeclarations } from '../backbone/backbone.common';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
      ...pageDeclarations,
      ...componentDeclarations,
      SidebarComponent
  ],
  imports: [
    CommonModule,
    BackboneRoutingModule
  ]
})
export class BackboneModule { }
