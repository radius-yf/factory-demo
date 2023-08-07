import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { LayoutBackgroundService } from '../shared/layout/layout-background.service';
import { CdkPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.less'],
})
export class FactoryComponent implements AfterViewInit {
  @ViewChild(CdkPortal) factoryMap!: CdkPortal;
  
  private portal = inject(LayoutBackgroundService);

  ngAfterViewInit(): void {
    this.portal.bgTemplate = this.factoryMap;
  }
}
