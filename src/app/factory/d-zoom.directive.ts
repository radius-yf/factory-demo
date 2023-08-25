import {
  AfterViewInit,
  Directive,
  ElementRef,
  Injectable,
  inject,
} from '@angular/core';
import { D3ZoomEvent, select, zoom } from 'd3';

interface Position {
  x: number;
  y: number;
}

@Directive({
  selector: '[d-zoom]',
  exportAs: 'dZoom',
})
export class DZoomDirective implements AfterViewInit {
  private template: ElementRef<Element> = inject(ElementRef);
  private parent = inject(DZoomDirective, {
    optional: true,
    skipSelf: true,
  });

  position: Position = { x: 0, y: 0 };

  ngAfterViewInit(): void {
    const node = select(this.template.nativeElement.querySelector('*'));
    const z = zoom<Element, any>()
      .scaleExtent([1, 1])
      .on('zoom', (ev: D3ZoomEvent<any, any>) => {
        node.attr('transform', ev.transform.toString());
        this.position = {
          x: ev.transform.x + Number(node.attr('x')),
          y: ev.transform.y + Number(node.attr('y')),
        };
      });
    this.position = { x: Number(node.attr('x')), y: Number(node.attr('y')) };
    select(this.template.nativeElement).call(z);
  }
}
