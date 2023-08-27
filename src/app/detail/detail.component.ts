import { Component, OnInit, inject } from '@angular/core';
import { LayoutBackgroundService } from '../shared/layout/layout-background.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less'],
})
export class DetailComponent implements OnInit {
  private bg = inject(LayoutBackgroundService);

  location = inject(Location);

  ngOnInit(): void {
    this.bg.bgImage = 'bg2';
  }
}
