import { Component, HostListener, OnInit, inject } from '@angular/core';
import { LayoutBackgroundService } from '../shared/layout/layout-background.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-customer',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less'],
})
export class DetailComponent implements OnInit {
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
