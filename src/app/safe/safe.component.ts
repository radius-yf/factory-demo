import { Component, HostListener, inject } from '@angular/core';
import { LayoutBackgroundService } from '../shared/layout/layout-background.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-safe',
  templateUrl: './safe.component.html',
  styleUrls: ['./safe.component.less']
})
export class SafeComponent {

  private bg = inject(LayoutBackgroundService);

  location = inject(Location);

  ngOnInit(): void {
    this.bg.bgImage = 'bg2';
  }

  @HostListener('click')
  onClick() {
    this.location.back();
  }
}
