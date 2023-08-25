import { Component, OnInit, inject } from '@angular/core';
import { LayoutBackgroundService } from '../shared/layout/layout-background.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  private bg = inject(LayoutBackgroundService);

  ngOnInit(): void {
    this.bg.bgImage = 'bg2';
  }
}
