import {
  Component,
  AfterViewInit,
  inject,
  ElementRef,
  Input,
} from '@angular/core';
import { Chart } from '@antv/g2';

@Component({
  selector: 'app-g2-line',
  template: '',
  styles: [
    `
      :host {
        display: block;
        height: 100%;
        padding: 8px 4px 0 4px;
        box-sizing: border-box;
      }
    `,
  ],
})
export class G2LineComponent implements AfterViewInit {
  private ele: ElementRef<HTMLElement> = inject(ElementRef);
  @Input() set data(val: any[]) {
    this.chart?.changeData(val);
    this.chart?.render();
  }

  private chart: Chart | null = null;

  ngAfterViewInit(): void {
    const chart = this.chart = new Chart({
      container: this.ele.nativeElement,
      autoFit: true,
    });

    chart.scale({
      month: {
        range: [0, 1],
      },
      value: {
        nice: true,
      },
    });

    chart.tooltip({
      showCrosshairs: true,
      shared: true,
    });

    chart.axis('value', {
      grid: null
    });
    chart.axis('month', {
      tickLine: null,
      line: null,
      grid: null,
      label: {
        formatter: (text) => {
          return text.slice(-2) + '月';
        }
      }
    })

    chart.line().position('month*value').color('name')
    chart.area().position('month*value').color('name')
  }
}
