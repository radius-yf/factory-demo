import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  Input,
} from '@angular/core';
import { D3ZoomEvent, select, zoom } from 'd3';

interface Position {
  x: number;
  y: number;
}
interface ZoomTransform {
  x: number;
  y: number;
  k: number;
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
  @Input() dZoomPosition?: Position | 'center';

  position: ZoomTransform = { x: 0, y: 0, k: 1 };

  ngAfterViewInit(): void {
    const container = this.template.nativeElement.getBoundingClientRect();
    const content = this.template.nativeElement
      .querySelector('*')!
      .getBoundingClientRect();

    const node = select(this.template.nativeElement.querySelector('*')!);
    const [nodeX, nodeY] = [node.attr('x'), node.attr('y')].map(Number);
    const z = zoom<Element, any>().scaleExtent([1, 1]);
    if (this.dZoomPosition === 'center') {
      z.translateExtent([
        [0, 0],
        [content.width, content.height],
      ]);
    }
    z.on('zoom', (ev: D3ZoomEvent<any, any>) => {
      node.attr('transform', ev.transform.toString());
      this.position = {
        x: ev.transform.x + Number(node.attr('x')),
        y: ev.transform.y + Number(node.attr('y')),
        k: ev.transform.k,
      };
    });
    this.position = {
      x: Number(node.attr('x')),
      y: Number(node.attr('y')),
      k: 1,
    };
    select(this.template.nativeElement).call(z);
    if (this.dZoomPosition === 'center') {
      setTimeout(() => {
        z.translateTo(node, 0, 0, [container.width / 2, container.height / 2]);
      }, 0);
    }
  }
}
