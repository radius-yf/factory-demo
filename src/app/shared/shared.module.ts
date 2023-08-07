import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { PortalModule } from '@angular/cdk/portal';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PortalModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class SharedModule { }
