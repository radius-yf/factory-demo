import { Component, HostBinding, Input, inject } from '@angular/core';
import { Router } from '@angular/router';

export const menus = [
  { name: '首页', path: '/' },
  { name: '工厂', path: '/factory' },
  { name: '公司简介', path: '/detail' },
  { name: '荣誉资质', path: '' },
  { name: '我们的客户', path: '' },
];

@Component({
  selector: 'app-circle-menu',
  templateUrl: './circle-menu.component.html',
  styleUrls: ['./circle-menu.component.less'],
})
export class CircleMenuComponent {
  @Input() index = 1;

  @HostBinding('style.transform') get transform() {
    return `rotate(${this.index * 60}deg)`;
  }

  menus = menus;
  private router = inject(Router);

  onClick(val: number) {
    this.index = this.menus.length - val;
    if (menus[val].path) {
      this.router.navigate([menus[val].path]);
    }
  }
}
