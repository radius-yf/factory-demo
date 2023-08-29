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
    return this.http.get<RotorStatorYearData[]>(prefix + 'yearproduction');
  }
  /**
   * 车间生产数
   * @returns
   */
  dayproductionworkshop() {
    return this.http.get<WorkshopData[]>(prefix + 'dayproductionworkshop');
  }
  /**
   * 当前产线当年每月生产数
   * @returns
   */
  line(line: string) {
    return this.http.get<LineMonthData[]>(prefix + 'line', {
      params: { line },
    });
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
    return this.http.get<JobSum[]>(prefix + 'jobsum');
  }
}
