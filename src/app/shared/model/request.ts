export interface RotorStatorYearData {
  year: string;
  type: string;
  sum: number;
}
export interface WorkshopData {
  fdate: string;
  production_area: string;
  cInvName: string;
  sum: number;
}
export interface LineMonthData {
  year_month: string;
  production_line_name: string;
  sum: number;
}
export interface ProductDayData {
  fdate: string;
  cinvcode: string;
  cInvName: string;
  sum: number;
}
export interface StoreData {
  pallet_code: string;
  area_code: string;
  g4: string;
  sku_code: string;
  sku_name: string;
  qty: number;
  warehouse_code: string;
}
export interface Job {
  person: string;
  production_area: string;
  start_time: string;
  end_time: string;
}
export interface JobSum {
  production_area: string;
  sum: number;
}

export interface Deliver {
  cinvName: string;
  iQuantity: string;
  cCusName: string;
  dDate: string;
}
