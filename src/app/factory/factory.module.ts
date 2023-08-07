import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactoryRoutingModule } from './factory-routing.module';
import { FactoryComponent } from './factory.component';
import { FactoryMapComponent } from './factory-map/factory-map.component';
import { DZoomDirective } from './d-zoom.directive';
import { PortalModule } from '@angular/cdk/portal';


@NgModule({
  declarations: [
    FactoryComponent,
    FactoryMapComponent,
    DZoomDirective
  ],
  imports: [
    CommonModule,
    FactoryRoutingModule,
    PortalModule
  ],
})
export class FactoryModule { }
