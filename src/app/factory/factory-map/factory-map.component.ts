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
  { area: '生产二区圆铜线', x: 178, y: 249 },
  { area: '生产二区扁铜线', x: 442, y: 182 },
  { area: '生产一区滴漆', x: 807, y: 374 },
  { area: '生产一区', x: 679, y: 294 },
  { area: '生产三区', x: 810, y: 225 },
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
