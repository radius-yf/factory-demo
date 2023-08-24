import { CdkPortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  Component,
  ViewChild,
  inject
} from '@angular/core';
import { LayoutBackgroundService } from '../shared/layout/layout-background.service';

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.less'],
})
export class FactoryComponent implements AfterViewInit {
  @ViewChild(CdkPortal) factoryMap!: CdkPortal;

  private portal = inject(LayoutBackgroundService);

  ngAfterViewInit(): void {
    console.log(this.factoryMap);

    this.portal.bgTemplate = this.factoryMap;
  }
}
