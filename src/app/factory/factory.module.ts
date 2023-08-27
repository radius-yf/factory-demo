import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactoryRoutingModule } from './factory-routing.module';
import { FactoryComponent } from './factory.component';
import { FactoryMapComponent } from './factory-map/factory-map.component';
import { DZoomDirective } from './d-zoom.directive';
import { PortalModule } from '@angular/cdk/portal';
import { G2LineComponent } from './g2-line/g2-line.component';


@NgModule({
  declarations: [
    FactoryComponent,
    FactoryMapComponent,
    DZoomDirective,
    G2LineComponent
  ],
  imports: [
    CommonModule,
    FactoryRoutingModule,
    PortalModule
  ],
})
export class FactoryModule { }
