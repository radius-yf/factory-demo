import { CdkPortal } from '@angular/cdk/portal';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { LayoutBackgroundService } from '../shared/layout/layout-background.service';

@Component({
  selector: 'app-logistics',
  templateUrl: './logistics.component.html',
  styleUrls: ['./logistics.component.less']
})
export class LogisticsComponent implements AfterViewInit {
  @ViewChild(CdkPortal) logisticsMap!: CdkPortal;
  private portal = inject(LayoutBackgroundService);

  ngAfterViewInit(): void {
    console.log('??', this.logisticsMap);
    
    this.portal.bgTemplate = this.logisticsMap;
  }
}
