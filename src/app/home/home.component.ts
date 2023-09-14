import { Component, OnInit, TrackByFunction, inject } from '@angular/core';
import { LayoutBackgroundService } from '../shared/layout/layout-background.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  private bg = inject(LayoutBackgroundService);
  private router = inject(Router);

  arr = [1, 2, 3, 4, 5];
  trackByFn: TrackByFunction<any> = (_: number, item: any) => {
    return item;
  };

  ngOnInit(): void {
    this.bg.bgImage = 'bg2';
  }
  onClick(index: number, path: string) {
    if (index === 2) {
      const tmp = this.arr.shift()!;
      this.arr.push(tmp);
    } else if (index === 3) {
      this.router.navigate([path]);
    } else if (index === 4) {
      const tmp = this.arr.pop()!;
      this.arr.unshift(tmp);
    }
  }
}
