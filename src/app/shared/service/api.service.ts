import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  RotorStatorYearData,
  LineMonthData,
  WorkshopData,
  ProductDayData,
  StoreData,
  Job,
  JobSum,
} from '../model/request';
import { forkJoin, map } from 'rxjs';

const prefix = 'http://10.200.190.209:8080/vis/';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  /**
   * 年度所有转子定子总成报交数
   * @returns
   */
  yearproduction() {
    const year = new Date().getFullYear().toString();
    return forkJoin([
      this.http.get<RotorStatorYearData[]>(prefix + 'yearproduction'),
      this.http.get<{ type: string; sumall: number }[]>(
        prefix + 'yearproductionall'
      ),
    ]).pipe(
      map(([res1, res2]) =>
        res1
          .filter((item) => item.year === year)
          .map((i) => ({ title: `本年度${i.type}生产数`, number: i.sum }))
          .concat(
            res2.map((i) => ({
              title: `累计${i.type}生产数`,
              number: i.sumall,
            }))
          )
      )
    );
  }
  /**
   * 车间生产数
   * @returns
   */
  dayproductionworkshop(area?: string) {
    const params: Record<string, string> = area ? { area } : {};
    return this.http.get<WorkshopData[]>(prefix + 'dayproductionworkshop', {
      params,
    });
  }
  /**
   * 当前产线当年每月生产数
   * @returns
   */
  line(line?: string) {
    const params: Record<string, string> = line ? { line } : {};
    return this.http.get<LineMonthData[]>(prefix + 'line', { params });
  }
  /**
   * 工厂各产品日生产数
   * @returns
   */
  dayproduction() {
    return this.http.get<ProductDayData[]>(prefix + 'dayproduction');
  }
  /**
   * 立库数据
   * @returns
   */
  autobank() {
    return this.http.get<StoreData[]>(prefix + 'autobank');
  }
  /**
   * 上岗人员
   * @returns
   */
  job() {
    return this.http.get<Job[]>(prefix + 'job');
  }
  jobsum(area?: string) {
    const params: Record<string, string> = area ? { area } : {};
    return this.http.get<JobSum[]>(prefix + 'jobsum', { params });
  }
}
