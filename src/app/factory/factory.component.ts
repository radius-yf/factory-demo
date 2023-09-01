import { CdkPortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { LayoutBackgroundService } from '../shared/layout/layout-background.service';
import { ApiService } from '../shared/service/api.service';
import { JobSum, ProductDayData, StoreData } from '../shared/model/request';

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.less'],
})
export class FactoryComponent implements OnInit, AfterViewInit {
  @ViewChild(CdkPortal) factoryMap!: CdkPortal;

  private portal = inject(LayoutBackgroundService);
  private api = inject(ApiService);

  total: { title: string; number: number }[] = [];

  lineData: any[] = [];

  productData: ProductDayData[] = [];

  storeData: StoreData[] = [];

  jobSum = 0;

  daySum = 0;

  ngOnInit(): void {
    this.api.yearproduction().subscribe((res) => {
      const year = new Date().getFullYear().toString();
      this.total = res
        .filter((item) => item.year === year)
        .map((i) => ({
          title: `本年度${i.type}生产数`,
          number: i.sum,
        }));
    });
    this.api.line('MEB转子').subscribe((res) => {
      this.lineData = res
        .map((i) => ({
          time: new Date(i.year_month),
          month: i.year_month,
          value: i.sum,
          name: i.production_line_name,
        }))
        .sort((a, b) => a.time.getTime() - b.time.getTime());
    });
    this.api.dayproduction().subscribe((res) => {
      this.productData = res;
    });
    this.api.autobank().subscribe((res) => {
      this.storeData = res;
    });
    this.api.jobsum().subscribe((res) => {
      this.jobSum = res[0].sum;
    });
    this.api.dayproductionworkshop('生产二区').subscribe((res) => {
      this.daySum = res[0].sum;
    });
  }

  ngAfterViewInit(): void {
    this.portal.bgTemplate = this.factoryMap;
  }
}
