import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { easeLinear, Selection, select, zoom } from 'd3';

function lineEnter<T extends SVGGeometryElement>(
  line: Selection<T, any, any, any>,
  duration: number
) {
  line
    .attr('stroke-dasharray', () => line.node()!.getTotalLength())
    .attr('stroke-dashoffset', line.node()!.getTotalLength())
    .transition()
    .duration(duration)
    .ease(easeLinear)
    .attr('stroke-dashoffset', 0);
}
function lineLeave<T extends SVGGeometryElement>(
  line: Selection<T, any, any, any>,
  duration: number
) {
  line
    .attr('stroke-dasharray', () => line.node()!.getTotalLength())
    .attr('stroke-dashoffset', 0)
    .transition()
    .duration(duration)
    .ease(easeLinear)
    .attr('stroke-dashoffset', line.node()!.getTotalLength());
}

export const areas = [
  { area: '生产二区圆铜线', line: 'MEB转子', x: 174, y: 262 },
  { area: '生产二区扁铜线', line: 'IEDS转子', x: 408, y: 162 },
  { area: '生产二区圆铜线', line: 'MEB定子', x: 302, y: 215 },
  { area: '生产二区圆铜线', line: 'MEB电枢线', x: 350, y: 246 },
  { area: '生产二区扁铜线', line: '小电轴定子', x: 457, y: 173 },
  { area: '生产二区扁铜线', line: '小电轴电枢', x: 477, y: 188 },
  { area: '生产一区滴漆', line: '滴漆（MEB）', x: 595, y: 84 },
  { area: '生产一区滴漆', line: '滴漆（小电轴）', x: 679, y: 109 },
  { area: '生产一区', line: 'EDU电枢', x: 486, y: 108 },
  { area: '生产一区', line: 'EV2电枢', x: 620, y: 122 },
  { area: '生产一区滴漆', line: '滴漆（EV&EDU）', x: 623, y: 85 },
  { area: '生产一区', line: 'EDU总装', x: 572, y: 152 },
  { area: '生产一区', line: 'EV2总装', x: 521, y: 87 },
  { area: '生产三区', line: 'BEV3漆前电枢', x: 497, y: 357 },
  { area: '生产二区圆铜线', line: 'MEB转子二期', x: 178, y: 243 },
  { area: '生产三区', line: 'VOLVO总装线', x: 864, y: 189 },
  { area: '生产三区', line: 'VOLVO定子线', x: 761, y: 225 },
  { area: '生产一区滴漆', line: '绝缘车间（VOLVO）', x: 787, y: 156 },
  { area: '生产一区滴漆', line: 'MEB及小电轴滴漆扩能产线', x: 733, y: 132 },
  { area: '生产二区扁铜线', line: 'C轴电枢线', x: 436, y: 190 },
  { area: '生产三区', line: 'BEV3漆后电枢', x: 610, y: 430 },
  { area: '生产二区扁铜线', line: '注塑转子二号线', x: 409, y: 374 },
  { area: '生产一区', line: 'Volvo漆后定子线', x: 802, y: 194 }
];

@Component({
  selector: 'app-factory-map',
  templateUrl: './factory-map.component.html',
  styleUrls: ['./factory-map.component.less'],
  exportAs: 'factoryMap',
})
export class FactoryMapComponent implements AfterViewInit {
  width = 0;
  height = 0;

  @Input() areas = areas;
  @Input() current!: (typeof areas)[number];
  @Output() currentChange = new EventEmitter();

  private el: ElementRef<HTMLElement> = inject(ElementRef);
  private cdr = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    this.cdr.detectChanges();

    this.currentChange.emit(this.current);
  }

  onClick(item: (typeof areas)[number]) {
    this.current = item;
    this.currentChange.emit(this.current);
  }
}
