import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SafeRoutingModule } from './safe-routing.module';
import { SafeComponent } from './safe.component';


@NgModule({
  declarations: [
    SafeComponent
  ],
  imports: [
    CommonModule,
    SafeRoutingModule
  ]
})
export class SafeModule { }
