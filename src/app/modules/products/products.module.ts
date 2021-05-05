import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';

import { componentDeclarations, pageDeclarations } from '@modules/products/products.common';

@NgModule({
  declarations: [
      ...pageDeclarations,
      ...componentDeclarations,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
