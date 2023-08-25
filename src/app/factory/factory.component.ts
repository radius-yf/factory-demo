import { CdkPortal } from '@angular/cdk/portal';
import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { LayoutBackgroundService } from '../shared/layout/layout-background.service';
import { ApiService } from '../shared/service/api.service';

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.less'],
})
export class FactoryComponent implements OnInit, AfterViewInit {
  @ViewChild(CdkPortal) factoryMap!: CdkPortal;

  private portal = inject(LayoutBackgroundService);
  private api = inject(ApiService);

  ngOnInit(): void {
    this.api.yearproduction().subscribe(res => {
      const year = new Date().getFullYear().toString();
      const data = res.filter(item => item.year === year);
      console.log(data);
    })
  }

  ngAfterViewInit(): void {
    this.portal.bgTemplate = this.factoryMap;
  }
}
