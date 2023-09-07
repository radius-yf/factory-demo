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
import {
  Subject,
  forkJoin,
  startWith,
  switchMap,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
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

const currentDate = new Date().getTime();
const startDate = new Date(2019, 2, 1).getTime();
const day = 24 * 60 * 60 * 1000;
const diff = Math.floor((currentDate - startDate) / day);

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
  daysBetween = diff;
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

  private refresh$ = new Subject<(typeof areas)[number]>();
  private destroy$ = new Subject<void>();
  private _ref = this.refresh$
    .pipe(
      switchMap((ev) =>
        forkJoin([
          this.api.dayproductionworkshop(ev.area),
          this.api.jobsum(ev.area),
          this.api.line(ev.line),
        ])
      ),
      takeUntil(this.destroy$)
    )
    .subscribe(([res1, res2, res3]) => {
      this.daySum = res1.reduce((p, i) => p + i.sum, 0);
      this.jobSum = res2.reduce((p, i) => p + i.sum, 0);
      this.lineData = res3
        .map((i) => ({
          time: new Date(i.year_month),
          month: i.year_month,
          value: i.sum,
          name: i.production_line_name,
        }))
        .sort((a, b) => a.time.getTime() - b.time.getTime());
    });

  ngOnInit(): void {
    this.api.yearproduction().subscribe((res) => {
      this.total = res;
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
    this.refresh$.next(ev);
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
