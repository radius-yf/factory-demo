import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { PortalModule } from '@angular/cdk/portal';
import { CircleMenuComponent } from './circle-menu/circle-menu.component';



@NgModule({
  declarations: [
    LayoutComponent,
    CircleMenuComponent
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
