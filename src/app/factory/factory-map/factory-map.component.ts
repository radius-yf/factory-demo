import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject } from '@angular/core';
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

@Component({
  selector: 'app-factory-map',
  templateUrl: './factory-map.component.html',
  styleUrls: ['./factory-map.component.less'],
})
export class FactoryMapComponent implements AfterViewInit {
  private el: ElementRef<HTMLElement> = inject(ElementRef);
  flag = true;
  width = 0;
  height = 0;
  private cdr = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    this.cdr.detectChanges();
  }
  onClick(g: SVGGElement) {
    const line = select(g).select<SVGLineElement>('line');
    if (this.flag) {
      lineLeave(line, 500);
      this.flag = false;
    } else {
      lineEnter(line, 500);
      this.flag = true;
    }
  }
}
