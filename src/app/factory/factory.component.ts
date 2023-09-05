import { CdkPortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { Subject, startWith, switchMap, takeUntil, tap, timer } from 'rxjs';
import { LayoutBackgroundService } from '../shared/layout/layout-background.service';
import { ProductDayData, StoreData } from '../shared/model/request';
import { ApiService } from '../shared/service/api.service';
import { areas } from './factory-map/factory-map.component';

function gundong(dom: HTMLElement) {
  const subject = new Subject<void>();
  return subject.pipe(
    startWith(1),
    switchMap(() => timer(1000, 100)),
    tap((val) => {
      dom.scrollTo({
        top: val,
        behavior: 'smooth',
      });
      if (dom.scrollHeight - dom.clientHeight <= dom.scrollTop) {
        setTimeout(() => {
          subject.next();
          dom.scrollTo({ top: 0 });
        }, 1000);
      }
    })
  );
}

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.less'],
})
export class FactoryComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(CdkPortal) factoryMap!: CdkPortal;
  @ViewChild('table') table!: ElementRef<HTMLElement>;
  @ViewChild('table2') table2!: ElementRef<HTMLElement>;

  private portal = inject(LayoutBackgroundService);
  private api = inject(ApiService);
  current = areas[0];

  total: { title: string; number: number }[] = [];

  lineData: any[] = [];

  productData: ProductDayData[] = [];

  storeData: StoreData[] = [];

  jobSum = 0;

  daySum = 0;

  mapper: Record<string, number> = {
    生产二区扁铜线: 126,
    生产二区圆铜线: 80,
    生产一区滴漆: 38,
    生产一区: 135,
    生产三区: 120,
  };

  private destroy$ = new Subject<void>();

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
    this.api.dayproduction().subscribe((res) => {
      this.productData = res;
      gundong(this.table2.nativeElement)
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    });
    this.api.autobank().subscribe((res) => {
      this.storeData = res;
      gundong(this.table.nativeElement)
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    });
    this.refresh(this.current);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  refresh(ev: (typeof areas)[number]) {
    this.api.dayproductionworkshop(ev.area).subscribe((res) => {
      this.daySum = res.reduce((p, i) => p + i.sum, 0);
    });
    this.api.jobsum(ev.area).subscribe((res) => {
      this.jobSum = res.reduce((p, i) => p + i.sum, 0);
    });
    this.api.line(ev.line).subscribe((res) => {
      this.lineData = res
        .map((i) => ({
          time: new Date(i.year_month),
          month: i.year_month,
          value: i.sum,
          name: i.production_line_name,
        }))
        .sort((a, b) => a.time.getTime() - b.time.getTime());
    });
  }

  ngAfterViewInit(): void {
    this.portal.bgTemplate = this.factoryMap;
  }

  prev() {
    this.current = areas[Math.max(0, areas.indexOf(this.current) - 1)];
    this.refresh(this.current);
  }
  next() {
    this.current =
      areas[Math.min(areas.length - 1, areas.indexOf(this.current) + 1)];
    this.refresh(this.current);
  }
}
