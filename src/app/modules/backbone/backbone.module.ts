import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackbonePageComponent } from './pages/backbone/backbone.page';
import { BackboneComponent } from './components/backbone/backbone.component';



@NgModule({
  declarations: [BackbonePageComponent, BackboneComponent],
  imports: [
    CommonModule
  ]
})
export class BackboneModule { }
