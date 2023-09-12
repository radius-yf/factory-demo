import { Component, HostBinding, Input, inject } from '@angular/core';
import { Router } from '@angular/router';

export const menus = [
  { index: 5, name: '我们的客户', path: '/detail1' },
  { index: 4, name: '实验室', path: '/detail2' },
  { index: 3, name: '首页', path: '/' },
  { index: 2, name: '工厂', path: '/factory' },
  { index: 1, name: '公司简介', path: '/detail' },
  { index: 0, name: '荣誉资质', path: '/detail3' },
];

@Component({
  selector: 'app-circle-menu',
  templateUrl: './circle-menu.component.html',
  styleUrls: ['./circle-menu.component.less'],
})
export class CircleMenuComponent {
  @Input() index: number | null | undefined = null;

  @HostBinding('style.transform') get transform() {
    if (this.index !== null && this.index !== undefined) {
      return `rotate(${this.index * 60}deg)`;
    } else {
      return '';
    }
  }

  menus = menus;
  private router = inject(Router);

  onClick(item: (typeof menus)[number]) {
    this.index = item.index;
    if (item.path) {
      this.router.navigate([item.path]);
    }
  }
}
